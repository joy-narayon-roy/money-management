import type { PaginationType } from "../../types/pagination";
import type { Party } from "../../types/party";
import { api } from "../api";

interface PartiesResult {
  parties: Party[];
  pagination: PaginationType;
  loading: boolean;
  error: string | null | undefined;
}

export default async function getParties(token: string, query_string: string) {
  return await api.get<PartiesResult>(`party?${query_string}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
