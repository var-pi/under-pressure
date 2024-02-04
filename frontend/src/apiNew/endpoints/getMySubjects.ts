import { userId } from "../types/userId";
import { ApiResponse } from "../types/apiResponse";
import { subject } from "../types/subject";
import server from "../server";

export const getMySubjects = (
  userId: userId
): Promise<ApiResponse<subject[]>> =>
  server.authorized.post("/personal/subjects", { userId });

