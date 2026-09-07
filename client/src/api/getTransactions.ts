import type { Transaction, TransactionType } from "../types/transaction";
import { api } from "./api";

export interface QueryOptions {
  limit?: number;
  page?: number;
  type?: "ALL" | TransactionType;
  party?: string[];
  sort?: string;
}

export interface TransactionsResult {
  transactions: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
export default async function getTransactions(
  token: string | null,
  opt: QueryOptions,
): Promise<TransactionsResult> {
  if (!token) {
    throw new Error("invalid token");
  }
  const sp = new URLSearchParams({
    limit: `${opt.limit || 10}`,
    page: `${opt.page || 1}`,
  });

  if (opt.type && opt.type !== "ALL") {
    sp.set("type", opt.type);
  }

  if (opt.party && opt.party.length > 0) {
    opt.party.forEach((p) => {
      sp.append("party", p);
    });
  }

  if (opt.sort && opt.sort !== "") {
    sp.set("sort", opt.sort);
  }

  const { data } = await api.get<TransactionsResult>(
    `transaction?${sp.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
}
