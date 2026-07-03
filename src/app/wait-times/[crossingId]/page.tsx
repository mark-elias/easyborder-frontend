"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
// hooks
import useWaitTimes from "@/src/hooks/useWaitTimes";
import useCurrentUser from "@/src/hooks/useCurrentUser";
import useFavorites from "@/src/hooks/useFavorites";
import useToggleFavorite from "@/src/hooks/useToggleFavorite";
// zustand
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";
// types
import type { FavoriteLaneType, TravelerType } from "@/src/types";
// utils
import { getAvailableLanes } from "@/src/lib/utils/waitTimeUtils";
// components
import {
  LoadingSpinnerWithText,
  WaitTimeLaneCard,
} from "@/src/components/molecules";

function WaitTimesPage() {
  const router = useRouter();
  const params = useParams();
  const crossingId = params.crossingId as string;

  const selectedCity = useCountryAndCityStore((state) => state.selectedCity);
  const { data: waitTimes, isLoading, error } = useWaitTimes(crossingId);
  const { data: user } = useCurrentUser();
  const { data: favorites } = useFavorites();
  const { addMutation, removeMutation } = useToggleFavorite();

  const isFavorited = (
    travelerType: TravelerType,
    laneType: FavoriteLaneType,
  ) =>
    favorites?.find(
      (fav) =>
        fav.crossingId === crossingId &&
        fav.travelerType === travelerType &&
        fav.laneType === laneType,
    );

  const handleHeartClick = (
    travelerType: TravelerType,
    laneType: FavoriteLaneType,
  ) => {
    if (!user) {
      router.push("/login");
      return;
    }
    const existing = isFavorited(travelerType, laneType);
    if (existing) {
      removeMutation.mutate(existing._id);
    } else {
      addMutation.mutate({ crossingId, travelerType, laneType });
    }
  };

  if (isLoading) return <LoadingSpinnerWithText />;
  if (error) return <div>Error: {error.message}</div>;
  if (!waitTimes) return <div>No wait times found</div>;

  const availableLanes = getAvailableLanes(waitTimes);

  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <div className="text-center mt-5 mb-14">
          <h3>Wait Times</h3>
          <p className="text-custom-grey">
            current wait times for {selectedCity}
          </p>
        </div>
      </section>
      <section className="flex flex-wrap gap-5">
        {availableLanes.map((lane) => (
          <WaitTimeLaneCard
            key={`${lane.travelerType}-${lane.laneType}`}
            travelerType={lane.travelerType}
            laneType={lane.laneType}
            data={lane.data}
            isFavorited={!!isFavorited(lane.travelerType, lane.laneType)}
            onHeartClick={() =>
              handleHeartClick(lane.travelerType, lane.laneType)
            }
          />
        ))}
      </section>
    </>
  );
}

export default WaitTimesPage;
