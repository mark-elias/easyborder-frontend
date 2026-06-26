export interface LaneDetail {
  updateTime: string;
  operationalStatus: string;
  delayMinutes: number;
  lanesOpen: number;
}

// Populated crossing shape from wait-times endpoint
export interface PopulatedCrossing {
  _id: string;
  portName: string;
  crossingName: string;
}

export interface WaitTime {
  _id: string;
  crossing: PopulatedCrossing; // no longer string | Crossing
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
