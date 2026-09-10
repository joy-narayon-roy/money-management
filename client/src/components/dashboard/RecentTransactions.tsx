import {
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Transaction } from "../../types/transaction";
import NoRecordsFound from "../NoRecordsFound";

type Props = {
  transactions?: Transaction[]
}
export function RecentTransactions(props: Props) {
  const { transactions = [] } = props

  return (
    <div className="rounded-2xl border border-[#E3EBE7] bg-white">
      <div className="flex items-center justify-between border-b border-[#EDF1EF] px-5 py-4">
        <div>
          <h3 className="text-sm font-bold text-[#26362F]">
            Recent transactions
          </h3>

          <p className="mt-1 text-xs text-text-lite">
            Your latest activity
          </p>
        </div>

        <Link
          to="/transactions"
          className="text-xs font-semibold text-primary hover:text-primary-dark"
        >
          View all
        </Link>
      </div>

      {
        transactions.length === 0 && <NoRecordsFound />
      }

      <div className="divide-y divide-[#EDF1EF]">
        {transactions.map((transaction) => {
          const income =
            transaction.type === "INCOME";

          return (
            <div
              key={transaction.id}
              className="flex items-center gap-3 px-5 py-4"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${income
                  ? "bg-[#E8F5EF] text-[#1C9A6E]"
                  : "bg-[#F4F1ED] text-[#8A7967]"
                  }`}
              >
                {income ? (
                  <ArrowDownLeft className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#33443C]">
                  {transaction.description}
                </p>

                <p className="mt-0.5 text-[11px] text-[#9AA6A1]">
                  {transaction.type} ·{" "}
                  {transaction.date}
                </p>
              </div>

              <p
                className={`text-sm font-bold ${income
                  ? "text-[#1C9A6E]"
                  : "text-[#33443C]"
                  }`}
              >
                {income ? "+" : "−"}৳
                {transaction.amount.toLocaleString()}
              </p>

              <button className="hidden rounded-md p-1 text-[#A0AAA6] hover:bg-[#F3F7F5] sm:block">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}