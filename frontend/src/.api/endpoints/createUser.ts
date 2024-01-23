import { BASE_URL } from "@/api/api.config";
import axios from "axios";

export const createUser: (userId: userId) => Promise<ApiResponse<null>> = (
  userId: userId
) =>
  axios
    .post(BASE_URL + "/users/create", { userId })
    .then((res) => res.data)
    .catch(function (error) {
      console.error("Error:", error);
    });

