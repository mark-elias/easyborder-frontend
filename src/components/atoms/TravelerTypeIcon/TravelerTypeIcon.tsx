import { CarFront, Footprints, TruckIcon } from "lucide-react";
import type { TravelerType } from "@/src/types";

interface Props {
  travelerType: TravelerType;
  className?: string;
}

export function TravelerTypeIcon({
  travelerType,
  className = "size-5",
}: Props) {
  if (travelerType === "passenger") return <CarFront className={className} />;
  if (travelerType === "pedestrian")
    return <Footprints className={className} />;
  return <TruckIcon className={className} />;
}
