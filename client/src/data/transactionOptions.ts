import type { GroupOption, Option } from "../types/select_option";
import type { TransactionType } from "../types/transaction";
import snake_to_titlecase from "../utils/snake_to_titlecase";

const transaction_type_group_options: GroupOption[] = [
  {
    label: "General",
    value: [
      {
        value: "INCOME",
        label: "Income",
      },
      {
        value: "EXPENSE",
        label: "Expense",
      },
    ],
  },
  {
    label: "Receivable",
    value: [
      {
        value: "INCOME_AR",
        label: "Income Receivable",
      },
      // {
      //   value: "INCOME_AR_PAYMENT",
      //   label: "Income Receivable",
      // },
      {
        value: "AR",
        label: "Accounts Receivable",
      },
      {
        value: "AR_PAYMENT",
        label: "Accounts Receivable Payment",
      },
    ],
  },
  {
    label: "Payable",
    value: [
      {
        value: "AP",
        label: "Accounts Payable",
      },
      {
        value: "AP_PAYMENT",
        label: "Accounts Payable Payment",
      },
    ],
  },
];

const tr_opt: TransactionType[] = [
  "INCOME",
  "EXPENSE",
  "INCOME_AR",
  // "INCOME_AR_PAYMENT",
  "AR",
  "AR_PAYMENT",
  "AP",
  "AP_PAYMENT",
];

const transaction_types_options: Option[] = tr_opt.reduce<Option[]>((p, c) => {
  p.push({
    label: snake_to_titlecase(c),
    value: c,
  });
  return p;
}, []);

const options = {
  transaction: {
    types: tr_opt,
    type_options: transaction_types_options,
    group_type_options: transaction_type_group_options,
  },
};
export default options;
