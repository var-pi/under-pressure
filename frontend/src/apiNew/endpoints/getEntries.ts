import { BASE_URL } from "../api.config";
import axios from "axios";

export const getEntries: (
  userId: userId,
  subjectName: string
) => Promise<ApiResponse<Entry[]>> = (userId: userId, subjectName: string) =>
  axios
    .post(BASE_URL + "/personal/entries", { userId, subjectName })
    .then((res) => res.data)
    .catch(function (error) {
      console.error("Error:", error);
    });

