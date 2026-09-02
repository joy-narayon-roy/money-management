import type { BaseInterface } from "./baseInterface";

export type PartyRoleType = "INCOME" | "EXPENSE" | "AR" | "AP";
export interface Party extends BaseInterface {
  user_id: string;
  name: string;
  role: PartyRoleType;
  is_active: boolean;
  total: number;
  paid: number;
  due: number;
}
