export const PartyRole = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
  AP: "AP",
  AP_PAYMENT: "AP_PAYMENT",
  AR: "AR",
  AR_PAYMENT: "AR_PAYMENT",
};
export interface Party {
  id: string;
  name: string;
  role: string;
  balance: number;
}
