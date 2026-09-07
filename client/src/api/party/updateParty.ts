import type {
  CreatePartyFormData,
  Party,
} from "../../types/party";
import { api } from "../api";

export async function updatePartyRequest(
  data: CreatePartyFormData,
  token: string,
) {
  return await api.patch<Party>("party", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
