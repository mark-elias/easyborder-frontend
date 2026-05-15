"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { BadgeCheck } from "lucide-react";

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
        <div className="text-center mt-5">
          <h1>
            {CROSSINGS_PAGE_TEXT.title}
            {selectedCity}
          </h1>
          <h3 className="text-custom-grey">
            {CROSSINGS_PAGE_TEXT.description}
          </h3>
        </div>
        <div className="flex gap-1 mt-10 mb-5 text-sm items-center text-custom-green">
          <BadgeCheck className="size-3.5" />
          <p>Official CBP data</p>
        </div>
        <div className="flex flex-wrap gap-10">
          {crossings?.map((crossing) => (
            <Link
              key={crossing._id}
              href={`/wait-times/${crossing._id}`}
              className="block"
            >
              <Card
                key={crossing._id}
                className="w-[350px] border border-custom-blue
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
                </CardContent>
                {crossing.constructionNotice && (
                  <CardFooter className="text-xs text-custom-grey rounded border-0">
                    {crossing.constructionNotice}
                  </CardFooter>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default CrossingsPage;
