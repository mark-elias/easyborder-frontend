"use client";

import type { Favorite } from "@/src/types";
import useWaitTimes from "@/src/hooks/useWaitTimes";
import {
  FavoriteLaneCard,
  LoadingSpinnerWithText,
} from "@/src/components/molecules";

interface Props {
  crossingId: string;
  favoriteLanes: Favorite[];
  onRemove: (favoriteId: string) => void;
}

export function FavoriteCrossingGroup({
  crossingId,
  favoriteLanes,
  onRemove,
}: Props) {
  const { data: waitTimes, isLoading } = useWaitTimes(crossingId);

  if (isLoading) return <LoadingSpinnerWithText />;
  if (!waitTimes) return null;

  const { portName, crossingName } = waitTimes.crossing;

  return (
    <section className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-bold">{portName}</h2>
        <p className="text-custom-grey">{crossingName}</p>
      </div>
      <div className="flex flex-wrap gap-5">
        {favoriteLanes.map((fav) => (
          <FavoriteLaneCard
            key={fav._id}
            favorite={fav}
            waitTimes={waitTimes}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
}
