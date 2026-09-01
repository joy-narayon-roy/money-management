import {
  ArrowDownLeft,
  ArrowUpRight,
  Users,
} from "lucide-react";

import { BalanceCard } from "../components/dashboard/BalanceCard";
import { StatCard } from "../components/dashboard/StatCard";
import { CashFlowChart } from "../components/dashboard/CashFlowChart";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { FinancialSummary } from "../components/dashboard/FinancialSummary";
import { QuickActions } from "../components/dashboard/QuickActions";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { loadSummary, } from "../store/reducers/userSummaryReducer";
import AppLayout from "../components/layout/AppLayout";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((s: RootState) => s.user)
  const token = useSelector((s: RootState) => s.auth.token)
  const summaryState = useSelector((s: RootState) => s.summary)
  // const transactionState = useSelector((s: RootState) => s.transaction)
  // const { user: { user }, token, summaryState } = useSelector((s: RootState) => ({ user: s.user, token: s.auth.token, summaryState: s.summary }))
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).toUpperCase();


  // console.log(transactionState)

  useEffect(() => {
    if (token && !summaryState.summaryLoaded) {
      dispatch(loadSummary(token))
    }
  }, [token, summaryState.summaryLoaded, dispatch])


  const { summary } = summaryState

  return (
    // <DashboardLayout>
    <AppLayout>
      <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-7">
          <p className="text-[10px] font-bold tracking-[0.12em] text-[#9AA6A1]">
            {formattedDate}
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#18231F] sm:text-3xl">
            Hi! {user?.name}
            <span className="ml-1">👋</span>
          </h1>

          <p className="mt-1 text-sm text-[#718079]">
            Here's what's happening with your money.
          </p>
        </div>

        {/* Top stats */}
        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <BalanceCard balance={user?.balance || 0} />

          <StatCard
            title="Total income"
            icon={ArrowDownLeft}
            value={`৳${summary.total_income}`}
            positive={summary.changes.income_sign === "+"}
            change={summary.changes.income}
          />

          <StatCard
            title="Total expenses"
            value={`৳${summary.total_expense}`}
            change={summary.changes.expense}
            positive={summary.changes.expense_sign === "+"}
            icon={summary.changes.expense_sign === "+" ? ArrowUpRight : ArrowDownLeft}
            iconClassName="bg-[#F4F1ED] text-red-400"
          />

          <StatCard
            title="Receivables"
            value={`৳ ${summary.total_recivable}`}
            change={0}
            icon={Users}
            iconClassName="bg-[#EAF0F6] text-[#547493]"
          />
        </div>

        {/* Main chart + actions */}
        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_300px]">
          <CashFlowChart data={summary.monthly} />

          <div className="rounded-2xl border border-[#E3EBE7] bg-white p-5">
            <QuickActions />

          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_1fr]">
          <RecentTransactions />

          <FinancialSummary />
        </div>

        {/* Monthly overview */}
        <div className="mt-5 rounded-2xl border border-[#E3EBE7] bg-[#EDF7F2] p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-primary">
                MONTHLY OVERVIEW
              </p>

              <h3 className="mt-1 text-lg font-bold tracking-[-0.03em] text-[#26362F]">
                You're doing better than last month.
              </h3>

              <p className="mt-1 max-w-xl text-xs leading-5 text-[#718079]">
                Your expenses are down while your income has
                increased. Keep up the good work.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
                <p className="text-[10px] text-[#89958F]">
                  Net cash flow
                </p>

                <p className="mt-1 text-lg font-bold text-primary">
                  +৳23,500
                </p>
              </div>

              <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
                <p className="text-[10px] text-[#89958F]">
                  Savings rate
                </p>

                <p className="mt-1 text-lg font-bold text-[#26362F]">
                  55.9%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}