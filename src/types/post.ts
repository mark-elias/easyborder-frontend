export interface Post {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string | null;
  };
}
