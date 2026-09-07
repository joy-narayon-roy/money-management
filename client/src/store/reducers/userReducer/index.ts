import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../../../types/user";
import { addBulkTransactions, addTransaction } from "../transactionReducer";
import { loadTransaction } from "../transactionReducer/reducers";
import { loadSummary } from "../userSummaryReducer";
import {
  addPartyReducer,
  updateBalanceOnBulkTransactionsCreated,
  updateBalanceTransactionCreated,
  updateParyReducer,
} from "./reducers";
import api from "../../../api";

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const loadUserByToken = createAsyncThunk(
  "user/loaduserByToken",
  async (token: string, thunkAPI): Promise<User> => {
    if (!token) {
      throw new Error("invalid token");
    }
    const { data } = await api.auth.getUserByToken(token);

    thunkAPI.dispatch(loadTransaction({ limit: 10, page: 1, token }));
    thunkAPI.dispatch(loadSummary(token));

    return data;
  },
);

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};
const userSclice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addParty: addPartyReducer,
    updatePary: updateParyReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserByToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadUserByToken.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(loadUserByToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message || "failed to fetch user";
    });

    builder.addCase(addTransaction, updateBalanceTransactionCreated);

    builder.addCase(
      addBulkTransactions,
      updateBalanceOnBulkTransactionsCreated,
    );
  },
});

export const { addParty, updatePary } = userSclice.actions;

export default userSclice.reducer;
