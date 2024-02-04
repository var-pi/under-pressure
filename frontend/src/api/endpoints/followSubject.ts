import { BASE_URL } from "@/api/api.config";
import axios from "axios";

export const followSubject: (
  userId: userId,
  subjectName: string
) => Promise<ApiResponse<null>> = (userId: userId, subjectName: string) =>
  axios
    .post(BASE_URL + "/personal/subjects/follow", { userId, subjectName })
    .then((res) => res.data)
    .catch(function (error) {
      console.error("Error:", error);
    });

