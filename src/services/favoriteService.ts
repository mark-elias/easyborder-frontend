import api from "../lib/api/api";
import { Favorite, AddFavoritePayload } from "../types";

export const favoritesService = {
  getFavorites: () =>
    api.get<Favorite[]>("/user/favorites").then((res) => res.data),

  addFavorite: (payload: AddFavoritePayload) =>
    api.post<Favorite>("/user/favorites", payload).then((res) => res.data),

  removeFavorite: (favoriteId: string) =>
    api.delete(`/user/favorites/${favoriteId}`).then((res) => res.data),
};
