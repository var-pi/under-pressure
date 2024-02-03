interface ApiResponse<T> {
  data: T;
  message: String;
  status: "success" | "fail";
}

