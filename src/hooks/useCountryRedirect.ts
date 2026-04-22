import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCountryAndCityStore } from "../lib/store/useCountryAndCityStore";

export function useCountryRedirect() {
  const router = useRouter();
  const selectedCountry = useCountryAndCityStore(
    (state) => state.selectedCountry,
  );

  useEffect(() => {
    if (selectedCountry) {
      router.push("/cities");
    }
  }, [selectedCountry, router]);
}
