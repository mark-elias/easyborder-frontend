"use client";

import { useRouter } from "next/navigation";
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";
import {
  LoadingSpinnerWithText,
  CrossingCard,
} from "@/src/components/molecules";
import { CROSSINGS_PAGE_TEXT } from "@/src/lib/constants";
import { useRequireCountryAndCity } from "@/src/hooks/useRequireCountryAndCity";
import useCrossings from "@/src/hooks/useCrossings";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";

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
            <CrossingCard key={crossing._id} crossing={crossing} />
          ))}
        </section>
      </div>
    </>
  );
}

export default CrossingsPage;
