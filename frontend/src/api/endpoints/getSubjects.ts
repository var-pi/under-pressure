import { BASE_URL } from "@/api/api.config";
import axios from "axios";

// Original Promise<ApiResponse<Subject[]>>
export const getSubjects: () => Promise<ApiResponse<string[]>> = () =>
  axios
    .get(BASE_URL + "/subjects")
    .then((res) => res.data)
    .catch(function (error) {
      console.error("Error:", error);
    });

