export interface Crossing {
    _id: string;
    portNumber: string;
    portName: string;
    crossingName?: string;
    originCountry: "MX" | "CA";
    originCity: string;
    destinationCity: string;
    portStatus?: "Open" | "Closed" | "N/A";
    hours?: string;
    constructionNotice?: string;
    hasCommercialLanes: boolean;
    hasPassengerLanes: boolean;
    hasPedestrianLanes: boolean;
    maxCommercialLanes: number;
    maxPassengerLanes: number;
    maxPedestrianLanes: number;
    cbpLastUpdateDate?: string;
    cbpLastUpdateTime?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }