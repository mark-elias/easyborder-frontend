import api from "../lib/api/api";
import { CreatePostPayload, Post } from "../types";

export const postService = {
  getPosts: () => api.get<Post[]>("/posts").then((res) => res.data),

  createPost: (payload: CreatePostPayload) =>
    api.post<Post>("/posts", payload).then((res) => res.data),
};
