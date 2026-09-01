export interface BaseInterface {
  id: string | undefined;
  created_at: string | undefined;
  updated_at: string | undefined;
}

class Base {
  #id: string;
  created_at: string;
  updated_at: string;
  constructor(info: BaseInterface) {
    this.#id = info?.id || "";
    this.created_at = info.created_at || "";
    this.updated_at = info.updated_at || "";
  }
  get id(): string {
    return this.#id;
  }
  get createAt(): Date {
    return new Date(this.createAt);
  }
  get updateAt(): Date {
    return new Date(this.updateAt);
  }
}

export default Base;
