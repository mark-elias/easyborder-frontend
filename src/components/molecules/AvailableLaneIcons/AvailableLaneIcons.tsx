import { TravelerTypeIcon } from "@/src/components/atoms";

interface Props {
  hasCommercialLanes: boolean;
  hasPassengerLanes: boolean;
  hasPedestrianLanes: boolean;
}

export function AvailableLaneIcons({
  hasCommercialLanes,
  hasPassengerLanes,
  hasPedestrianLanes,
}: Props) {
  return (
    <section className="flex gap-6 text-custom-grey mt-1">
      {hasCommercialLanes && (
        <div className="flex flex-col items-center">
          <TravelerTypeIcon travelerType="commercial" className="size-6" />
          <p>Commercial</p>
        </div>
      )}
      {hasPassengerLanes && (
        <div className="flex flex-col items-center">
          <TravelerTypeIcon travelerType="passenger" className="size-6" />
          <p>Passenger</p>
        </div>
      )}
      {hasPedestrianLanes && (
        <div className="flex flex-col items-center">
          <TravelerTypeIcon travelerType="pedestrian" className="size-6" />
          <p>Pedestrian</p>
        </div>
      )}
    </section>
  );
}
