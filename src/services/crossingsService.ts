import api from "../lib/api/api";
// types and constants
import { Crossing, OriginCity } from "@/src/types";
import { OriginCountryCode } from "@/src/lib/constants";

export const crossingsService = {
  // service wont receive null values since the useCrossings hook has a safety net
  getCrossings: (country: OriginCountryCode, city: OriginCity) =>
    api
      .get<{
        count: number;
        data: Crossing[];
      }>(`/crossings?originCountry=${country}&originCity=${city}`)
      .then((res) => res.data.data),
};
