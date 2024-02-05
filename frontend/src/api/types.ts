export interface ApiResponse<T> {
  data: T;
  message: string;
  status: "success" | "fail";
}

export interface Entry {
  creationDate: Date;
  stressLevel: number;
}

export type subject = string;

export type userId = number;

