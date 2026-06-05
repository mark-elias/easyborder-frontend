import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";

function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: authService.me,
    retry: false,
  });
}

export default useCurrentUser;
