import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface CurrentUser {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

function useCurrentUser() {
  const fetchCurrentUser = () =>
    axios
      .get<{ user: CurrentUser }>(`${API_URL}/auth/me`, {
        withCredentials: true,
      })
      .then((res) => res.data.user);

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
  });
}

export default useCurrentUser;
