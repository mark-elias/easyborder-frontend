export const ORIGIN_COUNTRIES = {
  MX: { code: "MX", name: "Mexico", flag: "🇲🇽" },
  CA: { code: "CA", name: "Canada", flag: "🇨🇦" },
} as const;

// "MX" | "CA"
export type OriginCountryCode = keyof typeof ORIGIN_COUNTRIES;
// just either mx or ca with its fields
export type OriginCountry = (typeof ORIGIN_COUNTRIES)[OriginCountryCode];
