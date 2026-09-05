"use client";

import {
  LoadingSpinnerWithText,
  CrossingCard,
} from "@/src/components/molecules";
import { CROSSINGS_PAGE_TEXT } from "@/src/lib/constants";
import { useRequireCountryAndCity } from "@/src/hooks/useRequireCountryAndCity";
import useCrossings from "@/src/hooks/useCrossings";

function CrossingsPage() {
  const { selectedCountry, selectedCity } = useRequireCountryAndCity();

  const {
    data: crossings,
    isLoading,
    error,
  } = useCrossings(selectedCountry, selectedCity);

  if (isLoading) return <LoadingSpinnerWithText />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
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
            <CrossingCard key={crossing.id} crossing={crossing} />
          ))}
        </section>
      </div>
    </>
  );
}

export default CrossingsPage;
