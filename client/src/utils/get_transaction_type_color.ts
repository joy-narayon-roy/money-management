import type { TransactionType } from "../types/transaction";

const get_transaction_type_color = (tr_type: TransactionType): string => {
  if (tr_type === "INCOME" || tr_type === "AP" || tr_type === "AR_PAYMENT") {
    return "text-income";
  } else return "text-expense";
};

export const get_transaction_type_sign = (tr_type: TransactionType) => {
  return get_transaction_type_color(tr_type) === "text-income" ? "+" : "-";
};

export default get_transaction_type_color;
