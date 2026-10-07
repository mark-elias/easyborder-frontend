import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";

// redirects to homepage if country and city are NOT selected
export function useRequireCountryAndCity() {
  const router = useRouter();
  const selectedCountry = useCountryAndCityStore(
    (state) => state.selectedCountry,
  );
  const selectedCity = useCountryAndCityStore((state) => state.selectedCity);

  useEffect(() => {
    // redirect to origin if either value is missing to avoid a blank crossings page
    if (!selectedCountry || !selectedCity) {
      router.push("/origin");
    }
  }, [selectedCountry, selectedCity, router]);

  // return global state so components can use it
  return { selectedCountry, selectedCity };
}
