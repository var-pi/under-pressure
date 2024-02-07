import server from "./server";
import { Entry, Subject } from "./types";

const getSubjectsAll = (): Promise<Subject[]> => server.get("/subjects/all");

const getSubjects = (): Promise<Subject[]> =>
  server.authorized.get("/subjects");

const followSubject = (subjectName: string): Promise<null> =>
  server.authorized.post(`/subjects/${subjectName}`, {});

const unfollowSubject = (subjectName: string): Promise<null> =>
  server.authorized.delete(`/subjects/${subjectName}`);

const getEntries = (subjectName: string): Promise<Entry[]> =>
  server.authorized.get(`/subjects/${subjectName}/entries`);

const updateEntry = (subjectName: string, stressLevel: number): Promise<null> =>
  server.authorized.post(`/subjects/${subjectName}/entries`, { stressLevel });

export const api = {
  getSubjectsAll,
  getSubjects,
  followSubject,
  unfollowSubject,
  getEntries,
  updateEntry,
};

