import {
  createAsyncThunk,
  type CaseReducer,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TransactionState } from ".";
import type { Transaction } from "../../../types/transaction";
import api from "../../../api";

export const addTransactionReducer: CaseReducer<
  TransactionState,
  PayloadAction<{ transaction: Transaction }>
> = (state, action) => {
  state.error = null;
  state.loading = false;
  const prevState = state.transactions.reduce<Record<string, Transaction>>(
    (pre, curr) => {
      pre[curr.id] = curr;
      return pre;
    },
    {},
  );
  const { transaction } = action.payload;
  prevState[transaction.id] = transaction;
  state.total += 1;
  state.transactions = Object.values(prevState);
};

export interface LoadTransactionOption {
  token: string;
  limit: number;
  page: number;
}

export const loadTransaction = createAsyncThunk(
  "transaction/loadTransaction",
  async (
    option: LoadTransactionOption,
  ): Promise<{
    transactions: Transaction[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
  }> => {
    const { token, ...opt } = option;
    const data = await api.getTransactions(token, {
      ...opt,
    });

    return data;
  },
);
