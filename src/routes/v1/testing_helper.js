let token_cache = "";
let users_cache = [];
let permisos_cache = [];
let roles_cache = [];
let empresas_cache = [];

// AUTH
export const getToken = async () => {
  return token_cache;
};

export const setToken = async (token) => {
  token_cache = token;
};

export const getHeaderToken = async () => {
  return {
    Cookie: token_cache,
  };
};

// USUARIOS
export const setUsers = async (users) => {
  users_cache = users;
};

export const getUsers = async () => {
  return users_cache;
};

// PERMISOS
export const setPermisos = async (permisos) => {
  permisos_cache = permisos;
};
export const getPermisos = async () => {
  return permisos_cache;
};

// ROLES
export const setRoles = async (roles) => {
  roles_cache = roles;
};
export const getRoles = async () => {
  return roles_cache;
};

// Empresas
export const setEmpresas = async (empresas) => {
  empresas_cache = empresas;
};

export const getEmpresas = async () => {
  return empresas_cache;
};
