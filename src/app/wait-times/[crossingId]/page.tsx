"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
// hooks
import useWaitTimes from "@/src/hooks/useWaitTimes";
// zustand
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";
// shadcn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// icons
import { CarFront, Footprints, Heart, TruckIcon } from "lucide-react";
// components
import { LoadingSpinnerWithText } from "@/src/components/molecules";

function WaitTimesPage() {
  const router = useRouter();
  const params = useParams();
  const crossingId = params.crossingId as string;

  const selectedCity = useCountryAndCityStore((state) => state.selectedCity);

  const handleGoBack = () => {
    router.back();
  };

  const { data: waitTimes, isLoading, error } = useWaitTimes(crossingId);

  // helper function to determine wait time color
  const getWaitTimeColor = (minutes: number) => {
    if (minutes === 0) return "text-custom-grey";
    if (minutes <= 30) return "text-custom-green";
    if (minutes <= 60) return "text-custom-yellow";
    return "text-custom-red";
  };

  //
  const getAvailableLaneTypes = () => {
    if (!waitTimes) return [];

    const availableLanes = [];

    // Passenger lanes
    if (waitTimes.passenger) {
      if (waitTimes.passenger.standard) {
        availableLanes.push({
          type: "Passenger",
          lane: "General",
          data: waitTimes.passenger.standard,
          color: "text-custom-blue",
          icon: "CarFront",
        });
      }
      if (waitTimes.passenger.ready) {
        availableLanes.push({
          type: "Passenger",
          lane: "Ready Lane",
          data: waitTimes.passenger.ready,
          color: "text-custom-blue",
          icon: "CarFront",
        });
      }
      if (waitTimes.passenger.sentri) {
        availableLanes.push({
          type: "Passenger",
          lane: "SENTRI",
          data: waitTimes.passenger.sentri,
          color: "text-custom-blue",
          icon: "CarFront",
        });
      }
    }

    // Pedestrian lanes
    if (waitTimes.pedestrian) {
      if (waitTimes.pedestrian.standard) {
        availableLanes.push({
          type: "Pedestrian",
          lane: "General",
          data: waitTimes.pedestrian.standard,
          color: "text-custom-teal",
          icon: "Footprints",
        });
      }
      if (waitTimes.pedestrian.ready) {
        availableLanes.push({
          type: "Pedestrian",
          lane: "Ready Lane",
          data: waitTimes.pedestrian.ready,
          color: "text-custom-teal",
          icon: "Footprints",
        });
      }
    }

    // Commercial lanes
    if (waitTimes.commercial) {
      if (waitTimes.commercial.standard) {
        availableLanes.push({
          type: "Commercial",
          lane: "General",
          data: waitTimes.commercial.standard,
          color: "text-custom-yellow",
          icon: "Truck",
        });
      }
      if (waitTimes.commercial.fast) {
        availableLanes.push({
          type: "Commercial",
          lane: "Fast Lane",
          data: waitTimes.commercial.fast,
          color: "text-custom-yellow",
          icon: "Truck",
        });
      }
    }

    return availableLanes;
  };

  const availableLanes = getAvailableLaneTypes();

  if (isLoading) return <LoadingSpinnerWithText />;
  if (error) return <div>Error: {error.message}</div>;
  if (!waitTimes) return <div>No wait times found</div>;

  return (
    <main className="p-5 min-h-screen">
      <Button
        onClick={handleGoBack}
        variant="default"
        className="p-4 hover:cursor-pointer"
      >
        Go Back
      </Button>

      <section className="flex flex-col items-center justify-center">
        <div className="text-center mt-5 mb-14">
          <h1>Wait Times</h1>
          <h3 className="text-custom-grey">
            current wait times for {selectedCity}
          </h3>
        </div>
      </section>
      <section className="flex flex-wrap gap-10">
        {availableLanes.map((lane, index) => (
          <Card
            key={index}
            className="w-[300px] shadow-lg
                hover:cursor-pointer hover:scale-[1.03]
                transition-transform duration-200 ease-in-out"
          >
            <CardHeader>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center text-custom-grey">
                  {lane.icon === "Truck" && <TruckIcon className="size-6" />}
                  {lane.icon === "CarFront" && <CarFront className="size-6" />}
                  {lane.icon === "Footprints" && (
                    <Footprints className="size-6" />
                  )}
                  <CardDescription className="text-lg font-semibold">
                    {lane.type}
                  </CardDescription>
                </div>
                <Heart className="hover:text-custom-red hover:cursor-pointer" />
              </div>
              <CardTitle className="font-semibold text-2xl">
                {lane.lane}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-center my-3">
              <p className={getWaitTimeColor(lane.data.delayMinutes || 0)}>
                {lane.data.delayMinutes} mins
              </p>
            </CardContent>
            <CardFooter className="border-0 flex flex-col items-start">
              <p>Lanes Open: {lane.data.lanesOpen}</p>
              <p>Operational Status: {lane.data.operationalStatus}</p>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}

export default WaitTimesPage;
