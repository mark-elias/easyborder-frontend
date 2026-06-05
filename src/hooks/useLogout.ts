import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";

function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear the cached user — NavBar will switch back to showing Login/Sign Up buttons
      queryClient.setQueryData(["currentUser"], null);
    },
  });
}

export default useLogout;
