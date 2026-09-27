import api from "../lib/api/api";
import { Post } from "../types";

export const postService = {
  getPosts: () => api.get<Post[]>("/posts").then((res) => res.data),
};
