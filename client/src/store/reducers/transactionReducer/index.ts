import { createSlice } from "@reduxjs/toolkit";
import type { Transaction } from "../../../types/transaction";
import { addTransactionReducer, loadTransaction } from "./reducers";
import { logout } from "../authReducer";

export interface TransactionState {
  loading: boolean;
  error: string | null;
  total: number;
  offset: number;
  transactions: Transaction[];
}
const initialState: TransactionState = {
  loading: true,
  error: null,
  total: 0,
  offset: 0,
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: addTransactionReducer,
    clearTransactionError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(logout, (state) => {
      state.loading = false;
      state.error = null;
      state.transactions = [];
    });

    builder.addCase(loadTransaction.fulfilled, (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.error = null;
      state.total = action.payload.total;
      const offset = payload.limit * (payload.page - 1);
      if (offset >= state.offset) {
        state.offset = offset;
      }
      const preState = state.transactions.reduce<Record<string, Transaction>>(
        (pre, curr) => {
          pre[curr.id] = curr;
          return pre;
        },
        {},
      );

      payload.transactions.forEach((tr) => {
        preState[tr.id] = tr;
      });

      state.transactions = Object.values(preState);
    });
  },
});

export const { addTransaction, clearTransactionError } =
  transactionSlice.actions;
export default transactionSlice.reducer;
