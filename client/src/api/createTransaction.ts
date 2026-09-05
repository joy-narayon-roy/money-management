import type {
  CreateTransactionFormData,
  Transaction,
} from "../types/transaction";
import { api } from "./api";

export default async function createTransaction(
  token: string,
  new_tr: CreateTransactionFormData,
): Promise<Transaction> {
  const { data } = await api.post<Transaction>(`transaction`, new_tr, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // const data: Transaction = {
  //   id: `${Math.random() * 100000000}`,
  //   amount: Number(new_tr.amount),
  //   user_id: `${new Date().toISOString()}`,
  //   date: `${new Date().toISOString()}`,

  //   description: new_tr.description || "",
  //   party_id: new_tr.party_id,
  //   type: new_tr.type,
  //   created_at: `${new Date().toISOString()}`,
  //   updated_at: `${new Date().toISOString()}`,
  // };
  return data;
}
