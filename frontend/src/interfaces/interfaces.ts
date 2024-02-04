// interfaces.ts

export interface ChartData {
  subject: string;
  entries: number[];
  dates: string[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: "success" | "fail";
}

