import { MoreHorizontal } from "lucide-react";
import { Link, } from "react-router-dom";
import type { Transaction, TransactionType } from "../../types/transaction";
import { useEffect, useState } from "react";


const typeConfig: Record<
  TransactionType,
  { label: string; color: string; dot: string }
> = {
  INCOME: {
    label: "Income",
    color: "#15803D",
    dot: "#22C55E",
  },
  EXPENSE: {
    label: "Expense",
    color: "#DC2626",
    dot: "#EF4444",
  },
  AR: {
    label: "Receivable",
    color: "#2563EB",
    dot: "#3B82F6",
  },
  AR_PAYMENT: {
    label: "AR payment",
    color: "#4F46E5",
    dot: "#6366F1",
  },
  AP: {
    label: "Payable",
    color: "#D97706",
    dot: "#F59E0B",
  },
  AP_PAYMENT: {
    label: "AP payment",
    color: "#9333EA",
    dot: "#A855F7",
  },
};

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};

const formatDate = (date_str: string) => {
  const d = new Date(date_str);

  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

type Props = {
  transactions?: Transaction[]
  loading?: boolean
}

const TransactionTable = (props: Props) => {
  const { transactions = [], loading = false } = props
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-212.5">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">
              Date
            </th>

            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">
              Description
            </th>

            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">
              Type
            </th>

            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">
              Party
            </th>

            <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">
              Category
            </th>

            <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">
              Amount
            </th>

            <th className="w-12 px-4" />
          </tr>
        </thead>

        <tbody>
          {loading && <LoadingRow />}
          {transactions.map((transaction) => {
            const config = typeConfig[transaction.type];
            const positive = transaction.amount > 0;

            return (
              <tr
                key={transaction.id}
                className="group border-b border-border/70 last:border-0 transition-colors hover:bg-background"
              >
                <td className="px-6 py-4.5 text-sm text-text-secondary">
                  {formatDate(transaction.date)}
                </td>

                <td className="px-6 py-4.5">
                  <Link
                    to={`/transactions/${transaction.id}`}
                    className="text-sm font-semibold text-text-primary transition-colors hover:text-primary-dark"
                  >
                    {transaction.description}
                  </Link>
                </td>

                <td className="px-6 py-4.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: config.dot }}
                    />

                    <span style={{ color: config.color }}>
                      {config.label}
                    </span>
                  </span>
                </td>

                <td className="px-6 py-4.5 text-sm">
                  {/* {transaction.party ? (
                    <span className="font-medium text-[#475569]">
                      {transaction.party}
                    </span>
                  ) : (
                    <span className="text-[#CBD5E1]">—</span>
                  )} */}
                </td>

                <td className="px-6 py-4.5 text-sm text-text-secondary">
                  {transaction.type ?? "—"}
                </td>

                <td
                  className={`px-6 py-4.5 text-right text-sm font-semibold ${positive ? "text-[#16A34A]" : "text-[#DC2626]"
                    }`}
                >
                  {positive ? "+" : "-"}
                  {formatAmount(transaction.amount)}
                </td>

                <td className="px-4 py-4.5">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] opacity-0 transition-all hover:bg-border hover:text-[#475569] group-hover:opacity-100"
                  >
                    <MoreHorizontal size={17} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

function LoadingRow() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev + 1) % 4);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <tr>
      <td className="text-center py-3.5 text-text-lite text-sm" style={{cursor:"progress"}} colSpan={6}>
        Loading{".".repeat(count)}
        <span className="invisible">{".".repeat(3 - count)}</span>
      </td>
    </tr>
  );
}

