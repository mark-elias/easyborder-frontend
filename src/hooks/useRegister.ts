import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

// register payload
interface RegisterPayload {
  email: string;
  password: string;
}

// backend success response
interface RegisterResponse {
  token: string;
}

// backend error response
export interface RegisterError {
  message: string;
  error: string;
  statusCode: number;
}

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

function useRegister() {
  const registerUser = (data: RegisterPayload) =>
    axios
      .post<RegisterResponse>(`${API_URL}/auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration successful, token:", data.token);
      // I can store the token in local storage or cookie
    },
    onError: (error: AxiosError<RegisterError>) => {
      const errorData = error.response?.data;
      console.error("Registration failed:", {
        statusCode: errorData?.statusCode,
        message: errorData?.message,
        error: errorData?.error,
      });
    },
  });
}

export default useRegister;
