import { describe, beforeAll, it, expect } from "bun:test";
import app from "#root";
import { setToken, getHeaderToken } from "../../testing_helper";

describe("API Tests", () => {
  it("Deberia realizar el login de usuarios", async () => {
    const userName = "ruben@xar.cl";

    const res = await app.request("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${userName}&password=123456`,
    });

    const responseBody = await res.text();
    const setCookieHeader = res.headers.get("Set-Cookie");

    expect(responseBody).toEqual(
      "Bienvenido!... Redirigiendo a la página de inicio.",
    );

    expect(res.status).toBe(200);
    expect(setCookieHeader).toBeDefined();
    expect(setCookieHeader).toContain("auth_token=");

    setToken(setCookieHeader);
  });

  // Test para la ruta POST /users (caso de error - falta nombre)
  it("Should return 400 if name is missing for POST /users", async () => {
    const res = await app.request("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        /* no name */
      }),
    });

    // Verifica el status code (400 Bad Request)
    expect(res.status).toBe(400);
    // Verifica el mensaje de error
    const responseBody = await res.json();
    expect(responseBody).toEqual({ error: "Name is required" });
  });

  // Test para la ruta POST /users (caso de error - JSON inválido)
  it("Should return 400 if body is invalid JSON for POST /users", async () => {
    const res = await app.request("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "{invalid json", // JSON mal formado
    });

    // Verifica el status code (400 Bad Request)
    expect(res.status).toBe(400);
    // Verifica el mensaje de error
    const responseBody = await res.json();
    expect(responseBody).toEqual({ error: "Invalid JSON" });
  });

  // Test para una ruta inexistente (404)
  it("Should return 404 for unknown routes", async () => {
    const res = await app.request("/non-existent-route");
    expect(res.status).toBe(404);
  });
});
