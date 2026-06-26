import type { Favorite, FavoriteLaneType, LaneDetail, TravelerType, WaitTime } from "@/src/types";

export function getWaitTimeColor(minutes: number): string {
  if (minutes === 0) return "text-custom-grey";
  if (minutes <= 30) return "text-custom-green";
  if (minutes <= 60) return "text-custom-yellow";
  return "text-custom-red";
}

export const LANE_LABELS: Record<FavoriteLaneType, string> = {
  standard: "General",
  ready: "Ready Lane",
  sentri: "SENTRI",
  fast: "Fast Lane",
};

export const TRAVELER_TYPE_LABELS: Record<TravelerType, string> = {
  passenger: "Passenger",
  pedestrian: "Pedestrian",
  commercial: "Commercial",
};

export function getLaneData(
  waitTimes: WaitTime,
  travelerType: TravelerType,
  laneType: FavoriteLaneType,
): LaneDetail | undefined {
  if (travelerType === "passenger") {
    const lanes = waitTimes.passenger;
    if (!lanes) return undefined;
    if (laneType === "standard") return lanes.standard;
    if (laneType === "sentri") return lanes.sentri;
    if (laneType === "ready") return lanes.ready;
  }
  if (travelerType === "pedestrian") {
    const lanes = waitTimes.pedestrian;
    if (!lanes) return undefined;
    if (laneType === "standard") return lanes.standard;
    if (laneType === "ready") return lanes.ready;
  }
  if (travelerType === "commercial") {
    const lanes = waitTimes.commercial;
    if (!lanes) return undefined;
    if (laneType === "standard") return lanes.standard;
    if (laneType === "fast") return lanes.fast;
  }
  return undefined;
}

export function groupFavoritesByCrossing(
  favorites: Favorite[],
): Record<string, Favorite[]> {
  return favorites.reduce<Record<string, Favorite[]>>((acc, fav) => {
    if (!acc[fav.crossingId]) acc[fav.crossingId] = [];
    acc[fav.crossingId].push(fav);
    return acc;
  }, {});
}