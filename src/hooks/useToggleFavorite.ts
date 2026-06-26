import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "../services/favoriteService";
import { AddFavoritePayload, Favorite } from "../types";

function useToggleFavorite() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (payload: AddFavoritePayload) =>
      favoritesService.addFavorite(payload),

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      const previous = queryClient.getQueryData<Favorite[]>(["favorites"]);

      // Optimistically add a temporary favorite (no _id yet)
      queryClient.setQueryData<Favorite[]>(["favorites"], (old = []) => [
        ...old,
        { _id: "temp", ...payload },
      ]);

      return { previous };
    },
    onError: (_err, _payload, context) => {
      // Roll back on failure
      queryClient.setQueryData(["favorites"], context?.previous);
    },
    onSettled: () => {
      // Sync with server to replace the temp _id with the real one
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (favoriteId: string) =>
      favoritesService.removeFavorite(favoriteId),

    onMutate: async (favoriteId) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      const previous = queryClient.getQueryData<Favorite[]>(["favorites"]);

      // Optimistically remove from cache immediately
      queryClient.setQueryData<Favorite[]>(["favorites"], (old = []) =>
        old.filter((fav) => fav._id !== favoriteId)
      );

      return { previous };
    },
    onError: (_err, _favoriteId, context) => {
      // Roll back on failure
      queryClient.setQueryData(["favorites"], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return { addMutation, removeMutation };
}

export default useToggleFavorite;
