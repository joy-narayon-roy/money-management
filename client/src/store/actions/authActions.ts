import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginCredentials } from "./types";
import axios from "axios";
import type { AuthState } from "../reducers/authReducer";

const API_URL = "/api";

export const loginByEmailPassword = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials): Promise<AuthState> => {
    const { data } = await axios.post<{ token: string }>(
      `${API_URL}/auth/login`,
      credentials,
    );

    localStorage.setItem("auth_token", data.token);

    return { error: null, isLoggedIn: true, loading: false, token: data.token };
  },
);
