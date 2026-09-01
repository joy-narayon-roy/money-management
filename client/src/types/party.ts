import type { BaseInterface } from "./baseInterface";

export type PartyRoleType =
  | "INCOME"
  | "EXPENSE"
  | "AR"
  | "AR_PAYMENT"
  | "AP"
  | "AP_PAYMENT";

export interface Party extends BaseInterface {
  user_id: string;
  name: string;
  role: PartyRoleType;
  is_active: boolean;
  balance: number;
}
