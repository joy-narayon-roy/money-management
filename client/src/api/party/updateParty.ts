import type { CreatePartyFormData, Party } from "../../types/party";
import { api } from "../api";

export async function updatePartyRequest(
  token: string,
  party_id: string,
  data: CreatePartyFormData,
) {
  return await api.patch<Party>(`party/${party_id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
