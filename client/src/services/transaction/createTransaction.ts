import axios from "axios";
import type { CreateTransactionFormData } from "../../types/transaction";
import { type Transaction } from "../../types/transaction";

export default async function createTransaction(
  token: string,
  new_tr: CreateTransactionFormData,
): Promise<Transaction> {
  const { data } = await axios.post<Transaction>(`/api/transaction`, new_tr, {
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
