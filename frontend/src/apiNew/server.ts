import { BASE_URL } from "./api.config";
import axios from "axios";
import { validateLogin, getIdTokenString } from "./auth";

const server = {
  get: async <T>(endpoint: string): Promise<T> => {
    const url = BASE_URL + endpoint;
    return await axios.get(url).then((r) => r.data);
  },
  post: async <T, U>(endpoint: string, body: T): Promise<U> => {
    const url = BASE_URL + endpoint;
    return await axios.post(url, body).then((r) => r.data);
  },
  authorized: {
    post: async <T, U>(endpoint: string, body: T): Promise<U> => {
      validateLogin();

      const url = BASE_URL + endpoint;
      const headers = { Authorization: `Bearer ${getIdTokenString()}` };
      return await axios.post(url, body, { headers }).then((r) => r.data);
    },
  },
};

export default server;

