import api from "@/src/lib/api/api";
// types
import { WaitTime } from "@/src/types";

export const waitTimesService = {
  getWaitTimes: (crossingId: string) =>
    api.get<WaitTime>(`/wait-times/${crossingId}`).then((res) => res.data),
};
