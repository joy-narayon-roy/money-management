import type { Party } from "../../types/party";
import { api } from "../api";

export default async function getPartyById(token: string, party_id: string) {
  return await api.get<Party>(`party/${party_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
