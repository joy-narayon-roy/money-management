import {
    ArrowLeft,
    Edit3,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Party } from "../../types/party";
import PartyRole from "../party/PartyRole";



interface Props {
    party: Party;
}

const PartyHeader = ({ party }: Props) => {
    const initial = party.name?.charAt(0).toUpperCase() || "?";

    return (
        <div>
            <Link
                to="/parties"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition hover:text-[#10B981]"
            >
                <ArrowLeft size={16} />
                Back to parties
            </Link>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ECFDF5] text-lg font-semibold text-[#059669]">
                        {initial}
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold tracking-tight text-[#1E293B]">
                                {party.name}
                            </h1>

                            <PartyRole role={party.role} />
                        </div>

                        <div className="mt-1 flex items-center gap-2 text-sm text-[#64748B]">
                            <span
                                className={`h-2 w-2 rounded-full ${
                                    party.is_active
                                        ? "bg-[#22C55E]"
                                        : "bg-[#94A3B8]"
                                }`}
                            />

                            {party.is_active ? "Active party" : "Inactive party"}
                        </div>
                    </div>
                </div>

                <Link
                    to={`/parties/${party.id}/edit`}
                    className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#334155] shadow-sm transition hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
                >
                    <Edit3 size={16} />
                    Edit party
                </Link>
            </div>
        </div>
    );
};

export default PartyHeader;