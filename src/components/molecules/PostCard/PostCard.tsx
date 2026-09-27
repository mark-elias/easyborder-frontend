import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Post } from "@/src/types";
import { formatRelativeTime } from "@/src/lib/utils/formatRelativeTime";

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-col">
        <span className="font-semibold">
          {post.user.username ?? "Anonymous"}
        </span>
        <time
          dateTime={post.createdAt}
          className="text-sm text-custom-grey"
          suppressHydrationWarning
        >
          {formatRelativeTime(post.createdAt)}
        </time>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap break-words">{post.content}</p>
      </CardContent>
    </Card>
  );
}
