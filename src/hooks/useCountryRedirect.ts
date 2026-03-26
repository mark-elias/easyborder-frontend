import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCountryStore } from "../lib/store/useCountryStore";

export function useCountryRedirect() {
  const router = useRouter();
  const selectedCountry = useCountryStore((state) => state.selectedCountry);

  useEffect(() => {
    if (selectedCountry) {
      router.push("/cities");
    }
  }, [selectedCountry, router]);
}
