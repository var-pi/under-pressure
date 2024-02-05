// interfaces.ts

export interface ChartData {
  subject: string;
  data: Entry[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: "success" | "fail";
}

