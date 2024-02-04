import { ApiResponse } from "../types/apiResponse";
import server from "../server";

export const getEntries = (subjectName: string): Promise<ApiResponse<null>> =>
  server.authorized.post("/personal/entries", {
    subjectName,
  });

