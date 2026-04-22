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
  const router = useRouter();
  // my custom hook; returns selected country value
  // and redirects to homepage if country is NOT selected
  const selectedCountry = useRequireCountry();
  //zustand
  const setCity = useCountryAndCityStore((state) => state.setCity);
  const reset = useCountryAndCityStore((state) => state.reset);

  if (!selectedCountry) return null;

  const cities = selectedCountry === "MX" ? MEXICO_CITIES : CANADA_CITIES;

  const handleChangeCountry = () => {
    reset();
    router.push("/");
  };

  return (
    <main className="min-h-screen p-5">
      <Button
        onClick={handleChangeCountry}
        variant="default"
        className="p-4 hover:cursor-pointer"
      >
        Change Country
      </Button>

      <div className="flex flex-col items-center gap-10 my-10">
        <div className="text-center">
          <h1>{CITIES_PAGE_TEXT.title}</h1>
          <h3 className="text-custom-grey">{CITIES_PAGE_TEXT.description}</h3>
        </div>
        <section className="flex flex-col lg:flex-row lg:flex-wrap gap-5 lg:px-60">
          {cities.map((city) => (
            <Button
              key={city}
              className="text-lg p-6 border-custom-blue hover:bg-custom-blue hover:cursor-pointer"
              variant="outline"
              onClick={() => setCity(city)}
            >
              {city}
            </Button>
          ))}
        </section>
      </div>
    </main>
  );
}

export default CitiesPage;
