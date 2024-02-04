// import { getSubjects } from "./endpoints/getSubjects";
// import { getMySubjects } from "./endpoints/getMySubjects";
// import { getEntries } from "./endpoints/getEntries";
// import { followSubject } from "./endpoints/followSubject";
// import { unfollowSubject } from "./endpoints/unfollowSubject";
// import { setEntry } from "./endpoints/setEntry";

import { ApiResponse } from "./types/apiResponse";
import { userId } from "./types/userId";
import { subject } from "./types/subject";
import server from "./server";

const getSubjects = (): Promise<ApiResponse<subject[]>> =>
  server.get("/subjects");

const getMySubjects = (userId: userId): Promise<ApiResponse<subject[]>> =>
  server.authorized.post("/personal/subjects", { userId });

const followSubject = (subjectName: string): Promise<ApiResponse<null>> =>
  server.authorized.post("/personal/subjects/follow", { subjectName });

const unfollowSubject = (subjectName: string): Promise<ApiResponse<null>> =>
  server.authorized.post("/personal/subjects/unfollow", {
    subjectName,
  });

const getEntries = (subjectName: string): Promise<ApiResponse<null>> =>
  server.authorized.post("/personal/entries", {
    subjectName,
  });

const setEntry = (
  subjectName: string,
  stressLevel: number
): Promise<ApiResponse<null>> =>
  server.authorized.post("/personal/entries/add", {
    subjectName,
    stressLevel,
  });

export {
  getSubjects,
  getMySubjects,
  followSubject,
  unfollowSubject,
  getEntries,
  setEntry,
};

