import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCountryAndCityStore } from '@/src/lib/store/useCountryAndCityStore';

// redirects to homepage if country is NOT selected
export function useRequireCountry() {
  const router = useRouter();
  const selectedCountry = useCountryAndCityStore((state) => state.selectedCountry);

  useEffect(() => {
    if (!selectedCountry) {
      router.push("/");
    }
  }, [selectedCountry, router]);
  
  // return global state so components can use it
  return selectedCountry;
}