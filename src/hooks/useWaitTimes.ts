import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// interfaces/types
import { WaitTime } from "../types/types";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

function useWaitTimes(crossingId: string) {
  const fetchWaitTimes = () =>
    axios
      .get<WaitTime>(`${API_URL}/wait-times/${crossingId}`)
      .then((res) => res.data);

  return useQuery({
    queryKey: ["waitTimes", crossingId],
    queryFn: fetchWaitTimes,
  });
}

export default useWaitTimes;
