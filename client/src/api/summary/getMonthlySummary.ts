import type { Monthly } from "../../types/summary";
import { api } from "../api";

export default async function getMonthlySummary(
  token: string,
  duration: string,
): Promise<Monthly[]> {
  const { data } = await api.get<{ monthly: Monthly[] }>(
    `user/summary/monthly?duration=${duration}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.monthly;
}
