import Base, { type BaseInterface } from "./base";
import Party from "./party";
import type { Parties } from "./party";

export interface UserInterfase extends BaseInterface {
  name: string | undefined;
  balance: number | undefined;
  opening_balance: number | undefined;
  parites: Party[] | undefined;
}
class User extends Base {
  name: string;
  #balance: number;
  #opening_balance: number;
  #parties_id: Parties;
  #parties_count: number;
  constructor(info: UserInterfase) {
    super(info);
    this.name = info?.name || "";
    this.#balance = info?.balance || 0;
    this.#opening_balance = info?.opening_balance || 0;
    this.#parties_id = {};
    this.#parties_count = 0;
    if (info.parites) {
      for (const p of info.parites) {
        const party = new Party(p);
        this.#parties_id[party.id] = party;
        this.#parties_count += 1;
      }
    }
  }
  get balance(): number {
    return this.#balance;
  }
  get opening_balance(): number {
    return this.#opening_balance;
  }
  get parties(): Party[] {
    return Object.values(this.#parties_id);
  }
  get partiesLength(): number {
    return this.#parties_count;
  }

  toJSON() {
    return {
      ...this,
      balance: this.#balance,
      opening_balance: this.#opening_balance,
    };
  }
}

export default User;
