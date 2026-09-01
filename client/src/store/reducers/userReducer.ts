import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../../types/user";
import { addTransaction } from "./transactionReducer";
import { loadTransaction } from "./transactionReducer/reducers";
import { loadSummary } from "./userSummaryReducer";

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
    const { data } = await axios.get<User>(`/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
  reducers: {},
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

    builder.addCase(addTransaction, (state, action) => {
      if (!state.user) {
        return;
      }
      if (action.payload.transaction.type === "INCOME") {
        state.user.balance =
          (state.user.balance || 0) + action.payload.transaction.amount;
      } else if (action.payload.transaction.type === "EXPENSE") {
        state.user.balance =
          (state.user.balance || 0) - action.payload.transaction.amount;
      }
    });
  },
});

export default userSclice.reducer;
