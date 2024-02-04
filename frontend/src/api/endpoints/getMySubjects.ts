import { BASE_URL } from "../api.config";
import axios from "axios";

export const getMySubjects: (
  userId: userId
) => Promise<ApiResponse<Subject[]>> = (userId: userId) =>
  axios
    .post(BASE_URL + "/personal/subjects", { userId })
    .then((res) => res.data)
    .catch(function (error) {
      console.error("Error:", error);
    });

