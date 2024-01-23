import { BASE_URL } from "@/api/api.config";
import axios from "axios";

export const getSubjects: () => Promise<ApiResponse<Subject[]>> = () =>
  axios
    .get(BASE_URL + "/subjects")
    .then((res) => res.data)
    .catch(function (error) {
      console.error("Error:", error);
    });

