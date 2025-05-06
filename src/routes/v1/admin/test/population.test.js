import { expect, test, it, describe, beforeAll, afterAll } from "bun:test";
import { eq } from "drizzle-orm";
import { db } from "../../../../config/db";
import {
  users,
  empresas,
  permissions,
  roles,
  roles_permissions,
  users_roles,
} from "../../../../config/schemas";
import { desc } from "drizzle-orm";
import {
  setUsers,
  getUsers,
  setPermisos,
  setRoles,
  getRoles,
  getPermisos,
  setEmpresas,
  getEmpresas,
} from "../../testing_helper";

describe("Populate SHARED empresa", async () => {
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
    setEmpresas(empresas_result);
  });
});

describe("Populate usuarios", async () => {
  it("Deberia poblar usuarios", async () => {
    let usuarios = await db
      .insert(users)
      .values([
        { name: "Ruben Navarro", email: "ruben@xar.cl", password: "xar2025.1" },
        { name: "testuser2", email: "test2@example.com", password: "123456" },
      ])
      .returning();
    expect(usuarios.length).toBe(2);
    setUsers(usuarios);
  });
});

describe("Populate permisos", async () => {
  it("Deberia poblar permisos", async () => {
    let permisos = await db
      .insert(permissions)
      .values([
        { name: "agenda:read", description: "Permiso para leer la agenda" },
        {
          name: "agenda:write",
          description: "Permiso para escribir en la agenda",
        },
        {
          name: "agenda:delete",
          description: "Permiso para eliminar de la agenda",
        },
        { name: "pagos:read", description: "Permiso para leer los pagos" },
        {
          name: "pagos:write",
          description: "Permiso para escribir en los pagos",
        },
      ])
      .returning();
    expect(permisos.length).toBe(5);
    setPermisos(permisos);
  });
});

describe("Populate roles", async () => {
  it("Deberia poblar roles", async () => {
    let roles_result = await db
      .insert(roles)
      .values([{ name: "admin" }, { name: "user_master" }])
      .returning();
    expect(roles_result.length).toBe(2);
    setRoles(roles_result);
  });
});

describe("Populate roles_permisos", async () => {
  it("Deberia poblar roles_permisos", async () => {
    let roles_cache = await getRoles();
    let permisos = await getPermisos();
    let value = [];

    for (let i = 0; i < roles_cache.length; i++) {
      if (roles_cache[i].name != "admin") {
        for (let j = 0; j < permisos.length; j++) {
          value.push({
            roleId: roles_cache[i].id,
            permissionId: permisos[j].id,
          });
        }
      }
    }

    let roles_permisos = await db
      .insert(roles_permissions)
      .values(value)
      .returning();
    expect(roles_permisos.length).toBeGreaterThan(0);
    expect(roles_permisos.length).toBe(value.length);
  });
});

describe("Populate role to user admin", async () => {
  it("Deberia poblar roles a usuarios", async () => {
    let usuarios = await getUsers();
    let roles_cache = await getRoles();
    let value = [];

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email == "ruben@xar.cl") {
        value.push({
          userId: usuarios[i].id,
          roleId: roles_cache[0].id,
        });
      }
    }
    let roles_usuarios = await db.insert(users_roles).values(value).returning();
    console.log(roles_usuarios);
    expect(roles_usuarios.length).toBe(value.length);
    expect(roles_usuarios.length).toBeGreaterThan(0);
  });
});

describe("Populate empresa to user", async () => {
  it("Deberia poblar empresa a usuarios", async () => {
    let usuarios = await getUsers();
    let empresas = await getEmpresas();
    let value = [];

    for (let i = 0; i < usuarios.length; i++) {
      let usuarios_empresa = await db
        .update(users)
        .set({ empresaId: empresas[0].id })
        .where(eq(users.id, usuarios[i].id))
        .returning();
      console.log(usuarios_empresa);
      expect(usuarios_empresa.length).toBe(1);
    }
  });
});
