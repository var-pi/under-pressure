import jwt from "jsonwebtoken";

const clientId =
  "742753336008-k6lnuvq3m8h5v9bp35rq7d3050a847c5.apps.googleusercontent.com";

export const validateLogin: () => void = () => {
  if (!ifLogedIn()) {
    login();
    throw new Error("The user is not logged in.");
  }
};

const ifLogedIn: () => boolean = () => {
  const idTokenString = sessionStorage.getItem("idTokenString");
  if (idTokenString == null) return false;

  return true;
};

const login: () => void = () => {
  const redirectUri = "http://localhost:8080/oauth2/callback/google";
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

