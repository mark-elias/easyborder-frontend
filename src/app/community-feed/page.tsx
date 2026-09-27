"use client";

import usePosts from "@/src/hooks/usePosts";
import { LoadingSpinnerWithText, PostCard } from "@/src/components/molecules";

function CommunityFeedPage() {
  const { data: posts, isLoading, isError } = usePosts();
  if (isLoading) return <LoadingSpinnerWithText />;
  if (isError)
    return <p className="mt-10 text-red-500">Couldn&apos;t load posts.</p>;
  return (
    <div className="flex flex-col gap-6 mt-10 mx-auto w-full max-w-2xl px-4">
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
    </div>
  );
}

export default CommunityFeedPage;
