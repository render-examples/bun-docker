export const RENDER_DOCUMENTED_ENV_KEYS = [
  "IS_PULL_REQUEST",
  "RENDER",
  "RENDER_CPU_COUNT",
  "RENDER_DISCOVERY_SERVICE",
  "RENDER_EXTERNAL_HOSTNAME",
  "RENDER_EXTERNAL_URL",
  "RENDER_GIT_BRANCH",
  "RENDER_GIT_COMMIT",
  "RENDER_GIT_REPO_SLUG",
  "RENDER_INSTANCE_ID",
  "RENDER_SERVICE_ID",
  "RENDER_SERVICE_NAME",
  "RENDER_SERVICE_TYPE",
  "RENDER_WEB_CONCURRENCY",
  "WEB_CONCURRENCY",
] as const;

export function printRenderInjectedEnv(): void {
  console.log("Render injected / documented runtime env:");
  for (const key of RENDER_DOCUMENTED_ENV_KEYS) {
    const value = process.env[key];
    console.log(`  ${key}=${value === undefined ? "(not set)" : JSON.stringify(value)}`);
  }

  if (process.env.RENDER === "true") {
    const documented = new Set<string>(RENDER_DOCUMENTED_ENV_KEYS);
    const extraRenderKeys = Object.keys(process.env)
      .filter((k) => k.startsWith("RENDER_") && !documented.has(k))
      .sort();
    if (extraRenderKeys.length > 0) {
      console.log("Additional RENDER_* (may be internal; undocumented):");
      for (const key of extraRenderKeys) {
        console.log(`  ${key}=${JSON.stringify(process.env[key])}`);
      }
    }
  }

  const port = process.env.PORT;
  console.log(`PORT=${port === undefined ? "(not set)" : JSON.stringify(port)}`);
}
