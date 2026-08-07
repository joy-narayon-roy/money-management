// store/actions/types.ts
import type { Party, PartyRole } from "./PartyType";
import type { User } from "./UserTypes";

// ========== Auth ==========
export const SET_TOKEN = "SET_TOKEN" as const;
export const CLEAR_TOKEN = "CLEAR_TOKEN" as const;
export const AUTH_REQUEST = "AUTH_REQUEST" as const;
export const AUTH_SUCCESS = "AUTH_SUCCESS" as const;
export const AUTH_FAILURE = "AUTH_FAILURE" as const;
export const CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR" as const;

// ========== User ==========
export const SET_USER = "SET_USER" as const;
export const SET_USER_BALANCE = "SET_USER_BALANCE" as const;
export const CLEAR_USER = "CLEAR_USER" as const;
export const USER_REQUEST = "USER_REQUEST" as const;
export const USER_SUCCESS = "USER_SUCCESS" as const;
export const USER_FAILURE = "USER_FAILURE" as const;

// ========== Action Interfaces ==========
export interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: string;
}
export interface SetUserBalance {
  type: typeof SET_USER_BALANCE;
  payload: number;
}

export interface ClearTokenAction {
  type: typeof CLEAR_TOKEN;
}

export interface AuthRequestAction {
  type: typeof AUTH_REQUEST;
}

export interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS;
}

export interface AuthFailureAction {
  type: typeof AUTH_FAILURE;
  payload: string;
}

export interface ClearAuthErrorAction {
  type: typeof CLEAR_AUTH_ERROR;
}

export interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

export interface ClearUserAction {
  type: typeof CLEAR_USER;
}

export interface UserRequestAction {
  type: typeof USER_REQUEST;
}

export interface UserSuccessAction {
  type: typeof USER_SUCCESS;
}

export interface UserFailureAction {
  type: typeof USER_FAILURE;
}

export type AuthAction =
  | SetTokenAction
  | ClearTokenAction
  | AuthRequestAction
  | AuthSuccessAction
  | AuthFailureAction
  | ClearAuthErrorAction;

export type UserAction =
  | SetUserAction
  | ClearUserAction
  | UserRequestAction
  | UserSuccessAction
  | UserFailureAction
  | SetUserBalance;

export type AppAction = AuthAction | UserAction;

// ========== Shared Types ==========
// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   // add more fields as needed
// }

export interface LoginCredentials {
  email: string;
  password: string;
}
export type { User, Party, PartyRole };
