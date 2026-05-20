//==== Crossing
export interface Crossing {
  _id: string; // MongoDB ID

  portNumber: string;
  portName: string;
  crossingName?: string;

  originCountry: "MX" | "CA";
  originCity: string;
  destinationCity: string;

  portStatus?: "Open" | "Closed" | "N/A";
  hours?: string;
  constructionNotice?: string;

  // lane availabilities
  hasCommercialLanes: boolean;
  hasPassengerLanes: boolean;
  hasPedestrianLanes: boolean;
  maxCommercialLanes: number;
  maxPassengerLanes: number;
  maxPedestrianLanes: number;

  // CBP's last update timestamp (from their API)
  cbpLastUpdateDate?: string;
  cbpLastUpdateTime?: string;

  //mongoDB
  createdAt: string;
  updatedAt: string;
  __v: number;
}

//==== WaitTime
// Lane detail structure
export interface LaneDetail {
  updateTime: string;
  operationalStatus: string;
  delayMinutes: number;
  lanesOpen: number;
}

// Wait time structure
export interface WaitTime {
  _id: string;
  crossing: string | Crossing;

  // commercial
  commercial?: {
    standard: LaneDetail;
    fast: LaneDetail;
  };
  // passenger lanes
  passenger?: {
    standard: LaneDetail;
    sentri: LaneDetail;
    ready: LaneDetail;
  };
  // pedestrian lanes
  pedestrian?: {
    standard: LaneDetail;
    ready: LaneDetail;
  };
  // mongoDB
  createdAt: string;
  updatedAt: string;
  __v: number;
}
