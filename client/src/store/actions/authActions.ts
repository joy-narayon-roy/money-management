import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginCredentials } from "./types";
import type { AuthState } from "../reducers/authReducer";
import { api } from "../../api/api";

export const loginByEmailPassword = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials): Promise<AuthState> => {
    const { data } = await api.post<{ token: string }>(
      `auth/login`,
      credentials,
    );

    localStorage.setItem("auth_token", data.token);

    return { error: null, isLoggedIn: true, loading: false, token: data.token };
  },
);
