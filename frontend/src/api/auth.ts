export const validateLogin: () => void = () => {
  if (!ifLogedIn()) {
    login();
    throw new Error("The user is not logged in."); // TODO The text should not be hardcoded.
  }
};

const ifLogedIn: () => boolean = () => {
  const idTokenString = sessionStorage.getItem("idTokenString");
  // TODO Check the expiration time!
  return idTokenString != null;
};

const login: () => void = () => {
  const redirectUri = "http://localhost:8080/oauth2/callback/google";
  const clientId =
    "742753336008-k6lnuvq3m8h5v9bp35rq7d3050a847c5.apps.googleusercontent.com";
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

export const getIdTokenString: () => string = () => {
  const idTokenString = sessionStorage.getItem("idTokenString");
  if (idTokenString == null) throw new Error("The idTokenString is null");
  return idTokenString;
};

