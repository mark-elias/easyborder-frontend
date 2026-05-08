"use client";

import { useRouter } from "next/navigation";
//zustand
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";
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
// components
import { LoadingSpinnerWithText } from "@/src/components/molecules";

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
    <main className="p-5 min-h-screen">
      <Button
        onClick={handleChangeCity}
        variant="default"
        className="p-4 hover:cursor-pointer"
      >
        {CROSSINGS_PAGE_TEXT.changeCityButtonText}
      </Button>
      <section className="flex flex-col items-center justify-center">
        <div className="text-center mt-5 mb-14">
          <h1>
            {CROSSINGS_PAGE_TEXT.title}
            {selectedCity}
          </h1>
          <h3 className="text-custom-grey">
            {CROSSINGS_PAGE_TEXT.description}
          </h3>
        </div>
        <div className="flex flex-wrap gap-10">
          {crossings?.map((crossing) => (
            <Card
              key={crossing._id}
              className="min-w-[375px] max-w-[400px] border border-custom-blue"
            >
              <CardHeader className="flex items-baseline gap-2">
                <CardTitle className="text-2xl">{crossing.portName}</CardTitle>
                <CardDescription className="text-xl font-semibold">
                  {crossing.crossingName}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-2 text-lg font-semibold my-5">
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
                <p>
                  {CROSSINGS_PAGE_TEXT.portNumberText}
                  <span className="font-normal">{crossing.portNumber}</span>
                </p>
                <p>
                  {CROSSINGS_PAGE_TEXT.lastUpdateText}
                  <span className="font-normal">
                    {crossing.date} {crossing.time}
                  </span>
                </p>
              </CardContent>

              {crossing.constructionNotice && (
                <CardFooter className="text-xs text-custom-grey rounded border-0">
                  {crossing.constructionNotice}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

export default CrossingsPage;
