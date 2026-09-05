import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useParties } from "../../hooks/useParties";
import type { PartyRoleType } from "../../types/party";
import {
    PartyFilters,
    PartyPagination,
    PartyTable,
} from "../../components/party";
import PageHeading from "../../components/global/PageHeadeing";



export interface PartyQueryOptions {
    search?: string;
    role?: PartyRoleType | "ALL";
    is_active?: boolean;
    page: number;
    limit: number;
}

function Parties() {
    const { token = "" } = useSelector((state: RootState) => state.auth);

    const [sp, setSp] = useSearchParams({
        limit: "10",
        page: "1",
    });

    const page = Number(sp.get("page")) || 1;
    const limit = Number(sp.get("limit")) || 10;

    const search = sp.get("search") || "";
    const role = sp.get("role") || "ALL";
    const status = sp.get("status") || "ALL";


    const { error, loading, pagination, parties = [] } = useParties(token || "", {
        limit, page, role, status, search
    })



    const updateParam = (
        key: string,
        value: string
    ) => {
        setSp((prev) => {
            if (value) {
                prev.set(key, value);
            } else {
                prev.delete(key);
            }

            prev.set("page", "1");

            return prev;
        });
    };

    const goToPage = (pageNumber: number) => {
        setSp((prev) => {
            prev.set("page", String(pageNumber));

            return prev;
        });
    };


    console.log(parties)

    return (
        <main className="min-h-full bg-background">
            <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-8">

                {/* Header */}
                <PageHeading
                    title="Parties"
                    create_button_path="new"
                    create_button_text="Add Party"
                />
                {/* Parties */}
                <section className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-[#E2E8F0]/70">
                    {/* Filters */}
                    <div className="px-6 pt-6">
                        <PartyFilters
                            search={search}
                            role={role}
                            status={status}
                            updateParam={updateParam}
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mx-6 mt-4 rounded-xl bg-[#FEF2F2] px-4 py-3 text-sm text-[#DC2626]">
                            {error}
                        </div>
                    )}

                    {/* Table */}
                    <div className="mt-3">
                        <PartyTable
                            parties={parties}
                            loading={loading}
                        />
                    </div>

                    {/* Pagination */}
                    <PartyPagination
                        pagination={pagination}
                        goToPage={goToPage}
                    />
                </section>
            </div>
        </main>
    );
}

export default Parties;