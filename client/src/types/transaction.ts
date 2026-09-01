export type TransactionType =
  | "INCOME"
  | "EXPENSE"
  | "AR"
  | "AR_PAYMENT"
  | "AP"
  | "AP_PAYMENT";

export interface CreateTransactionFormData {
  type: TransactionType;
  amount: number;
  date: string;
  party_id: string;
  description: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  description: string;
  party_id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}
export interface TransactionError {
  type?: string | null;
  amount?: string | null;
  date?: string | null;
  description?: string | null;
  party_id?: string | null;
}

export type CreateTransactionResponse = {
  transactions: Transaction | null;
  validation_error: TransactionError | null;
  error: string;
};

export type BulkTransactionError = {
  [key: number]: TransactionError | null;
};

export type BulkTransactionResponse = {
  transactions: Transaction[];
  validation_errors: BulkTransactionError;
  error: string;
};
