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

function CrossingsPage() {
  const router = useRouter();
  const clearCity = useCountryAndCityStore((state) => state.clearCity);
  const { selectedCountry, selectedCity } = useRequireCountryAndCity();

  const handleChangeCity = () => {
    clearCity();
    router.push("/origin");
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
      <div className="flex flex-col items-center justify-center gap-10">
        <section className="text-center mt-5">
          <h3>
            {CROSSINGS_PAGE_TEXT.title}
            {selectedCity}
          </h3>
          <p className="text-custom-grey">{CROSSINGS_PAGE_TEXT.description}</p>
        </section>
        <section className="flex flex-wrap gap-5">
          {crossings?.map((crossing) => (
            <CrossingCard key={crossing._id} crossing={crossing} />
          ))}
        </section>
      </div>
    </>
  );
}

export default CrossingsPage;
