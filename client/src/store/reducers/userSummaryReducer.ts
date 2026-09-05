import api from "../../api";
import { addTransaction } from "./transactionReducer";
import type { Summary } from "../../types/summary";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface SummaryState {
  loading: boolean;
  error: string | null;
  summary: Summary;
  summaryLoaded: boolean;
}

export const loadSummary = createAsyncThunk(
  "user_summary/loadSummary",
  async (token: string): Promise<Summary> => {
    if (!token) {
      throw new Error("invalid token");
    }
    return await api.summary.getSummary(token);
  },
);

const initialState: SummaryState = {
  error: null,
  loading: true,
  summaryLoaded: false,
  summary: {
    monthly: [],
    changes: {
      expense: 0,
      expense_sign: "+",
      income: 0,
      income_sign: "+",
    },
    total_expense: 0,
    total_income: 0,
    total_recivable: 0,
  },
};

const userSummarySclice = createSlice({
  name: "user_summary",
  initialState,
  reducers: {
    summary_loading_action: (state) => {
      state.loading = true;
      state.error = null;
      state.summaryLoaded = false;
    },
    summary_loaded_action: (state, payload: PayloadAction<Summary>) => {
      state.loading = false;
      state.error = null;
      state.summaryLoaded = true;
      state.summary = payload.payload;
    },
    summary_failed_action: (state, payload) => {
      state.loading = false;
      state.error = payload.payload?.message || "failed to load summary";
      state.summaryLoaded = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(addTransaction, (state, action) => {
      if (!state.summaryLoaded) {
        return;
      }
      if (action.payload.transaction.type === "INCOME") {
        state.summary.total_income += action.payload.transaction.amount;
      } else if (action.payload.transaction.type === "EXPENSE") {
        state.summary.total_expense += action.payload.transaction.amount;
      }
    });

    builder.addCase(loadSummary.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.summaryLoaded = false;
    });
    builder.addCase(loadSummary.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.summaryLoaded = true;
      state.summary = action.payload;
    });
    builder.addCase(loadSummary.rejected, (state, error) => {
      state.loading = false;
      state.error = error.error.message || "faild to load summary";
      state.summaryLoaded = false;
    });
  },
});

export default userSummarySclice.reducer;
export const {
  summary_loading_action,
  summary_loaded_action,
  summary_failed_action,
} = userSummarySclice.actions;
