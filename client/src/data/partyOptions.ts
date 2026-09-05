import type { PartyRoleType } from "../types/party";
import type { Option } from "../types/select_option";
import snake_to_titlecase from "../utils/snake_to_titlecase";

const pr_roles: PartyRoleType[] = ["INCOME", "EXPENSE", "AR", "AP"];

const role_opt: Option[] = pr_roles.reduce<Option[]>((p, c) => {
  p.push({
    label:
      c === "AR"
        ? "Account Recivable"
        : c === "AP"
          ? "Account Payble"
          : snake_to_titlecase(c),
    value: c,
  });
  return [...p];
}, []);

const options = {
  party: {
    role: {
      roles: pr_roles,
      role_options: role_opt,
    },
  },
};
export default options;
