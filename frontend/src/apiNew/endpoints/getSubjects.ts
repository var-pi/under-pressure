import { ApiResponse } from "../types/apiResponse";
import { subject } from "../types/subject";

import server from "../server";

export const getSubjects = (): Promise<ApiResponse<subject[]>> =>
  server.get("/subjects");

