import { ApiResponse } from "../types/apiResponse";
import server from "../server";

export const unfollowSubject = (
  subjectName: string
): Promise<ApiResponse<null>> =>
  server.authorized.post("/personal/subjects/unfollow", {
    subjectName,
  });

