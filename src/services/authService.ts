import api from "../lib/api/api";
import { AuthPayload, AuthSuccessResponse, CurrentUser } from "../types";

export const authService = {
  login: (data: AuthPayload) =>
    api.post<AuthSuccessResponse>("/auth/login", data).then((res) => res.data),

  register: (data: AuthPayload) =>
    api
      .post<AuthSuccessResponse>("/auth/register", data)
      .then((res) => res.data),

  me: () =>
    api.get<{ user: CurrentUser }>("/auth/me").then((res) => res.data.user),

  logout: () => api.post("/auth/logout").then((res) => res.data),
};
