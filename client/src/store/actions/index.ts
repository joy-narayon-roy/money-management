// store/actions/index.ts
import axios from "axios";
import type { ThunkAction } from "redux-thunk";
import type { AppAction,  User } from "./types";
import {
  SET_TOKEN,
  CLEAR_TOKEN,
  // AUTH_REQUEST,
  // AUTH_SUCCESS,
  // AUTH_FAILURE,
  CLEAR_AUTH_ERROR,
  SET_USER,
  CLEAR_USER,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  SET_USER_BALANCE,
} from "./types";
import type { RootState } from "../reducers";

const API_URL = "/api"; // ← change this

// Proper Thunk type (no any)
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppAction
>;

// ======================================================
// USER ACTIONS
// ======================================================

export const fetchUser = (): AppThunk => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    if (!token) {
      dispatch({ type: CLEAR_USER });
      return;
    }

    try {
      dispatch({ type: USER_REQUEST });

      const { data } = await axios.get<User>(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: SET_USER,
        payload: data,
      });
      dispatch({ type: USER_SUCCESS });
    } catch {
      // localStorage.removeItem("auth_token");
      dispatch({ type: CLEAR_TOKEN });
      dispatch({ type: CLEAR_USER });
      dispatch({ type: USER_FAILURE });
    }
  };
};
export const fetchUserBalance = (): AppThunk => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    if (!token) {
      dispatch({ type: CLEAR_USER });
      return;
    }

    try {
      // dispatch({ type: USER_REQUEST });

      const { data } = await axios.get<{
        balance: { current_balance: number };
      }>(`${API_URL}/user/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const {
        balance: { current_balance },
      } = data;
      // console.log(data)
      dispatch({
        type: SET_USER_BALANCE,
        payload: current_balance,
      });
    } catch {
      // localStorage.removeItem("auth_token");
      dispatch({ type: CLEAR_TOKEN });
      dispatch({ type: CLEAR_USER });
      dispatch({ type: USER_FAILURE });
    }
  };
};

// ======================================================
// AUTH ACTIONS
// ======================================================
/*
export const login = (credentials: LoginCredentials): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_REQUEST });

      const { data } = await axios.post<{ token: string }>(
        `${API_URL}/auth/login`,
        credentials,
      );

      localStorage.setItem("auth_token", data.token);

      dispatch({
        type: SET_TOKEN,
        payload: data.token,
      });
      dispatch({ type: AUTH_SUCCESS });

      // Fully typed – no `any`
      dispatch(fetchUser());
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? String(error.response.data.message)
          : "Login failed";

      dispatch({
        type: AUTH_FAILURE,
        payload: message,
      });
    }
  };
};
*/

export const loadTokenAndUser = (): AppThunk => {
  return async (dispatch) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      dispatch({ type: CLEAR_TOKEN });
      dispatch({ type: CLEAR_USER });
      return;
    }

    dispatch({ type: SET_TOKEN, payload: token });
    dispatch(fetchUser());
    dispatch(fetchUserBalance());
  };
};

// export const logout = (): AppThunk => {
//   return (dispatch) => {
//     localStorage.removeItem("auth_token");
//     dispatch({ type: CLEAR_TOKEN });
//     dispatch({ type: CLEAR_USER });
//   };
// };

export const clearAuthError = (): AppAction => ({
  type: CLEAR_AUTH_ERROR,
});
