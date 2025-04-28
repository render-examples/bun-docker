import { expect, test, it, describe, beforeAll, afterAll } from "bun:test";
import { db } from "../../../../config/db";
import { users, empresas } from "../../../../config/schemas";

describe("Populate empresa", async () => {
  it("Deberia poblar empresas", async () => {
    let empresas_result = await db
      .insert(empresas)
      .values([
        { name: "Empresa Test", rut: "12345678-9", direccion: "Direccion" },
        {
          name: "Empresa Test 2",
          rut: "98765432-1",
          direccion: "Direccion 2",
        },
      ])
      .returning();
    expect(empresas_result.length).toBe(2);
  });
});

describe("Populate usuarios", async () => {
  it("Deberia poblar usuarios", async () => {
    let usuarios = await db
      .insert(users)
      .values([
        { name: "Ruben Navarro", email: "ruben@xar.cl", password: "123456" },
        { name: "testuser2", email: "test2@example.com", password: "123456" },
      ])
      .returning();
    expect(usuarios.length).toBe(2);
  });
});
