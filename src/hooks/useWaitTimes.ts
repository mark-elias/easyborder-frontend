import { useQuery } from "@tanstack/react-query";
import { waitTimesService } from "@/src/services/waitTimesService";

function useWaitTimes(crossingId: string) {
  return useQuery({
    queryKey: ["waitTimes", crossingId],
    queryFn: () => waitTimesService.getWaitTimes(crossingId),
    enabled: !!crossingId,
  });
}

export default useWaitTimes;
