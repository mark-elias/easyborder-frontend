export type TravelerType = "passenger" | "pedestrian" | "commercial";
export type FavoriteLaneType = "standard" | "sentri" | "ready" | "fast";

export interface Favorite {
  _id: string;
  crossingId: string;
  travelerType: TravelerType;
  laneType: FavoriteLaneType;
}

export interface AddFavoritePayload {
  crossingId: string;
  travelerType: TravelerType;
  laneType: FavoriteLaneType;
}
