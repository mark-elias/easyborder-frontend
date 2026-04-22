"use client";

// zustand country store
import { useCountryStore } from "../lib/store/useCountryStore";
// constants
import { COUNTRIES } from "../lib/constants/countries";
import { HOME_PAGE_TEXT } from "../lib/constants/home-page";
// components
import { CountryButton } from "../components/molecules";
// hooks
import { useCountryRedirect } from "../hooks/useCountryRedirect";

function HomePage() {
  // zustand
  const setCountry = useCountryStore((state) => state.setCountry);
  // redirect hook
  useCountryRedirect();

  // only show mexico and canada
  const selectionCountries = [COUNTRIES.MX, COUNTRIES.CA];

  return (
    <main className="flex flex-col justify-center items-center gap-10 min-h-screen p-5">
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
            className="w-full text-3xl py-8 border-custom-blue hover:bg-custom-blue"
          />
        ))}
      </div>
    </main>
  );
}

export default HomePage;
