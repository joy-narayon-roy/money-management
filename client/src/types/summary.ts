export interface Changes {
  income: number;
  income_sign: string;
  expense: number;
  expense_sign: string;
}

export interface Monthly {
  month: string;
  income: number;
  expense: number;
}

export interface Summary {
  total_income: number;
  total_expense: number;
  total_recivable: number;
  changes: Changes;
  // cash_flows: CashFlowInfo[];
  monthly: Monthly[];
}

export interface CashFlowInfo {
  month: string;
  income: number;
  expense: number;
}
