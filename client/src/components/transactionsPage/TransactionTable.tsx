import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react";
import { Link, } from "react-router-dom";
import type { Transaction, TransactionType } from "../../types/transaction";
import { useEffect, useState } from "react";

import style from './styles/transactionTable.module.css'
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import formatAmount from "../../utils/formatAmount";


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
  sort?: string
  updateSort?: (key: string, order: "" | "-") => void
}

const TransactionTable = (props: Props) => {
  const {
    transactions = [], loading = false, sort = "",
    updateSort = () => { }
  } = props

  const user = useSelector((s: RootState) => s.user)


  const getPartyById = (pid: string) => {
    return (user.user?.parties || []).filter(p => p.id === pid)[0]
  }

  const sort_infos = sort.split(",").reduce<{ [k: string]: "" | "-" }>((p, c) => {
    if (c[0] === "-") {
      p[c.replace("-", "")] = "-"
    } else {
      p[c.replace("-", "")] = ""
    }

    return p
  }, {})

  return (
    <div className={style.table_container}>
      <table className={style.table}>
        <thead>
          <tr className={style.table_head_tr}>
            <th className={`${style.table_head_tr_th}`}>
              Date
              <button className="p-1" onClick={() => updateSort("date", sort_infos["date"] === "-" ? "" : "-")}>

                {
                  sort_infos["date"] === "-" ?
                    <ArrowUp size={12} /> :
                    <ArrowDown size={12} />
                }
              </button>
            </th>

            <th className={style.table_head_tr_th}>
              Description
              <button className="p-1" onClick={() => updateSort("description", sort_infos["date"] === "-" ? "" : "-")}>
                {
                  sort_infos["description"] === "-" ?
                    <ArrowUp size={12} /> :
                    <ArrowDown size={12} />
                }
              </button>

            </th>

            <th className={style.table_head_tr_th}>
              Type
              <button className="p-1" onClick={() => updateSort("type", sort_infos["type"] === "-" ? "" : "-")}>

                {
                  sort_infos["type"] === "-" ?
                    <ArrowUp size={12} /> :
                    <ArrowDown size={12} />
                }
              </button>
            </th>

            <th className={style.table_head_tr_th}>
              Party
              <button className="p-1" onClick={() => updateSort("party", sort_infos["party"] === "-" ? "" : "-")}>

                {
                  sort_infos["party"] === "-" ?
                    <ArrowUp size={12} /> :
                    <ArrowDown size={12} />
                }
              </button>

            </th>

            <th className={`${style.table_head_tr_th}`} style={{ textAlign: "right" }}>
              Amount
              <button className="p-1" onClick={() => updateSort("amount", sort_infos["amount"] === "-" ? "" : "-")}>

                {
                  sort_infos["amount"] === "-" ?
                    <ArrowUp size={12} /> :
                    <ArrowDown size={12} />
                }
              </button>

            </th>

            <th className="w-12 px-4" />
          </tr>
        </thead>

        <tbody>
          {loading && <LoadingRow />}
          {transactions.map((transaction) => {
            const config = typeConfig[transaction.type];
            const positive = (transaction.type === "INCOME" || transaction.type === "AR_PAYMENT" || transaction.type === "AP");
            const party = getPartyById(transaction.party_id)

            return (
              <tr
                key={transaction.id}
                className="group border-b border-border/70 last:border-0 transition-colors hover:bg-background"
              >
                <td className={`${style.table_body_tr_td} text-sm text-text-secondary`}>
                  {formatDate(transaction.date)}
                </td>

                <td className={style.table_body_tr_td}>
                  <Link
                    to={`/transactions/${transaction.id}`}
                    className="text-sm font-semibold text-text-primary transition-colors hover:text-primary-dark"
                  >
                    {transaction.description}
                  </Link>
                </td>

                <td className={style.table_body_tr_td}>
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

                <td className={`${style.table_body_tr_td} text-sm`}>
                  {party ? (
                    <span className="font-medium text-[#475569]">
                      {party.name}
                    </span>
                  ) : (
                    <span className="text-[#CBD5E1]">—</span>
                  )}
                </td>

                <td className={`${style.table_body_tr_td} text-right text-sm font-semibold ${positive ? "text-income" : "text-expense"}`}>
                  {positive ? "+" : "-"}
                  {formatAmount(transaction.amount)}
                </td>

                <td className={style.table_body_tr_td}>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-text-disable opacity-0 transition-all hover:bg-border hover:text-[#475569] group-hover:opacity-100"
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
      <td className="text-center py-3.5 text-text-lite text-sm" style={{ cursor: "progress" }} colSpan={6}>
        Loading{".".repeat(count)}
        <span className="invisible">{".".repeat(3 - count)}</span>
      </td>
    </tr>
  );
}

