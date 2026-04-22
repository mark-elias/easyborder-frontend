"use client";
import { useRouter } from "next/navigation";
// zustand
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";
// constants
import { CITIES_PAGE_TEXT } from "@/src/lib/constants/cities-page";
import { MEXICO_CITIES } from "@/src/lib/constants/mexico-cities";
import { CANADA_CITIES } from "@/src/lib/constants/canada-cities";
// components
import { Button } from "@/components/ui/button";
// hooks
import { useRequireCountry } from "@/src/hooks/useRequireCountry";

function CitiesPage() {
  // my custom hook; returns selected country value
  // and redirects to homepage if country is NOT selected
  const selectedCountry = useRequireCountry();
  //zustand
  const setCity = useCountryAndCityStore((state) => state.setCity);

  if (!selectedCountry) return null;

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
