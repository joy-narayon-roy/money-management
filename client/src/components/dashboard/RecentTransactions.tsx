import {
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}

const transactions: Transaction[] = [
  {
    id: "1",
    name: "Salary",
    category: "Income",
    date: "Aug 22, 2026",
    amount: 42000,
    type: "income",
  },
  {
    id: "2",
    name: "House Rent",
    category: "Housing",
    date: "Aug 20, 2026",
    amount: 15000,
    type: "expense",
  },
  {
    id: "3",
    name: "Groceries",
    category: "Food",
    date: "Aug 19, 2026",
    amount: 3250,
    type: "expense",
  },
  {
    id: "4",
    name: "Freelance",
    category: "Income",
    date: "Aug 17, 2026",
    amount: 8500,
    type: "income",
  },
];

export function RecentTransactions() {
  return (
    <div className="rounded-2xl border border-[#E3EBE7] bg-white">
      <div className="flex items-center justify-between border-b border-[#EDF1EF] px-5 py-4">
        <div>
          <h3 className="text-sm font-bold text-[#26362F]">
            Recent transactions
          </h3>

          <p className="mt-1 text-xs text-[#89958F]">
            Your latest activity
          </p>
        </div>

        <Link
          to="/transactions"
          className="text-xs font-semibold text-[#1C9A6E] hover:text-[#153E30]"
        >
          View all
        </Link>
      </div>

      <div className="divide-y divide-[#EDF1EF]">
        {transactions.map((transaction) => {
          const income =
            transaction.type === "income";

          return (
            <div
              key={transaction.id}
              className="flex items-center gap-3 px-5 py-4"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  income
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
                  {transaction.name}
                </p>

                <p className="mt-0.5 text-[11px] text-[#9AA6A1]">
                  {transaction.category} ·{" "}
                  {transaction.date}
                </p>
              </div>

              <p
                className={`text-sm font-bold ${
                  income
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