import { HttpStatusCode } from "axios";

export interface Entry {
  creationDate: Date;
  stressLevel: number;
}

export interface RequestError {
  statusMessage: string;
  statusCode: HttpStatusCode;
  message: string;
}

export type Subject = string;
