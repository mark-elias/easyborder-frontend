import { Crossing } from "./crossing";

export interface LaneDetail {
  updateTime: string;
  operationalStatus: string;
  delayMinutes: number;
  lanesOpen: number;
}

export interface WaitTime {
  _id: string;
  crossing: string | Crossing;
  commercial?: {
    standard: LaneDetail;
    fast: LaneDetail;
  };
  passenger?: {
    standard: LaneDetail;
    sentri: LaneDetail;
    ready: LaneDetail;
  };
  pedestrian?: {
    standard: LaneDetail;
    ready: LaneDetail;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}