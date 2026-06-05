import { create } from "zustand";
// constants and types
import { OriginCountryCode } from "@/src/lib/constants";
import { OriginCity } from "@/src/types";

// interface for my store
interface CountryAndCityStore {
  selectedCountry: OriginCountryCode | null;
  selectedCity: OriginCity | null;

  // actions
  setCountry: (country: OriginCountryCode) => void;
  setCity: (city: OriginCity) => void;
  clearCity: () => void;
  reset: () => void;
}

// create my store
// with my type/interface
export const useCountryAndCityStore = create<CountryAndCityStore>(
  // function that defines the store
  (set) => ({
    // initial state
    selectedCountry: null,
    selectedCity: null,

    // actions
    // to update the country and reset city
    setCountry: (country) =>
      set({
        selectedCountry: country,
        // reset city if new country is selected
        selectedCity: null,
      }),

    // to update just the city
    setCity: (city) => set({ selectedCity: city }),

    // to clear just the city
    clearCity: () => set({ selectedCity: null }),

    // for clearing country and city
    reset: () =>
      set({
        selectedCountry: null,
        selectedCity: null,
      }),
  }),
);
