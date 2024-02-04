import { BASE_URL } from "../api.config";
import axios from "axios";
import { userId } from "../types/userId";
import { ApiResponse } from "../types/apiResponse";
import { subject } from "../types/subject";

export const getMySubjects: (
  userId: userId
) => Promise<ApiResponse<subject[]>> = (userId: userId) =>
  axios
    .post(BASE_URL + "/personal/subjects", { userId })
    .then((res) => res.data)
    .catch(function (error) {
      console.error("Error:", error);
    });

