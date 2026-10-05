import type { PartyRoleType } from "../types/party";
import type { Option } from "../types/select_option";
import snake_to_titlecase from "../utils/snake_to_titlecase";

const pr_roles: PartyRoleType[] = [
  "INCOME",
  "INCOME_AR",
  "EXPENSE",
  "AR",
  "AP",
];

const role_opt: Option[] = pr_roles.reduce<Option[]>((p, c) => {
  let label_str = snake_to_titlecase(c);

  switch (c) {
    case "AR":
      label_str = "Account Recivable";
      break;
    case "AP":
      label_str = "Account Payble";
      break;
    case "INCOME_AR":
      label_str = "Income Recivable";
      break;

    default:
      break;
  }

  p.push({
    label: label_str,
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
