"use client";

import { useState } from "react";
import usePosts from "@/src/hooks/usePosts";
import { LoadingSpinnerWithText, PostCard } from "@/src/components/molecules";
import { FloatingActionButton } from "@/src/components/atoms";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/src/hooks/useCurrentUser";

function CommunityFeedPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: posts, isLoading, isError } = usePosts();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateClick = () => {
    if (userLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    setIsCreateOpen(true);
  };

  if (isLoading) return <LoadingSpinnerWithText />;
  if (isError)
    return <p className="mt-10 text-red-500">Couldn&apos;t load posts.</p>;

  return (
    <div className="flex flex-col gap-6 mt-10 mx-auto w-full max-w-2xl px-4 pb-24">
      <h3>Community Feed</h3>
      {posts?.length === 0 ? (
        <p className="text-custom-grey">No posts yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <FloatingActionButton label="Create post" onClick={handleCreateClick} />

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a post</DialogTitle>
            <DialogDescription>
              Share an update about the border with the community.
            </DialogDescription>
          </DialogHeader>
          {/* gonna put form here */}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CommunityFeedPage;
