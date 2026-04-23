import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// interfaces/types
import { Crossing } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

function useCrossings(country: string | null, city: string | null) {
  const fetchCrossings = () =>
    axios
      .get<{
        count: number;
        data: Crossing[];
      }>(`${API_URL}/crossings?originCountry=${country}&originCity=${city}`)
      .then((res) => res.data.data); // backend returns {count, data}

  return useQuery({
    queryKey: ["crossings", country, city],
    queryFn: fetchCrossings,
  });
}

export default useCrossings;
