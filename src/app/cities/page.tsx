"use client";
// zustand
import { useCountryStore } from "@/src/lib/store/useCountryStore";
// cities constants
import { MEXICO_CITIES } from "@/src/lib/constants/mexico-cities";
import { CANADA_CITIES } from "@/src/lib/constants/canada-cities";

function CitiesPage() {
  const selectedCountry = useCountryStore((state) => state.selectedCountry);

  if (!selectedCountry) {
    return <div>Please select a country first</div>;
  }

  const cities = selectedCountry === "MX" ? MEXICO_CITIES : CANADA_CITIES;

  return (
    <main className="min-h-screen p-5">
      <h1 className="text-4xl font-bold mb-1">Select City</h1>
      <h3>select the city you are crossing in from</h3>

      <section className="flex flex-wrap gap-5 mt-20">
        {cities.map((city) => (
          <div key={city} className="border-2 border-custom-blue p-5 rounded-xl hover:bg-custom-blue">
            {city}
          </div>
        ))}
      </section>
    </main>
  );
}

export default CitiesPage;
