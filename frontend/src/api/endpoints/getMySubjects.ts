import { BASE_URL } from "@/api/api.config";
import axios from "axios";

// Original Promise<ApiResponse<Subject[]>>
export const getMySubjects: (
  userId: userId
) => Promise<ApiResponse<string[]>> = (userId: userId) =>
  axios
    .post(BASE_URL + "/personal/subjects", { userId })
    .then((res) => res.data)
    .catch(function (error) {
      console.error("Error:", error);
    });

