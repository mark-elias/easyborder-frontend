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
    if (!selectedCountry && !selectedCity) {
      router.push("/");
    }
  }, [selectedCountry, selectedCity, router]);

  // return global state so components can use it
  return { selectedCountry, selectedCity };
}
