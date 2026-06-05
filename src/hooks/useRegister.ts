import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";

function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    // registering a user should refresh currentUser
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

export default useRegister;
