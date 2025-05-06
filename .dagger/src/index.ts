import {
  dag,
  Container,
  Service,
  Directory,
  argument,
  object,
  func,
} from "@dagger.io/dagger";

@object()
export class JunglaMagica {
  _base_image(path: Directory) {
    const envFile = path.file(".env");
    return dag
      .container()
      .from("oven/bun:latest")
      .withDirectory("/app", path)
      .withWorkdir("/app")
      .withExec(["bun", "install"]);
  }

  _postgres_service() {
    return dag
      .container()
      .from("postgres:16")
      .withEnvVariable("POSTGRES_USER", "postgres")
      .withEnvVariable("POSTGRES_PASSWORD", "postgres")
      .withEnvVariable("POSTGRES_DB", "postgres")
      .withExposedPort(5432)
      .asService();
  }

  @func()
  async test(
    @argument({ defaultPath: "." }) path: Directory,
    db_dump: boolean,
  ): Promise<string> {
    let populateResult = null;

    const pg = this._postgres_service();

    const container_ready = this._base_image(path)
      .withServiceBinding("postgres_testing", pg)
      .withEnvVariable("db_db", "postgres")
      .withEnvVariable("db_user", "postgres")
      .withEnvVariable("db_password", "postgres")
      .withEnvVariable("db_host", "postgres_testing")
      .withEnvVariable("db_port", "5432")
      .withEnvVariable("secret", "testingci")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "postgresql-client"]);

    if (db_dump) {
      const db_with_dump = await container_ready
        .withFile("/db_dump", path.file("jungla_prod"))
        .withEnvVariable("PGPASSWORD", "postgres")
        .withExec([
          "psql",
          "-h",
          "postgres_testing",
          "-U",
          "postgres",
          "-d",
          "postgres",
          "-f",
          "/db_dump",
        ])
        .stderr();
    }

    const db_migration = await container_ready
      .withExec(["bun", "migrate"])
      .stdout();
    console.log("db_migration", db_migration);

    if (!db_dump) {
      populateResult = await container_ready
        .withExec(["bun", "test", "-t", "Populate", "--bail", "--verbose"])
        .stdout();
      console.log("populateResult", populateResult);
    }

    const test = await container_ready
      .withExec(["bun", "test", "-t", "API", "--verbose"])
      .stdout();

    return `${db_migration}==MIGRATION ==\n${populateResult}==TEST==\n${test}`;
  }
}
