import { Link} from "react-router-dom";
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
import useTransactions from "../../hooks/useTransactions";
import { compressToBase64 } from "lz-string";

function Transactions() {
    const { summary } = useSelector((s: RootState) => s.summary)
    const { token = "" } = useSelector((s: RootState) => s.auth)
    const { transactions, pagination, loading, error, goToPage } = useTransactions(token || "");

    const openPreview = () => {
        const json_str = JSON.stringify(transactions)
        const data_str = compressToBase64(json_str)

        const sp = new URLSearchParams({
            type: "create_transaction_list",
            data: data_str,
        })

        window.open(`/preview?${sp.toString()}`, "_blank")
    }
    return (
        <main className="min-h-full bg-background">
            <div className="mx-auto max-w-[1600px] px-6 py-4 lg:px-8">
                {/* Header */}
                <section className="mb-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-primary-dark">
                            Transactions
                        </h1>
                    </div>

                    <Link
                        to="/transactions/new"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(16,185,129,0.18)] transition-all hover:bg-primary-dark hover:shadow-[0_6px_18px_rgba(16,185,129,0.22)]"
                    >
                        <Plus className="h-4.5 w-4.5" strokeWidth={2.2} />
                        New transaction
                    </Link>
                </section>

                {/* Summary */}
                <section className="mb-2">
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
                        {error ? (
                            <p className="px-6 py-8 text-sm text-red-500">{error}</p>
                        ) : (
                            <TransactionTable
                                transactions={transactions}
                                loading={loading}
                            />
                        )}
                    </div>

                    <TransactionPagination
                        pagination={pagination}
                        openPreview={openPreview}
                        goToPage={goToPage} />
                </section>
            </div>
        </main>
    );
};

export default Transactions;