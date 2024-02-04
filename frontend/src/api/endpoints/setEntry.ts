import { ApiResponse } from "../types/apiResponse";
import server from "../server";

export const setEntry = (
  subjectName: string,
  stressLevel: number
): Promise<ApiResponse<null>> =>
  server.authorized.post("/personal/entries/add", {
    subjectName,
    stressLevel,
  });

