import type { Party } from "./PartyType";

export interface User {
  id: string;
  name: string;
  balance: number;
  email: string;
  created_at: string;
  updated_at: string;
  parties: Party[];
  // add more fields as needed
}
// export type { User };
