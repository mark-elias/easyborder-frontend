"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/src/hooks/useCurrentUser";
import useFavorites from "@/src/hooks/useFavorites";
import useToggleFavorite from "@/src/hooks/useToggleFavorite";
import { FavoritesEmptyState, LoadingSpinnerWithText } from "@/src/components/molecules";
import { FavoriteCrossingGroup } from "@/src/components/organisms";
import { groupFavoritesByCrossing } from "@/src/lib/utils/waitTimeUtils";

function FavoritesPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: favorites, isLoading: favoritesLoading } = useFavorites();
  const { removeMutation } = useToggleFavorite();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [user, userLoading, router]);

  if (userLoading || favoritesLoading) return <LoadingSpinnerWithText />;
  if (!user) return null;
  if (!favorites || favorites.length === 0) return <FavoritesEmptyState />;

  const grouped = groupFavoritesByCrossing(favorites);
  const handleRemove = (favoriteId: string) => removeMutation.mutate(favoriteId);

  return (
    <div className="flex flex-col gap-12 mt-10">
      <h1 className="text-3xl font-bold">My Favorites</h1>
      {Object.entries(grouped).map(([crossingId, lanes]) => (
        <FavoriteCrossingGroup
          key={crossingId}
          crossingId={crossingId}
          favoriteLanes={lanes}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}

export default FavoritesPage;
