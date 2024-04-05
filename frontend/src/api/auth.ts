export const login: () => void = () => {
  const scope = "openid profile";
  window.location.href =
    import.meta.env.VITE_AUTHORIZATION_URI +
    "?redirect_uri=" +
    `${import.meta.env.VITE_FRONTEND_BASE_URL}/oauth2/callback/google` +
    "&prompt=consent&response_type=code&client_id=" +
    import.meta.env.VITE_CLIENT_ID +
    "&scope=" +
    scope +
    "&access_type=offline";
};

export const getIdTokenString: () => string | null = () => {
  const idTokenString = sessionStorage.getItem("idTokenString");
  return idTokenString;
};

