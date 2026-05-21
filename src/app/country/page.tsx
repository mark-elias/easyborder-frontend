"use client";

import { useRouter } from "next/navigation";
// zustand
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";
// constants
import { COUNTRIES } from "@/src/lib/constants/countries";
import { HOME_PAGE_TEXT } from "@/src/lib/constants/home-page";
// components
import { CountryButton } from "@/src/components/molecules";
// hooks
import { useCountryRedirect } from "@/src/hooks/useCountryRedirect";
import { Button } from "@/components/ui/button";

function CountryPage() {
  const router = useRouter();
  // zustand
  const setCountry = useCountryAndCityStore((state) => state.setCountry);
  // redirect hook
  useCountryRedirect();

  // only show mexico and canada
  const selectionCountries = [COUNTRIES.MX, COUNTRIES.CA];

  return (
    <main className="min-h-screen p-5">
      <Button
        onClick={() => router.push("/")}
        variant="default"
        className="p-4 hover:cursor-pointer"
      >
        Go Back
      </Button>
      <section className="flex flex-col justify-center items-center gap-10">
        <div className="text-center">
          <h1>{HOME_PAGE_TEXT.title}</h1>
          <h3 className="text-custom-grey">{HOME_PAGE_TEXT.description}</h3>
        </div>

        <div className=" flex flex-col gap-5 w-full lg:max-w-xl ">
          {selectionCountries.map((country) => (
            <CountryButton
              key={country.code}
              flag={country.flag}
              name={country.name}
              onClick={() => setCountry(country.code)}
              variant="outline"
              className="w-full text-3xl py-8 border-custom-blue hover:bg-custom-blue hover:cursor-pointer"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default CountryPage;
