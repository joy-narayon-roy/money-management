import type { Transaction } from "../../types/transaction";
import { api } from "../api";
export default async function getTransactionByID(
  token: string | null,
  id: string,
): Promise<Transaction> {
  if (!token) {
    throw new Error("invalid token");
  }

  const { data } = await api.get<Transaction>(`transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
