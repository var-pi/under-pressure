import { BASE_URL } from "../api.config";
import axios from "axios";
import { ApiResponse } from "../types/apiResponse";
import { subject } from "../types/subject";

export const getSubjects: () => Promise<ApiResponse<subject[]>> = () =>
  axios
    .get(BASE_URL + "/subjects")
    .then((res) => res.data)
    .catch(function (error) {
      console.error("Error:", error);
    });

