import axios from "axios";
import type {
  CreateTransactionFormData,
  BulkTransactionResponse,
} from "../../types/transaction";

export default async function createBulkTransaction(
  token: string | undefined | null,
  transactions: CreateTransactionFormData[],
): Promise<BulkTransactionResponse> {
  if (!token) {
    throw new Error("invalid token");
  }
  const { data } = await axios.post<BulkTransactionResponse>(
    `/api/transaction/bulk`,
    transactions,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
}
