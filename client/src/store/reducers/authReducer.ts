// store/reducers/authReducer.ts
import type { AuthAction } from '../actions/types';
import {
  SET_TOKEN,
  CLEAR_TOKEN,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  CLEAR_AUTH_ERROR,
} from '../actions/types';

export interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, loading: true, error: null };

    case AUTH_SUCCESS:
      return { ...state, loading: false, error: null };

    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        token: null,
        error: action.payload,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        isLoggedIn: true,
        error: null,
      };

    case CLEAR_TOKEN:
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        loading: false,
        error: null,
      };

    case CLEAR_AUTH_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default authReducer;