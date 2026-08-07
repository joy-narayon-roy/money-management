// store/reducers/userReducer.ts
import type { User, UserAction } from "../actions/types";
import {
  SET_USER,
  CLEAR_USER,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  SET_USER_BALANCE,
} from "../actions/types";

export interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userReducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, loading: true, error: null };

    case USER_SUCCESS:
      return { ...state, loading: false };

    case USER_FAILURE:
      return { ...state, loading: false, data: null };

    case SET_USER_BALANCE:
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            balance: action.payload,
          },
        };
      }
      return state;

    case SET_USER:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };

    case CLEAR_USER:
      return {
        ...state,
        data: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default userReducer;
