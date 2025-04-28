let token_cache = "";

export const getToken = async () => {
  return token_cache;
};

export const setToken = async (token) => {
  token_cache = token;
};

export const getHeaderToken = async () => {
  return {
    headers: {
      Cookie: token_cache,
    },
  };
};
