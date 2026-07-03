"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// zustand
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";
// components
import { Button } from "@/components/ui/button";
// constants
import {
  ORIGIN_COUNTRIES,
  MEXICO_CITIES,
  CANADA_CITIES,
} from "@/src/lib/constants";
// types
import { OriginCity } from "@/src/types";

export default function OriginPage() {
  const router = useRouter();
  const { selectedCountry, setCountry, setCity } = useCountryAndCityStore();

  // pre-select tab if store already has a country
  const [activeCountry, setActiveCountry] = useState<"MX" | "CA">(
    selectedCountry ?? "MX",
  );

  const cities = activeCountry === "MX" ? MEXICO_CITIES : CANADA_CITIES;

  const handleCountrySelect = (code: "MX" | "CA") => {
    setActiveCountry(code);
    setCountry(code);
  };

  const handleCitySelect = (city: OriginCity) => {
    setCity(city);
    router.push("/crossings");
  };

  return (
    <div className="flex flex-col items-center gap-10 mt-10">
      <section className="text-center">
        <h3>Where are you crossing from?</h3>
        <p className="text-custom-grey">select a country and city</p>
      </section>

      {/* Country toggle */}
      <div className="flex gap-1">
        {Object.values(ORIGIN_COUNTRIES).map((country) => (
          <Button
            key={country.code}
            variant={activeCountry === country.code ? "action" : "default"}
            className="text-lg font-bold px-2.5 py-2 uppercase"
            onClick={() => handleCountrySelect(country.code)}
          >
            {country.flag} {country.name}
          </Button>
        ))}
      </div>

      {/* City list */}
      <section className="flex flex-col lg:flex-row lg:flex-wrap gap-5 lg:px-60">
        {cities.map((city) => (
          <Button
            key={city}
            variant="outline"
            className="text-lg"
            onClick={() => handleCitySelect(city)}
          >
            {city}
          </Button>
        ))}
      </section>
    </div>
  );
}
