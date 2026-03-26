export const COUNTRIES = {
  MX: {
    code: "MX",
    name: "Mexico",
    flag: "🇲🇽",
  },
  CA: {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
  },
  USA: {
    code: "USA",
    name: "USA",
    flag: "🇺🇸",
  },
} as const;

// Derive the type from the data
export type CountryCode = keyof typeof COUNTRIES;
export type Country = (typeof COUNTRIES)[CountryCode];
