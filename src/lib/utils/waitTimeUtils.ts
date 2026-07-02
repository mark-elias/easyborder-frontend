import type {
  Favorite,
  FavoriteLaneType,
  LaneDetail,
  TravelerType,
  WaitTime,
} from "@/src/types";

// returns color based on waittime
export function getWaitTimeColor(minutes: number): string {
  if (minutes === 0) return "text-custom-grey";
  if (minutes <= 30) return "text-custom-green";
  if (minutes <= 60) return "text-custom-yellow";
  return "text-custom-red";
}

// maps lane type keys to display labels
export const LANE_LABELS: Record<FavoriteLaneType, string> = {
  standard: "General",
  ready: "Ready Lane",
  sentri: "SENTRI",
  fast: "Fast Lane",
};

// maps traveler type keys to display labels
export const TRAVELER_TYPE_LABELS: Record<TravelerType, string> = {
  passenger: "Passenger",
  pedestrian: "Pedestrian",
  commercial: "Commercial",
};

// looks up a specific lanes data from a wait time object by traveler and lane type
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

// groups an array of favorites into an object keyed by crossingId
export function groupFavoritesByCrossing(
  favorites: Favorite[],
): Record<string, Favorite[]> {
  return favorites.reduce<Record<string, Favorite[]>>((acc, fav) => {
    if (!acc[fav.crossingId]) acc[fav.crossingId] = [];
    acc[fav.crossingId].push(fav);
    return acc;
  }, {});
}

// shape of a single flattened lane entry used by getAvailableLanes
export interface LaneEntry {
  travelerType: TravelerType;
  laneType: FavoriteLaneType;
  data: LaneDetail;
}

// flattens a wait time object into an array of lane entries, skipping lanes with no data
export function getAvailableLanes(waitTimes: WaitTime): LaneEntry[] {
  const lanes: LaneEntry[] = [];

  if (waitTimes.passenger) {
    const p = waitTimes.passenger;
    if (p.standard)
      lanes.push({
        travelerType: "passenger",
        laneType: "standard",
        data: p.standard,
      });
    if (p.ready)
      lanes.push({
        travelerType: "passenger",
        laneType: "ready",
        data: p.ready,
      });
    if (p.sentri)
      lanes.push({
        travelerType: "passenger",
        laneType: "sentri",
        data: p.sentri,
      });
  }
  if (waitTimes.pedestrian) {
    const w = waitTimes.pedestrian;
    if (w.standard)
      lanes.push({
        travelerType: "pedestrian",
        laneType: "standard",
        data: w.standard,
      });
    if (w.ready)
      lanes.push({
        travelerType: "pedestrian",
        laneType: "ready",
        data: w.ready,
      });
  }
  if (waitTimes.commercial) {
    const c = waitTimes.commercial;
    if (c.standard)
      lanes.push({
        travelerType: "commercial",
        laneType: "standard",
        data: c.standard,
      });
    if (c.fast)
      lanes.push({
        travelerType: "commercial",
        laneType: "fast",
        data: c.fast,
      });
  }

  return lanes;
}
