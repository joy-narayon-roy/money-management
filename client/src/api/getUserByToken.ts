import type { User } from "../types/user";
import { api } from "./api";

export default async function getUserByToken(token: string) {
  return await api.get<User>(`user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
