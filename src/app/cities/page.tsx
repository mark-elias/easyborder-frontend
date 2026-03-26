"use client";
// zustand
import { useCountryStore } from "@/src/lib/store/useCountryStore";

// mock data
const MOCK_CITIES = {
  MX: ["Tijuana", "Nogales", "Ciudad Juarez", "Mexicali", "Nuevo Laredo"],
  CA: ["Vancouver", "Toronto", "Montreal", "Calgary"],
};

function CitiesPage() {
  const selectedCountry = useCountryStore((state) => state.selectedCountry);

  if (!selectedCountry) {
    return <div>Please select a country first</div>;
  }

  const cities = MOCK_CITIES[selectedCountry] || ["city1", "city2", "city3"];

  return (
    <main className="min-h-screen p-5">
      <h1 className="text-4xl font-bold mb-8">Select City</h1>
      <h3>select the city you are crossing from</h3>

      <div className="flex flex-col gap-5 mt-10">
        {cities.map((city) => (
          <div key={city} className="border-1 border-white bg-primary p-5 rounded-2xl">
            {city}
          </div>
        ))}
      </div>
    </main>
  );
}

export default CitiesPage;
