import { useQuery } from "@tanstack/react-query";
// services
import { crossingsService } from "@/src/services/crossingsService";
// constants and types
import { OriginCountryCode } from "../lib/constants";
import { OriginCity } from "../types";

function useCrossings(
  country: OriginCountryCode | null,
  city: OriginCity | null,
) {
  return useQuery({
    queryKey: ["crossings", country, city],
    queryFn: () => {
      // null check for country and city
      if (!country || !city) throw new Error("country and city are required");

      return crossingsService.getCrossings(country, city);
    },
    enabled: !!country && !!city,
  });
}

export default useCrossings;
