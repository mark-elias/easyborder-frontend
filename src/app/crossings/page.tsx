"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
//zustand
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";
// components
import { LoadingSpinnerWithText } from "@/src/components/molecules";
// constants
import { CROSSINGS_PAGE_TEXT } from "@/src/lib/constants/crossings-page";
// hooks
import { useRequireCountryAndCity } from "@/src/hooks/useRequireCountryAndCity";
import useCrossings from "@/src/hooks/useCrossings";
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
import { BadgeCheck, CarFront, Footprints, TruckIcon } from "lucide-react";

function CrossingsPage() {
  const router = useRouter();
  const clearCity = useCountryAndCityStore((state) => state.clearCity);

  const { selectedCountry, selectedCity } = useRequireCountryAndCity();

  const handleChangeCity = () => {
    clearCity();
    router.push("/cities");
  };

  const {
    data: crossings,
    isLoading,
    error,
  } = useCrossings(selectedCountry, selectedCity);

  if (isLoading) return <LoadingSpinnerWithText />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Button onClick={handleChangeCity}>
        {CROSSINGS_PAGE_TEXT.changeCityButtonText}
      </Button>
      <div className="flex flex-col items-center justify-center">
        <section className="text-center mt-5">
          <h1>
            {CROSSINGS_PAGE_TEXT.title}
            {selectedCity}
          </h1>
          <h3 className="text-custom-grey">
            {CROSSINGS_PAGE_TEXT.description}
          </h3>
        </section>
        <section>
          <div className="flex gap-1 mt-10 mb-5 text-sm items-center text-custom-green">
            <BadgeCheck className="size-3.5" />
            <p>Official CBP data</p>
          </div>
        </section>
        <section className="flex flex-wrap gap-10">
          {crossings?.map((crossing) => (
            <Link
              key={crossing._id}
              href={`/wait-times/${crossing._id}`}
              className="block"
            >
              <Card
                key={crossing._id}
                className="w-[350px] h-full
                shadow-lg
                hover:cursor-pointer hover:scale-[1.03]
                transition-transform duration-200 ease-in-out"
              >
                <CardHeader>
                  <div className="flex justify-between items-baseline">
                    <CardTitle className="text-xl">
                      {crossing.portName}
                    </CardTitle>
                    <CardDescription>
                      Port #{crossing.portNumber}
                    </CardDescription>
                  </div>
                  <CardDescription className="text-lg font-semibold">
                    {crossing.crossingName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 font-semibold mt-3">
                  <p>
                    {CROSSINGS_PAGE_TEXT.portStatusText}
                    <span
                      className={`px-1 py-0.5 rounded uppercase text-sm ${
                        crossing.portStatus === "Open"
                          ? "bg-custom-green"
                          : crossing.portStatus === "Closed"
                            ? "bg-custom-red"
                            : "bg-custom-grey"
                      }`}
                    >
                      {crossing.portStatus}
                    </span>
                  </p>
                  <p>
                    {CROSSINGS_PAGE_TEXT.hoursOfOperationText}
                    <span className="font-normal">{crossing.hours}</span>
                  </p>
                  <section className="flex gap-6 text-custom-grey mt-1">
                    {crossing.hasCommercialLanes && (
                      <div className="flex flex-col items-center">
                        <TruckIcon />
                        <p>Commercial</p>
                      </div>
                    )}
                    {crossing.hasPassengerLanes && (
                      <div className="flex flex-col items-center">
                        <CarFront />
                        <p>Passenger</p>
                      </div>
                    )}
                    {crossing.hasPedestrianLanes && (
                      <div className="flex flex-col items-center">
                        <Footprints />
                        <p>Pedestrian</p>
                      </div>
                    )}
                  </section>
                </CardContent>
                {crossing.constructionNotice && (
                  <CardFooter className="text-xs text-custom-grey rounded border-0">
                    {crossing.constructionNotice}
                  </CardFooter>
                )}
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}

export default CrossingsPage;
