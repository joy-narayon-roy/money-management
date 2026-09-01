import axios from "axios";
import type { Summary } from "../models/summary";

export async function getSummary(token: string): Promise<Summary> {
  const { data } = await axios.get<Summary>(`/api/user/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
