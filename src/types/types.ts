// Country
interface Country {
  name: string;
  code: string;
}

// Crossing (Port of Entry)
interface Crossing {
  _id: string; // MongoDB ID
  portNumber: string;
  border: string;
  portName: string;
  crossingName?: string;
  hours?: string;
  portStatus?: string;
  constructionNotice?: string;
}

// Lane detail structure
interface LaneDetail {
  updateTime: string;
  operationalStatus: string;
  delayMinutes: number;
  lanesOpen: number;
}

// Wait time structure
interface WaitTime {
  _id: string;
  crossing: string | Crossing; // Could be populated
  portNumber: string;
  fetchedAt: string;
  isCurrent: boolean;
  passengerVehicle: {
    standard: LaneDetail;
    sentri: LaneDetail;
    ready: LaneDetail;
  };
  pedestrian: {
    standard: LaneDetail;
    ready: LaneDetail;
  };
}
