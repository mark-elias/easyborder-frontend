import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "../services/postService";

function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.createPost,
    // refetch the feed so the new post shows up
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export default useCreatePost;
