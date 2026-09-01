import {
  CalendarDays,
  ChevronDown,
} from "lucide-react";

import type {
  CreateTransactionFormData,
  TransactionError,
} from "../../types/transaction";

import TransactionField from "./TransactionField";

const transactionTypeOptions = [
  {
    value: "INCOME",
    label: "Income",
  },
  {
    value: "EXPENSE",
    label: "Expense",
  },
  {
    value: "AP",
    label: "AP",
  },
  {
    value: "AP_PAYMENT",
    label: "AP Payment",
  },
  {
    value: "AR",
    label: "AR",
  },
  {
    value: "AR_PAYMENT",
    label: "AR Payment",
  },
];

const amount_suggetion = Array.from({ length: 100 }, (_, i) => i * 100);

type partyInfo = {
  lable: string
  value: string
}
interface TransactionFormProps {
  form: CreateTransactionFormData;
  parties: partyInfo[]
  validation_error: TransactionError
  onChange: (
    field: keyof CreateTransactionFormData,
    value: string
  ) => void;
}


export default function TransactionForm({
  form,
  parties = [],
  validation_error: verr,
  onChange,
}: TransactionFormProps) {
  const {
    type,
    amount,
    date,
    description,
    party_id } = form;



  const isPayment =
    type === "AR_PAYMENT" ||
    type === "AP_PAYMENT";



  return (
    <div className="space-y-6">
      {/* Transaction Type */}
      <TransactionField label="Transaction Type" error_message={verr.type}>
        <div className="relative">
          <select
            value={type}
            onChange={(e) =>
              onChange("type", e.target.value)
            }
            className={`w-full appearance-none rounded-xl border  bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${verr?.type ? "border-red-500" : "border-gray-300"}`}
          >
            {/* {transactionTypeOptions.map((to, i) => <option key={i} value={to.value} >{to.label}</option>)} */}
            <optgroup label="General">
              {transactionTypeOptions
                .filter(
                  (option) =>
                    option.value === "INCOME" ||
                    option.value === "EXPENSE"
                )
                .map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
            </optgroup>

            <optgroup label="Receivable">
              {transactionTypeOptions
                .filter(
                  (option) =>
                    option.value === "AR" ||
                    option.value === "AR_PAYMENT"
                )
                .map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
            </optgroup>

            <optgroup label="Payable">
              {transactionTypeOptions
                .filter(
                  (option) =>
                    option.value === "AP" ||
                    option.value === "AP_PAYMENT"
                )
                .map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
            </optgroup>
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </TransactionField>

      {/* Party */}
      <TransactionField label="Party" error_message={verr.party_id}>
        <div className="relative">
          <select
            value={party_id}
            onChange={(e) =>
              onChange(
                "party_id",
                e.target.value
              )
            }
            required
            className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${verr?.party_id ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select party</option>


            {parties.map((p, i) =>
              <option key={i} value={p.value} >{p.lable}</option>
            )}

          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </TransactionField>


      {/* Outstanding Balance */}
      {isPayment && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Outstanding Balance
          </p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            ৳ 25,000.00
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Current outstanding amount for the
            selected party.
          </p>
        </div>
      )}

      {/* Amount */}
      <TransactionField
        label={isPayment ? "Payment Amount" : "Amount"}
        error_message={verr.amount}
      >
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
            ৳
          </span>

          <input
            className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${verr?.amount ? "border-red-500" : "border-gray-300"}`}
            type="number"
            min="0"
            step="100"
            value={amount}
            onChange={(e) =>
              onChange(
                "amount",
                e.target.value
              )
            }
            placeholder="0.00"
            list="amount_suggetion"
            required
          />
          <datalist id="amount_suggetion">
            {amount_suggetion.map((amo) => <option key={amo} value={amo} >{amo}</option>)}
          </datalist>
        </div>
      </TransactionField>


      {/* Date */}
      <TransactionField label="Date" error_message={verr.date}>
        <div className="relative">
          <CalendarDays
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              onChange(
                "date",
                e.target.value
              )
            }
            required
            className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${verr?.date ? "border-red-500" : "border-gray-300"}`}
          />
        </div>
      </TransactionField>

      {/* Description */}
      <TransactionField
        label="Description"
        error_message={verr.description}
      // optional
      >
        <input
          // rows={4}
          value={description}
          onChange={(e) =>
            onChange(
              "description",
              e.target.value
            )
          }
          autoComplete="on"
          required
          placeholder="Add a note about this transaction..."
          className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${verr?.description ? "border-red-500" : "border-gray-300"}`}
        />
      </TransactionField>
    </div>
  );
}