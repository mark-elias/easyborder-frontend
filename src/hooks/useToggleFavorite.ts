import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "../services/favoriteService";
import { AddFavoritePayload } from "../types";

function useToggleFavorite() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["favorites"] });
  };

  const addMutation = useMutation({
    mutationFn: (payload: AddFavoritePayload) =>
      favoritesService.addFavorite(payload),
    onSuccess: invalidate,
  });

  const removeMutation = useMutation({
    mutationFn: (favoriteId: string) =>
      favoritesService.removeFavorite(favoriteId),
    onSuccess: invalidate,
  });

  return { addMutation, removeMutation };
}

export default useToggleFavorite;
