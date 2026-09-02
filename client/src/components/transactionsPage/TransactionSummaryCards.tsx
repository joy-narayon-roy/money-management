import {
  ArrowDownLeft,
  ArrowUpRight,
  CircleDollarSign,
  Clock3,
  type LucideProps,
} from "lucide-react";
import type { Summary } from "../../models/summary";

interface CardStyle {
  title: string,
  amount: string,
  change: string,
  description: string,
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
  iconBg: string,
  iconColor: string,
  changeColor: string,
}
const cardStyles: { [key: string]: CardStyle } = {
  total_income: {
    title: "Total income",
    amount: "৳0",
    change: "+0%",
    description: "vs. last month",
    icon: ArrowDownLeft,
    iconBg: "#ECFDF5",
    iconColor: "#10B981",
    changeColor: "#16A34A",
  },
  total_expense: {
    title: "Total expense",
    amount: "৳0",
    change: "+0%",
    description: "vs. last month",
    icon: ArrowUpRight,
    iconBg: "#FEF2F2",
    iconColor: "#EF4444",
    changeColor: "#DC2626",
  },
  total_recivable: {
    title: "Receivable",
    amount: "৳0",
    change: "0 pending",
    description: "outstanding",
    icon: Clock3,
    iconBg: "#EFF6FF",
    iconColor: "#3B82F6",
    changeColor: "#3B82F6",
  },
  payable: {
    title: "Payable",
    amount: "৳0",
    change: "0 pending",
    description: "outstanding",
    icon: CircleDollarSign,
    iconBg: "#FFFBEB",
    iconColor: "#F59E0B",
    changeColor: "#D97706",
  },
}

interface Props {
  summary: Summary
}

const TransactionSummaryCards = (props: Props) => {
  const { summary } = props

  const cards = Object.entries(cardStyles).reduce<CardStyle[]>((pre, curr) => {
    const [key, value] = curr
    if (key === "total_income") {
      value.amount = `৳ ${summary.total_income}`
      value.change = `${summary.changes.income_sign} ${summary.changes.income}`
    } else if (key === "total_expense") {
      value.amount = `৳ ${summary.total_expense}`
      value.change = `${summary.changes.expense_sign} ${summary.changes.expense}`
    } else if (key === "total_recivable") {
      value.amount = `৳ ${summary.total_recivable}`
    }
    pre.push({
      ...value,
    })
    return pre
  }, [])
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.035)] ring-1 ring-[#E2E8F0]/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] font-medium text-[#64748B]">
                  {card.title}
                </p>

                <p className="mt-3 text-[25px] font-semibold tracking-tight text-[#1E293B]">
                  {card.amount}
                </p>
              </div>

              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: card.iconBg,
                  color: card.iconColor,
                }}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={2} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs">
              <span
                className="font-semibold"
                style={{ color: card.changeColor }}
              >
                {card.change}
              </span>

              <span className="text-[#94A3B8]">
                {card.description}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionSummaryCards;