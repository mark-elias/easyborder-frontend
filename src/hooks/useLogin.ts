import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

// login payload
interface LoginPayload {
  email: string;
  password: string;
}

// success response
interface LoginSuccessResponse {
  success: boolean;
  message: string;
}

// error response
export interface LoginErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

// need to refactor and make http client and service
const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

function useLogin() {
  const loginUser = (data: LoginPayload) =>
    axios
      .post<LoginSuccessResponse>(`${API_URL}/auth/login`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      console.log("Login successful");
      // I can store the token in local storage or cookie
    },
    onError: (error: AxiosError<LoginErrorResponse>) => {
      const errorData = error.response?.data;
      console.error("Login failed:", {
        statusCode: errorData?.statusCode,
        message: errorData?.message,
        error: errorData?.error,
      });
    },
  });
}

export default useLogin;
