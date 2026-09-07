import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Transaction } from "../../types/transaction";

interface Props {
    transaction: Transaction;
}

const typeConfig: Record<
    Transaction["type"],
    {
        label: string;
        text: string;
        dot: string;
    }
> = {
    INCOME: {
        label: "Income",
        text: "text-[#15803D]",
        dot: "bg-[#22C55E]",
    },
    EXPENSE: {
        label: "Expense",
        text: "text-[#DC2626]",
        dot: "bg-[#EF4444]",
    },
    AR: {
        label: "Receivable",
        text: "text-[#2563EB]",
        dot: "bg-[#3B82F6]",
    },
    AR_PAYMENT: {
        label: "AR Payment",
        text: "text-[#4F46E5]",
        dot: "bg-[#6366F1]",
    },
    AP: {
        label: "Payable",
        text: "text-[#D97706]",
        dot: "bg-[#F59E0B]",
    },
    AP_PAYMENT: {
        label: "AP Payment",
        text: "text-[#9333EA]",
        dot: "bg-[#A855F7]",
    },
};

const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(Math.abs(value));
};

const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
};

const PartyTransactionRow = ({ transaction }: Props) => {
    const config = typeConfig[transaction.type];

    const isPositive =
        transaction.type === "INCOME" ||
        transaction.type === "AR_PAYMENT";

    const isNegative =
        transaction.type === "EXPENSE" ||
        transaction.type === "AP_PAYMENT";

    return (
        <tr className="group transition hover:bg-[#F8FAFC]">
            <td className="whitespace-nowrap px-6 py-4 text-sm text-[#64748B]">
                {formatDate(transaction.date)}
            </td>

            <td className="px-6 py-4">
                <Link
                    to={`/transactions/${transaction.id}`}
                    className="font-medium text-[#334155] transition hover:text-[#059669]"
                >
                    {transaction.description || "Untitled transaction"}
                </Link>

                {transaction.type && (
                    <p className="mt-1 text-xs text-[#94A3B8]">
                        {transaction.type}
                    </p>
                )}
            </td>

            <td className="px-6 py-4">
                <span
                    className={`inline-flex items-center gap-2 text-sm font-medium ${config.text}`}
                >
                    <span
                        className={`h-2 w-2 rounded-full ${config.dot}`}
                    />
                    {config.label}
                </span>
            </td>

            <td className="whitespace-nowrap px-6 py-4 text-right">
                <div
                    className={`inline-flex items-center gap-1 text-sm font-semibold ${isPositive
                        ? "text-[#059669]"
                        : isNegative
                            ? "text-[#DC2626]"
                            : "text-[#334155]"
                        }`}
                >
                    {isPositive && <ArrowDownLeft size={14} />}
                    {isNegative && <ArrowUpRight size={14} />}
                    {formatMoney(transaction.amount)}
                </div>
            </td>

            <td className="px-4 py-4 text-right">
                <Link
                    to={`/transactions/${transaction.id}`}
                    className="text-xs font-semibold text-[#94A3B8] opacity-0 transition group-hover:opacity-100 hover:text-[#059669]"
                >
                    View
                </Link>
            </td>
        </tr>
    );
};

export default PartyTransactionRow;