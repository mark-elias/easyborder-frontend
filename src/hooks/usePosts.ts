import { useQuery } from "@tanstack/react-query";
import { postService } from "../services/postService";

function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: postService.getPosts,
  });
}

export default usePosts;
