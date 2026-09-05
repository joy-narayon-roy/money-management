import type {
  CreateTransactionFormData,
  BulkTransactionResponse,
} from "../types/transaction";
import { api } from "./api";

export default async function createBulkTransaction(
  token: string | undefined | null,
  transactions: CreateTransactionFormData[],
): Promise<BulkTransactionResponse> {
  if (!token) {
    throw new Error("invalid token");
  }
  const { data } = await api.post<BulkTransactionResponse>(
    `transaction/bulk`,
    transactions,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
}
