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
  // vehicle lanes
  passengerVehicle?: {
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
