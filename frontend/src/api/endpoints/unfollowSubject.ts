import { BASE_URL } from "@/api/api.config";
import axios from "axios";

export const unfollowSubject: (
  userId: userId,
  subjectName: string
) => Promise<ApiResponse<null>> = (userId: userId, subjectName: string) =>
  axios
    .post(BASE_URL + "/personal/subjects/unfollow", { userId, subjectName })
    .then((res) => res.data)
    .catch(function (error) {
      console.error("Error:", error);
    });

