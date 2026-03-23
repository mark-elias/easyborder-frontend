"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
// zustand country store
import { useCountryStore } from "../lib/store/useCountryStore";

function Home() {
  // zustand
  const selectedCountry = useCountryStore((state) => state.selectedCountry);
  const setCountry = useCountryStore((state) => state.setCountry);
  // router
  const router = useRouter();

  // Auto-redirect if country already selected
  useEffect(() => {
    if (selectedCountry) {
      router.push("/cities");
    }
  }, [selectedCountry, router]);

  const handleCountrySelect = (country: "MX" | "CA") => {
    setCountry(country);
  };

  const TEXT = {
    title: "Select Country",
    description: "select the country you are traveling from",
    mexico: "Mexico",
    canada: "Canada",
  };

  return (
    <main className="flex flex-col items-center pt-30 min-h-screen">
      <h1 className="text-3xl font-bold">{TEXT.title}</h1>
      <p className="text-xl text-secondary-grey">{TEXT.description}</p>
      <div className="mt-20 flex flex-col gap-10">
        <button
          onClick={() => handleCountrySelect("MX")}
          className="text-4xl border-secondary-grey border-1 py-5 px-10 flex gap-2 justify-center rounded-xl hover:bg-primary-blue hover:border-primary-blue "
        >
          <span>🇲🇽</span>
          {TEXT.mexico}
        </button>
        <button
          onClick={() => handleCountrySelect("CA")}
          className="text-4xl border-secondary-grey border-1 py-5 px-10 flex gap-2 justify-center rounded-xl hover:bg-primary-blue hover:border-primary-blue shadow-3xl "
        >
          <span>🇨🇦</span>
          {TEXT.canada}
        </button>
      </div>
      <div className="mt-30">
        <p>Selected Country: {selectedCountry}</p>
      </div>
    </main>
  );
}

export default Home;
