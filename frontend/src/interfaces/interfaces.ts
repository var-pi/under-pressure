// interfaces.ts

export interface ChartData {
  subject: string;
  entries: number[];
  dates: string[];
}

export interface ApiResponse<T> {
  //success: boolean;
  data: string[];
  //error?: string;
}