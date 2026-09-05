import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from ".";
import type { Party } from "../../../types/party";

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
