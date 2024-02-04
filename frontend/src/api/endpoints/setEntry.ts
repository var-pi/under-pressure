import { BASE_URL } from "../api.config";
import axios from "axios";
import { userId } from "../types/userId";
import { ApiResponse } from "../types/apiResponse";

export const setEntry: (
  userId: userId,
  subjectName: string,
  stressLevel: number
) => Promise<ApiResponse<null>> = (
  userId: userId,
  subjectName: string,
  stressLevel: number
) =>
  axios
    .post(BASE_URL + "/personal/entries/add", {
      userId,
      subjectName,
      stressLevel,
    })
    .then((res) => res.data)
    .catch(function (error) {
      console.error("Error:", error);
    });

