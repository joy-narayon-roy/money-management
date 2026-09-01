import {
  createAsyncThunk,
  type CaseReducer,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TransactionState } from ".";
import type { Transaction } from "../../../types/transaction";
import axios from "axios";

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
    total: number;
    limit: number;
    page: number;
  }> => {
    const sp = new URLSearchParams({
      limit: `${option.limit}`,
      page: `${option.page}`,
    });
    interface Response {
      total: number;
      transactions: Transaction[];
    }
    const { data } = await axios.get<Response>(
      `/api/transaction?${sp.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${option.token}`,
        },
      },
    );

    return { ...data, ...option };
  },
);
