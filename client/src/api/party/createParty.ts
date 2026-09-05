import type { CreatePartyFormData, CreatePartyResponse } from "../../types/party";
import { api } from "../api";

export async function createPartyRequest(
  data: CreatePartyFormData,
  token: string,
) {
  return await api.post<CreatePartyResponse>("party", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
