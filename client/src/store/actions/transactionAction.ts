import type { Transaction } from "../../types/transaction";
import type { TransactionState } from "../reducers/tranactionReducer";

export const addTransactionAction = (
  state: TransactionState,
  transaction: Transaction,
) => {
  state.transactions.push(transaction);
};
