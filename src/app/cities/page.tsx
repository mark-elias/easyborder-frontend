"use client";
// zustand
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";
// constants
import { CITIES_PAGE_TEXT } from "@/src/lib/constants/cities-page";
import { MEXICO_CITIES } from "@/src/lib/constants/mexico-cities";
import { CANADA_CITIES } from "@/src/lib/constants/canada-cities";
// components
import { Button } from "@/components/ui/button";

function CitiesPage() {
  const selectedCountry = useCountryAndCityStore(
    (state) => state.selectedCountry,
  );
  const setCity = useCountryAndCityStore((state) => state.setCity);
  const selectedCity = useCountryAndCityStore((state) => state.selectedCity);

  if (!selectedCountry) {
    return <div>Please select a country first</div>;
  }

  const cities = selectedCountry === "MX" ? MEXICO_CITIES : CANADA_CITIES;

  return (
    <main className="flex flex-col items-center gap-10 min-h-screen p-5 my-10 lg:mt-20">
      <div className="text-center">
        <h1>{CITIES_PAGE_TEXT.title}</h1>
        <h3 className="text-custom-grey">{CITIES_PAGE_TEXT.description}</h3>
      </div>

      <section className="flex flex-wrap gap-5 lg:px-60">
        {cities.map((city) => (
          <Button
            key={city}
            className="text-lg p-8 border-custom-blue hover:bg-custom-blue"
            variant="outline"
            onClick={() => setCity(city)}
          >
            {city}
          </Button>
        ))}
      </section>
    </main>
  );
}

export default CitiesPage;
