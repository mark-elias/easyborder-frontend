import { create } from "zustand";

// interface for my store
interface CountryAndCityStore {
  selectedCountry: "MX" | "CA" | null;
  selectedCity: string | null;

  // actions
  setCountry: (country: "MX" | "CA") => void;
  setCity: (city: string) => void;
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

    // for clearing country and city
    reset: () =>
      set({
        selectedCountry: null,
        selectedCity: null,
      }),
  }),
);
