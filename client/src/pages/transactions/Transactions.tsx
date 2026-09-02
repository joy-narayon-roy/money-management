// pages/Transactions.tsx
import { Link, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import {
    TransactionSummaryCards,
    TransactionFilters,
    TransactionPagination,
    TransactionTable,
    TransactionTabs
} from '../../components/transactionsPage'
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useEffect, useState } from "react";
import type { Transaction, TransactionType } from "../../types/transaction";
import services from "../../services";
import type { QueryOptions } from "../../services/transaction/getTransactions";


interface State {
    loading: boolean
    error: string | null
    transactions: Transaction[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
}

function Transactions() {
    const { summary } = useSelector((s: RootState) => s.summary)
    const { token = "" } = useSelector((s: RootState) => s.auth)
    const [sp, setSp] = useSearchParams({
        tab: "ALL",
        limit: `10`,
        page: `1`
    })

    const [state, setState] = useState<State>({
        loading: true,
        error: null,
        transactions: [],
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
            total_pages: 0
        }
    })
    const current_tab = (sp.get("tab") as TransactionType | null) || "ALL";
    const page = Number(sp.get("page")) || 1
    const limit = Number(sp.get("limit")) || 10




    useEffect(() => {
        const queryOpt: QueryOptions = {
            type: current_tab,
            limit,
            page,
        }
        services.transaction.getTransactions(token, queryOpt)
            .then(res => {
                setState(pre => {
                    return {
                        ...pre,
                        loading: false,
                        error: null,
                        ...res
                    }
                })
            })
            .catch(err => {
                setState(pre => {
                    return {
                        ...pre,
                        loading: false,
                        error: `${err?.message || "failed to get transactions"}`
                    }
                })
            })
    }, [token, current_tab, limit, page])

    const goToPage = (page: number) => {
        setSp(pre => {
            pre.set("page", `${page}`)
            return pre
        })
    }

    const { transactions = [], pagination } = state
    return (
        <main className="min-h-full bg-[#F8FAFC]">
            <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-8">
                {/* Header */}
                <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-medium text-[#10B981]">
                            Financial activity
                        </p>

                        <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#1E293B]">
                            Transactions
                        </h1>

                        <p className="mt-1.5 text-sm text-[#64748B]">
                            Keep track of your income, expenses, receivables and payables.
                        </p>
                    </div>

                    <Link
                        to="/transactions/new"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#10B981] px-5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(16,185,129,0.18)] transition-all hover:bg-[#059669] hover:shadow-[0_6px_18px_rgba(16,185,129,0.22)]"
                    >
                        <Plus className="h-4.5 w-4.5" strokeWidth={2.2} />
                        New transaction
                    </Link>
                </section>

                {/* Summary */}
                <section className="mb-8">
                    <TransactionSummaryCards summary={summary} />
                </section>

                {/* Transactions */}
                <section className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-[#E2E8F0]/70">
                    <div className="px-6 pt-6">
                        <TransactionFilters />
                    </div>

                    <div className="mt-3 px-6">
                        <TransactionTabs />
                    </div>

                    <div className="mt-2">
                        <TransactionTable transactions={transactions} />
                    </div>

                    <TransactionPagination pagination={pagination} goToPage={goToPage} />
                </section>
            </div>
        </main>
    );
};

export default Transactions;