// store/reducers/index.ts
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import userSummaryReducer from "./userSummaryReducer";
import tranactionReducer from "./transactionReducer";
// import todoReducer from "./todoReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  summary: userSummaryReducer,
  transaction: tranactionReducer,
  // todo: todoReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
