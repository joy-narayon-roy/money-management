import type { Option } from "../../types/select_option";
import type {
  CreateTransactionFormData,
} from "../../types/transaction";

interface TransactionSummaryProps {
  form: CreateTransactionFormData;
  parties: Option[]
}

const typeLabels: Record<string, string> = {
  INCOME: "Income",
  EXPENSE: "Expense",
  AR: "Receivable",
  AR_PAYMENT: "Receivable Payment",
  AP: "Payable",
  AP_PAYMENT: "Payable Payment",
};



export default function TransactionSummary({
  form,
  parties = []
}: TransactionSummaryProps) {
  const formattedAmount = form.amount
    ? Number(form.amount).toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    : "0.00";

  const formattedDate = form.date
    ? new Date(
      `${form.date}T00:00:00`
    ).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    : "-";

  return (
    <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">
        Transaction Summary
      </h2>

      <div className="mt-5 space-y-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Type
          </p>

          <p className="mt-1 text-sm font-medium text-gray-900">
            {typeLabels[form.type]}
          </p>
        </div>

        {form.party_id && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Party
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {parties.filter(p => p.value === form.party_id)[0]?.label ?? "-"}
            </p>
          </div>
        )}

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Amount
          </p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            ৳ {formattedAmount}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Date
          </p>

          <p className="mt-1 text-sm font-medium text-gray-900">
            {formattedDate}
          </p>
        </div>

        {form.description && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Description
            </p>

            <p className="mt-1 wrap-break-word text-sm text-gray-600">
              {form.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}