// store/reducers/authReducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { loginByEmailPassword } from "../actions/authActions";
import { loadUserByToken } from "./userReducer";

export interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("auth_token") || null,
  isLoggedIn: !!localStorage.getItem("auth_token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: (state) => {
      localStorage.removeItem("auth_token");
      state.isLoggedIn = false;
      state.error = null;
      state.loading = false;
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginByEmailPassword.pending, (state) => {
      state.isLoggedIn = false;
      state.loading = true;
      state.error = null;
      state.token = null;
    });
    builder.addCase(loginByEmailPassword.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
    });
    builder.addCase(loginByEmailPassword.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.error.message || "failed to login";
      state.token = null;
    });

    builder.addCase(loadUserByToken.rejected, (state) => {
      state.loading = false;
      state.error = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("auth_token")
      localStorage.clear()
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
