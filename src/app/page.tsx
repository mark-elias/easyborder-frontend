"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
// zustand country store
import { useCountryStore } from "../lib/store/useCountryStore";
// shadcn
import { Button } from "@/components/ui/button";

function HomePage() {
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
    mexico_logo: "🇲🇽",
    canada_logo: "🇨🇦",
    mexico: "Mexico",
    canada: "Canada",
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen p-5">
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold">{TEXT.title}</h1>
        <h3 className="text-2xl lg:text-3xl text-custom-grey">
          {TEXT.description}
        </h3>
      </div>

      <div className="mt-10 lg:mt-20 w-full lg:max-w-xl flex flex-col gap-5 ">
        <Button
          onClick={() => handleCountrySelect("MX")}
          variant="outline"
          className="w-full text-3xl py-8 hover:text-black "
        >
          <span>{TEXT.mexico_logo}</span>
          <span>{TEXT.mexico}</span>
        </Button>
        <Button
          onClick={() => handleCountrySelect("CA")}
          variant="outline"
          className="w-full text-3xl py-8 hover:text-black"
        >
          <span>{TEXT.canada_logo}</span>
          <span>{TEXT.canada}</span>
        </Button>
      </div>
    </main>
  );
}

export default HomePage;
