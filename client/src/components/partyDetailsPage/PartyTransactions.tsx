import { ArrowRight, ReceiptText } from "lucide-react";
import { Link } from "react-router-dom";

import PartyTransactionRow from "./PartyTransactionRow";
import type { Transaction } from "../../types/transaction";

interface Props {
    party_id?: string
    transactions: Transaction[];
}

const PartyTransactions = ({ transactions, party_id = "" }: Props) => {
    return (
        <section className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-[#E2E8F0]/70">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                    <h2 className="text-base font-semibold text-text-primary">
                        Transactions
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary">
                        Recent transactions for this party
                    </p>
                </div>

                <Link
                    to={`/transactions?party=${party_id || ""}`}
                    className="hidden items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary-dark sm:inline-flex"
                >
                    View all
                    <ArrowRight size={15} />
                </Link>
            </div>


            {transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F1F5F9] text-text-secondary">
                        <ReceiptText size={21} />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-[#334155]">
                        No transactions yet
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-text-secondary">
                        Transactions associated with this party will appear
                        here.
                    </p>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-175">
                            <thead>
                                <tr className="border-b border-border bg-border">
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                                        Date
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                                        Description
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                                        Type
                                    </th>

                                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-secondary">
                                        Amount
                                    </th>

                                    <th className="w-10 px-4 py-3" />
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {transactions.map((transaction) => (
                                    <PartyTransactionRow
                                        key={transaction.id}
                                        transaction={transaction}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-border px-6 py-4 sm:hidden">
                        <Link
                            to={`/transactions?party=${party_id || ""}`}
                            className="hidden items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary-dark sm:inline-flex"
                        >
                            View all
                            <ArrowRight size={15} />
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
};

export default PartyTransactions;