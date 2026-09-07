import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from ".";
import type { Party } from "../../../types/party";
import type { Transaction } from "../../../types/transaction";

export const addPartyReducer: CaseReducer<
  UserState,
  PayloadAction<{ party: Party }>
> = (state, action) => {
  state.error = null;
  state.loading = false;
  if (action.payload.party) {
    state.user?.parties.push(action.payload.party);
  }
};

export const updateParyReducer: CaseReducer<
  UserState,
  PayloadAction<{ party: Party }>
> = (state, action) => {
  if (state.user?.parties) {
    state.user.parties = state.user.parties.map((p) => {
      if (p.id !== action.payload.party.id) {
        return p;
      } else {
        return action.payload.party;
      }
    });
  }
};

export const updateBalanceTransactionCreated: CaseReducer<
  UserState,
  PayloadAction<{ transaction: Transaction }>
> = (state, action) => {
  console.log("Updateing Balance");
  if (!state.user) {
    return;
  }
  const tr_type = action.payload.transaction.type;
  console.log(action);
  if (tr_type === "INCOME" || tr_type === "AP" || tr_type === "AR_PAYMENT") {
    state.user.balance =
      (state.user.balance || 0) + action.payload.transaction.amount;
    console.log(state.user);
  } else if (
    tr_type === "EXPENSE" ||
    tr_type === "AR" ||
    tr_type === "AP_PAYMENT"
  ) {
    state.user.balance =
      (state.user.balance || 0) - action.payload.transaction.amount;
    console.log(state.user);
  }
  console.log(state.user);
};

export const updateBalanceOnBulkTransactionsCreated: CaseReducer<
  UserState,
  PayloadAction<{ transactions: Transaction[] }>
> = (state, action) => {
  const net_balance = (action.payload.transactions || []).reduce(
    (pre, curr) => {
      const tr_type = curr.type;
      if (
        tr_type === "INCOME" ||
        tr_type === "AP" ||
        tr_type === "AR_PAYMENT"
      ) {
        pre += curr.amount;
      } else if (
        tr_type === "EXPENSE" ||
        tr_type === "AR" ||
        tr_type === "AP_PAYMENT"
      ) {
        pre -= curr.amount;
      }
      return pre;
    },
    0,
  );

  if (state.user) {
    state.user.balance = (state.user.balance || 0) + net_balance;
  }
};
