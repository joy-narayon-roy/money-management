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
  description: string;
}

export interface CreatePartyFormData {
  name: string;
  role: PartyRoleType;
  description: string;
}

export type PartyFormDataValidationError = {
  [K in keyof CreatePartyFormData]?: string | undefined | null;
};

export type CreatePartyResponse = {
  error: string | null;
  party: Party;
  validation_error: PartyFormDataValidationError | null;
};
