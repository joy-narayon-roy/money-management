import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";

import {
    PartyHeader,
    PartyInfo,
    PartySummaryCards,
    PartyTransactions,
} from "../../components/partyDetailsPage";
import type { Party } from "../../types/party";
import type { Transaction } from "../../types/transaction";
import type { RootState } from "../../store";
import api from "../../api";
import type { PaginationType } from "../../types/pagination";



interface State {
    loading: boolean;
    error: string | null;
    party: Party | null;
    transactions: Transaction[];
    transactionPagination: PaginationType;
}

function PartyDetails() {
    const { id } = useParams<{ id: string }>();

    const { token = "" } = useSelector(
        (state: RootState) => state.auth
    );

    const [state, setState] = useState<State>({
        loading: true,
        error: null,
        party: null,
        transactions: [],
        transactionPagination: {
            limit: 20,
            page: 1,
            total: 0,
            total_pages: 1
        }
    });

    useEffect(() => {
        if (!id || !token) {
            return;
        }

        Promise.all([
            // TODO: Fatch party and transaction
            api.party.getPartyById(token, id),
            api.getTransactions(token, {
                limit: 20,
                page: 1,
                party: id,
            })
        ])
            .then(([partyResponse, transactionResponse]) => {
                setState({
                    loading: false,
                    error: null,
                    party: partyResponse.data,
                    transactions: transactionResponse.transactions,
                    transactionPagination: transactionResponse.pagination
                });
            })
            .catch((error) => {
                setState((pre) => ({
                    loading: false,
                    error:
                        error?.response?.data?.message ||
                        "Failed to load party details.",
                    party: null,
                    transactions: [],
                    transactionPagination: pre.transactionPagination
                }));
            });
    }, [id, token]);


    if (state.loading) {
        return (
            <main className="min-h-full bg-[#F8FAFC]">
                <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-5 w-24 rounded bg-slate-200" />

                        <div className="mt-8 h-24 w-72 rounded bg-slate-200" />

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            <div className="h-32 rounded-2xl bg-slate-200" />
                            <div className="h-32 rounded-2xl bg-slate-200" />
                            <div className="h-32 rounded-2xl bg-slate-200" />
                        </div>

                        <div className="mt-6 h-80 rounded-2xl bg-slate-200" />
                    </div>
                </div>
            </main>
        );
    }

    if (state.error || !state.party) {
        return (
            <main className="min-h-full bg-[#F8FAFC]">
                <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-8">
                    <Link
                        to="/parties"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition hover:text-[#10B981]"
                    >
                        <ArrowLeft size={16} />
                        Back to parties
                    </Link>

                    <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-[#E2E8F0]/70">
                        <h2 className="text-lg font-semibold text-[#1E293B]">
                            Party not found
                        </h2>

                        <p className="mt-2 text-sm text-[#64748B]">
                            {state.error ||
                                "The party you are looking for does not exist."}
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-full bg-background">
            <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-8">
                <PartyHeader party={state.party} />

                <div className="mt-8">
                    <PartySummaryCards party={state.party} />
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                    <PartyInfo party={state.party} />

                    <PartyTransactions
                        transactions={state.transactions}
                    />
                </div>
            </div>
        </main>
    );
};

export default PartyDetails;