import { describe, beforeAll, it, expect } from "bun:test";
import app from "#root";
import { getHeaderToken } from "../../testing_helper";

describe("API de Modulo de Empresa", () => {
  it("Deberia crear una empresa", async () => {
    const res = await app.request("/api/v1/empresas", {
      method: "POST",
      headers: {
        "Content-Type": "application/www-form-urlencoded",
        ...(await getHeaderToken()),
      },
      body: `name=Empresa Test&rut=12345678-9&direccion=Direccion`,
    });
    const responseBody = await res.text();
    expect(responseBody).toEqual({ message: "Empresa creada", id: 1 });
    expect(res.status).toBe(200);
  });
});
