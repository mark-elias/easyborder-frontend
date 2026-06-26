import { useQuery } from "@tanstack/react-query";
import { favoritesService } from "../services/favoriteService";
import useCurrentUser from "./useCurrentUser";

function useFavorites() {
  const { data: user } = useCurrentUser();

  return useQuery({
    queryKey: ["favorites"],
    queryFn: favoritesService.getFavorites,
    enabled: !!user, // only fetch if logged in
  });
}

export default useFavorites;
