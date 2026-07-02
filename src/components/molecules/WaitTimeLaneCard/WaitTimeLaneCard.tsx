"use client";

import { Heart } from "lucide-react";
import type { FavoriteLaneType, LaneDetail, TravelerType } from "@/src/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  OperationalStatusBadge,
  TravelerTypeIcon,
} from "@/src/components/atoms";
import {
  getWaitTimeColor,
  LANE_LABELS,
  TRAVELER_TYPE_LABELS,
} from "@/src/lib/utils/waitTimeUtils";

interface Props {
  travelerType: TravelerType;
  laneType: FavoriteLaneType;
  data: LaneDetail;
  isFavorited: boolean;
  onHeartClick: () => void;
}

export function WaitTimeLaneCard({
  travelerType,
  laneType,
  data,
  isFavorited,
  onHeartClick,
}: Props) {
  return (
    <Card
      className="w-[300px] shadow-lg hover:cursor-pointer hover:scale-[1.03]
      transition-transform duration-200 ease-in-out"
    >
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center text-custom-grey">
            <TravelerTypeIcon travelerType={travelerType} className="size-6" />
            <CardDescription className="text-lg font-semibold">
              {TRAVELER_TYPE_LABELS[travelerType]}
            </CardDescription>
          </div>
          <Heart
            onClick={onHeartClick}
            className={`hover:cursor-pointer transition-colors ${
              isFavorited ? "text-red-500 fill-red-500" : "hover:text-red-500"
            }`}
          />
        </div>
        <CardTitle className="font-semibold text-2xl">
          {LANE_LABELS[laneType]}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold text-center my-3">
        <p className={getWaitTimeColor(data.delayMinutes || 0)}>
          {data.delayMinutes} mins
        </p>
      </CardContent>
      <CardFooter className="border-0 flex flex-col items-start gap-1">
        <p>Lanes Open: {data.lanesOpen}</p>
        <OperationalStatusBadge status={data.operationalStatus} />
      </CardFooter>
    </Card>
  );
}
