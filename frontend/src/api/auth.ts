const clientId =
  "742753336008-k6lnuvq3m8h5v9bp35rq7d3050a847c5.apps.googleusercontent.com";

export const login: () => void = () => {
  const redirectUri =
    "https://under-pressure.onrender.com/oauth2/callback/google";
  const scope = "openid profile";
  window.location.href =
    "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" +
    redirectUri +
    "&prompt=consent&response_type=code&client_id=" +
    clientId +
    "&scope=" +
    scope +
    "&access_type=offline";
};

export const getIdTokenString: () => string | null = () => {
  const idTokenString = sessionStorage.getItem("idTokenString");
  return idTokenString;
};

