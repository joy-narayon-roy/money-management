import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  HandCoins,
  ReceiptText,
  Wallet,
} from "lucide-react";

import type { TransactionType } from "../../types/transaction";

interface TransactionTypeSelectorProps {
  value: TransactionType;
  onChange: (value: TransactionType) => void;
}

const transactionTypes = [
  {
    value: "INCOME" as TransactionType,
    label: "Income",
    description: "Money received as income",
    icon: ArrowDownLeft,
  },
  {
    value: "EXPENSE" as TransactionType,
    label: "Expense",
    description: "Money spent",
    icon: ArrowUpRight,
  },
  {
    value: "AR" as TransactionType,
    label: "Receivable",
    description: "Money someone owes you",
    icon: HandCoins,
  },
  {
    value: "AR_PAYMENT" as TransactionType,
    label: "Receivable Payment",
    description: "Payment received from someone",
    icon: Wallet,
  },
  {
    value: "AP" as TransactionType,
    label: "Payable",
    description: "Money you owe someone",
    icon: ReceiptText,
  },
  {
    value: "AP_PAYMENT" as TransactionType,
    label: "Payable Payment",
    description: "Payment made toward what you owe",
    icon: CreditCard,
  },
];

export default function TransactionTypeSelector({
  value,
  onChange,
}: TransactionTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {transactionTypes.map((type) => {
        const Icon = type.icon;
        const selected = value === type.value;

        return (
          <button
            key={type.value}
            type="button"
            onClick={() => onChange(type.value)}
            className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
              selected
                ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                selected
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <Icon size={20} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                {type.label}
              </p>

              <p className="mt-0.5 text-xs leading-5 text-gray-500">
                {type.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}