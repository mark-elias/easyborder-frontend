import Link from "next/link";
import { MapPin } from "lucide-react";
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";

export function SelectedOriginIndicator() {
  const selectedCity = useCountryAndCityStore((state) => state.selectedCity);

  if (!selectedCity) return null;

  return (
    <Link
      href="/origin"
      className="flex items-center gap-1 text-sm text-custom-grey hover:text-custom-blue transition-colors"
    >
      <MapPin className="size-4" />
      <span>{selectedCity}</span>
    </Link>
  );
}