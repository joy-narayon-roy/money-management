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
import { Loading } from "../../components/Loading";



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
            api.party.getPartyById(token, id),
            api.getTransactions(token, {
                limit: 20,
                page: 1,
                party: [id],
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
            .catch(() => {
                setState((pre) => ({
                    loading: false,
                    error:
                        "Failed to load party details.",
                    party: null,
                    transactions: [],
                    transactionPagination: pre.transactionPagination
                }));
            });
    }, [id, token]);


    if (state.loading) {
        return (
            <Loading />
        );
    }

    if (state.error || !state.party) {
        return (
            <main className="min-h-full bg-background">
                <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-8">
                    <Link
                        to="/parties"
                        className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition hover:text-primary"
                    >
                        <ArrowLeft size={16} />
                        Back to parties
                    </Link>

                    <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-[#E2E8F0]/70">
                        <h2 className="text-lg font-semibold text-text-primary">
                            Party not found
                        </h2>

                        <p className="mt-2 text-sm text-text-text-secondary">
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
                        party_id={id}
                        transactions={state.transactions}
                    />
                </div>
            </div>
        </main>
    );
};

export default PartyDetails;