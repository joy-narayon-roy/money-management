import type { Summary } from "../../types/summary";
import { api } from "../api";

export default async function getSummary(token: string): Promise<Summary> {
  const { data } = await api.get<Summary>(`user/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
