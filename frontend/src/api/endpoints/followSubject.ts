import { ApiResponse } from "../types/apiResponse";
import server from "../server";

export const followSubject = (
  subjectName: string
): Promise<ApiResponse<null>> =>
  server.authorized.post("/personal/subjects/follow", { subjectName });

