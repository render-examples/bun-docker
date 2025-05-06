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
      body: `email=${userName}&password=xar2025.1`,
    });

    const responseBody = await res.text();
    const setCookieHeader = res.headers.get("Set-Cookie");

    expect(responseBody).toEqual(
      "Bienvenido!... Redirigiendo a la página de inicio.",
    );

    expect(res.status).toBe(200);
    expect(setCookieHeader).toBeDefined();
    expect(setCookieHeader).toContain("auth_token=");

    setToken(setCookieHeader.split(";")[0]);
  });
});
