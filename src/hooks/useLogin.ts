import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";

function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    // logging in should refresh currentUser
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

export default useLogin;
