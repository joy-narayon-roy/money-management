import { useSelector } from "react-redux";

import {
    PartyHeader,
    PartyInfo,
    PartySummaryCards,
    // PartyTransactions,
} from "../../components/partyDetailsPage";
import type { RootState } from "../../store";
import { Loading } from "../../components/Loading";
import { TransactionPagination, TransactionTable } from "../../components/transactionsPage";
import TransactionTableContainer from "../../components/transactionsPage/TransactionTableContainer";

import usePartyInfo from "../../hooks/usePartyInfo";




function PartyDetails() {
    const { token = "" } = useSelector((state: RootState) => state.auth);

    const {
        party: partyState,
        transaction: transactionState,
        sort,
        goToPage,
        updateSort
    } = usePartyInfo(token)

    return (
        <main className="min-h-full bg-background">
            <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-8">
                {partyState.loading && <Loading />}
                {partyState.party && <PartyHeader party={partyState.party} />}

                <div className="mt-8">
                    {partyState.party &&
                        <PartySummaryCards party={partyState.party} />
                    }
                </div>

                <div className="my-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                    {partyState.party &&
                        <PartyInfo party={partyState.party} />
                    }
                </div>



                <TransactionTableContainer>
                    <div className="mt-2">
                        <TransactionTable
                            sort={sort}
                            updateSort={updateSort}
                            transactions={transactionState.transactions}
                            loading={transactionState.loading}
                        />
                    </div>

                    <TransactionPagination
                        pagination={transactionState.pagination}
                        // openPreview={openPreview}
                        goToPage={goToPage} />
                </TransactionTableContainer>


            </div>
        </main>
    );
};

export default PartyDetails;