import type { BaseInterface } from "./baseInterface";
import type { Party } from "./party";

export interface User extends BaseInterface {
  name: string | undefined;
  balance: number | undefined;
  opening_balance: number | undefined;
  parties: Party[];
}
