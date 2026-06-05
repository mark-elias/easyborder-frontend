"use client";

// zustand
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";
// constants
import { ORIGIN_COUNTRIES, COUNTRY_PAGE_TEXT } from "@/src/lib/constants";
// components
import { CountryButton } from "@/src/components/molecules";
// hooks
import { useCountryRedirect } from "@/src/hooks/useCountryRedirect";

function CountryPage() {
  // zustand
  const setCountry = useCountryAndCityStore((state) => state.setCountry);
  // redirect hook
  useCountryRedirect();

  return (
    <main className="mt-10">
      <section className="flex flex-col justify-start items-center gap-10 h-full">
        <div className="text-center">
          <h1>{COUNTRY_PAGE_TEXT.title}</h1>
          <h3 className="text-custom-grey">{COUNTRY_PAGE_TEXT.description}</h3>
        </div>
        <div className=" flex flex-col gap-5 w-full lg:max-w-xl ">
          {Object.values(ORIGIN_COUNTRIES).map((country) => (
            <CountryButton
              key={country.code}
              flag={country.flag}
              name={country.name}
              onClick={() => setCountry(country.code)}
              variant="outline"
              className="w-full text-3xl py-4"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default CountryPage;
