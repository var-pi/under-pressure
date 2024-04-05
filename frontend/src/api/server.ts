import axios, { HttpStatusCode } from "axios";
import { getIdTokenString, login } from "./auth";
import { RequestError } from "@/api/types";

const handleError = (error: unknown): void => {
  if (!axios.isAxiosError(error)) return;
  const data = error.response?.data;
  if (!isRequestError(data)) return;
  if (data.statusCode == HttpStatusCode.Unauthorized) login();
  else alert(data.message);
  throw data;
};

function isRequestError(obj: any): obj is RequestError {
  return (
    obj.statusMessage != null && obj.statusCode != null && obj.message != null
  );
}

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const server = {
  get: async <T>(endpoint: string): Promise<T> => {
    const url = BASE_URL + endpoint;
    const headers = { Authorization: `Bearer ${getIdTokenString()}` };
    return await axios
      .get(url, { headers })
      .then((r) => r.data)
      .catch((e) => {
        handleError(e);
        throw e;
      });
  },
  post: async <T, U>(endpoint: string, body: T): Promise<U> => {
    const url = BASE_URL + endpoint;
    const headers = { Authorization: `Bearer ${getIdTokenString()}` };
    return await axios
      .post(url, body, { headers })
      .then((r) => r.data)
      .catch((e) => {
        handleError(e);
        throw e;
      });
  },
  delete: async <T>(endpoint: string): Promise<T> => {
    const url = BASE_URL + endpoint;
    const headers = { Authorization: `Bearer ${getIdTokenString()}` };

    return await axios
      .delete(url, { headers })
      .then((r) => r.data)
      .catch((e) => {
        handleError(e);
        throw e;
      });
  },
};

export default server;

