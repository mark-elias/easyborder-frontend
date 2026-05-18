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
import { CarFront } from "lucide-react";
import { Footprints } from "lucide-react";
import { Heart } from "lucide-react";
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
    if (minutes <= 30) return "text-custom-green";
    if (minutes <= 60) return "text-custom-yellow";
    return "text-custom-red";
  };

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
      <section className="flex flex-wrap gap-5">
        <Card className="w-[300px] shadow-2xl">
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center text-custom-grey">
                <CarFront className="size-6"></CarFront>
                <CardDescription className="text-lg font-semibold">
                  Vehicular
                </CardDescription>
              </div>
              <Heart className="hover:text-custom-red hover:cursor-pointer"></Heart>
            </div>
            <CardTitle className="font-semibold text-2xl">General</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-center my-3">
            <p
              className={`${getWaitTimeColor(waitTimes.passengerVehicle?.standard.delayMinutes || 0)}`}
            >
              {waitTimes.passengerVehicle?.standard.delayMinutes} mins
            </p>
          </CardContent>
          <CardFooter className="border-0 flex flex-col items-start">
            <p>Lanes Open: {waitTimes.passengerVehicle?.standard.lanesOpen}</p>
            <p>
              Operational Status:{" "}
              {waitTimes.passengerVehicle?.standard.operationalStatus}
            </p>
          </CardFooter>
        </Card>
        <Card className="w-[300px] shadow-2xl">
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center text-custom-grey">
                <CarFront className="size-6"></CarFront>
                <CardDescription className="text-lg font-semibold">
                  Vehicular
                </CardDescription>
              </div>
              <Heart className="hover:text-custom-red hover:cursor-pointer"></Heart>
            </div>
            <CardTitle className="font-semibold text-2xl">Ready</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-center my-3">
            <p
              className={`${getWaitTimeColor(waitTimes.passengerVehicle?.ready.delayMinutes || 0)}`}
            >
              {waitTimes.passengerVehicle?.ready.delayMinutes} mins
            </p>
          </CardContent>
          <CardFooter className="border-0 flex flex-col items-start">
            <p>Lanes Open: {waitTimes.passengerVehicle?.ready.lanesOpen}</p>
            <p>
              Operational Status:{" "}
              {waitTimes.passengerVehicle?.ready.operationalStatus}
            </p>
          </CardFooter>
        </Card>
        <Card className="w-[300px] shadow-2xl">
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center text-custom-grey">
                <CarFront className="size-6"></CarFront>
                <CardDescription className="text-lg font-semibold">
                  Vehicular
                </CardDescription>
              </div>
              <Heart className="hover:text-custom-red hover:cursor-pointer"></Heart>
            </div>
            <CardTitle className="font-semibold text-2xl">Sentri</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-center my-3">
            <p
              className={`${getWaitTimeColor(waitTimes.passengerVehicle?.sentri.delayMinutes || 0)}`}
            >
              {waitTimes.passengerVehicle?.sentri.delayMinutes} mins
            </p>
          </CardContent>
          <CardFooter className="border-0 flex flex-col items-start">
            <p>Lanes Open: {waitTimes.passengerVehicle?.sentri.lanesOpen}</p>
            <p>
              Operational Status:{" "}
              {waitTimes.passengerVehicle?.sentri.operationalStatus}
            </p>
          </CardFooter>
        </Card>
        <Card className="w-[300px] shadow-2xl">
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center text-custom-grey">
                <Footprints className="size-6"></Footprints>
                <CardDescription className="text-lg font-semibold">
                  Pedestrian
                </CardDescription>
              </div>
              <Heart className="hover:text-custom-red hover:cursor-pointer"></Heart>
            </div>
            <CardTitle className="font-semibold text-2xl">General</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-center my-3">
            <p
              className={`${getWaitTimeColor(waitTimes.pedestrian?.standard.delayMinutes || 0)}`}
            >
              {waitTimes.pedestrian?.standard.delayMinutes} mins
            </p>
          </CardContent>
          <CardFooter className="border-0 flex flex-col items-start">
            <p>Lanes Open: {waitTimes.pedestrian?.standard.lanesOpen}</p>
            <p>
              Operational Status:{" "}
              {waitTimes.pedestrian?.standard.operationalStatus}
            </p>
          </CardFooter>
        </Card>
        <Card className="w-[300px] shadow-2xl">
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center text-custom-grey">
                <Footprints className="size-6"></Footprints>
                <CardDescription className="text-lg font-semibold">
                  Pedestrian
                </CardDescription>
              </div>
              <Heart className="hover:text-custom-red hover:cursor-pointer"></Heart>
            </div>
            <CardTitle className="font-semibold text-2xl">Ready</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-center my-3">
            <p
              className={`${getWaitTimeColor(waitTimes.pedestrian?.ready.delayMinutes || 0)}`}
            >
              {waitTimes.pedestrian?.ready.delayMinutes} mins
            </p>
          </CardContent>
          <CardFooter className="border-0 flex flex-col items-start">
            <p>Lanes Open: {waitTimes.pedestrian?.ready.lanesOpen}</p>
            <p>
              Operational Status:{" "}
              {waitTimes.pedestrian?.ready.operationalStatus}
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}

export default WaitTimesPage;
