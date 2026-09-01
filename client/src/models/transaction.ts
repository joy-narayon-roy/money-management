import type { CreateTransactionFormData } from "../types/transaction";

class Transaction {
  static validate(tr: CreateTransactionFormData) {
    for (const [, value] of Object.entries(tr)) {
      if (value === 0 || value === "") {
        return false;
      }
    }
    return true;
  }
}

export default Transaction;
