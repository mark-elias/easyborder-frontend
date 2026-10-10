import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false during SSR and hydration, true once running in the browser
function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export default useIsClient;
