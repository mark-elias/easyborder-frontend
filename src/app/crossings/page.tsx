"use client";
import { useRequireCountryAndCity } from "@/src/hooks/useRequireCountryAndCity";

function CrossingsPage() {
  const { selectedCountry, selectedCity } = useRequireCountryAndCity();
  return (
    <main className="p-5 min-h-screen">
      <section className="flex flex-col items-center justify-center border">
        <h3>Crossings for {selectedCity}</h3>
        <ul className="">
          <li>aldfksadjlk</li>
          <li>aldfksadjlk</li>
          <li>aldfksadjlk</li>
          <li>aldfksadjlk</li>
          <li>aldfksadjlk</li>
          <li>aldfksadjlk</li>
          <li>aldfksadjlk</li>
          <li>aldfksadjlk</li>
          <li>aldfksadjlk</li>
          <li>aldfksadjlk</li>
          <li>aldfksadjlk</li>
        </ul>
      </section>
    </main>
  );
}

export default CrossingsPage;
