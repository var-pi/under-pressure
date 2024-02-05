import server from "./server";
// userId can also be imported
import { ApiResponse, Entry, Subject } from "./types";

const getSubjects = (): Promise<ApiResponse<Subject[]>> =>
  server.get("/subjects");

const getMySubjects = (): Promise<ApiResponse<Subject[]>> =>
  server.authorized.post("/personal/subjects", {});

const followSubject = (subjectName: string): Promise<ApiResponse<null>> =>
  server.authorized.post("/personal/subjects/follow", { subjectName });

const unfollowSubject = (subjectName: string): Promise<ApiResponse<null>> =>
  server.authorized.post("/personal/subjects/unfollow", {
    subjectName,
  });

const getEntries = (subjectName: string): Promise<ApiResponse<Entry[]>> =>
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

