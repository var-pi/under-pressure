interface ApiResponse<T> {
  data: T;
  message: string;
  status: "success" | "fail";
}

