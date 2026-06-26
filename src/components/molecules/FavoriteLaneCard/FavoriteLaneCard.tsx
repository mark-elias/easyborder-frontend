"use client";

import { Heart } from "lucide-react";
import type { Favorite, WaitTime } from "@/src/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TravelerTypeIcon } from "@/src/components/atoms";
import {
  getLaneData,
  getWaitTimeColor,
  LANE_LABELS,
  TRAVELER_TYPE_LABELS,
} from "@/src/lib/utils/waitTimeUtils";

interface Props {
  favorite: Favorite;
  waitTimes: WaitTime;
  onRemove: (favoriteId: string) => void;
}

function FavoriteLaneCard({ favorite, waitTimes, onRemove }: Props) {
  const { travelerType, laneType, _id } = favorite;

  const laneData = getLaneData(waitTimes, travelerType, laneType);
  if (!laneData) return null;

  return (
    <Card className="w-[300px] shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex gap-2 items-center text-custom-grey">
            <TravelerTypeIcon travelerType={travelerType} />
            <CardDescription className="text-lg font-semibold">
              {TRAVELER_TYPE_LABELS[travelerType]}
            </CardDescription>
          </div>
          <Heart
            onClick={() => onRemove(_id)}
            className="hover:cursor-pointer text-red-500 fill-red-500 hover:opacity-70 transition-opacity"
          />
        </div>
        <CardTitle className="font-semibold text-2xl">
          {LANE_LABELS[laneType]}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold text-center my-3">
        <p className={getWaitTimeColor(laneData.delayMinutes || 0)}>
          {laneData.delayMinutes} mins
        </p>
      </CardContent>
      <CardFooter className="border-0 flex flex-col items-start">
        <p>Lanes Open: {laneData.lanesOpen}</p>
        <p>Operational Status: {laneData.operationalStatus}</p>
      </CardFooter>
    </Card>
  );
}

export default FavoriteLaneCard;
