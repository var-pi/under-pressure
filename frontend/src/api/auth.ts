export const login: () => void = () => {
  const scope = "openid profile";
  window.location.href =
    process.env.VUE_APP_AUTHORIZATION_URI +
    "?redirect_uri=" +
    `${process.env.VUE_APP_FRONTEND_BASE_URL}/oauth2/callback/google` +
    "&prompt=consent&response_type=code&client_id=" +
    process.env.VUE_APP_CLIENT_ID +
    "&scope=" +
    scope +
    "&access_type=offline";
};

export const getIdTokenString: () => string | null = () => {
  const idTokenString = sessionStorage.getItem("idTokenString");
  return idTokenString;
};

