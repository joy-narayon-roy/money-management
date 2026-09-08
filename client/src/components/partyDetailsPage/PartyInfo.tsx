import { ArrowRight, FileText, UserRound } from "lucide-react";

import PartyRole from "./PartyRole";
import type { Party } from "../../types/party";
import { Link } from "react-router-dom";

interface Props {
    party: Party;
}

const PartyInfo = ({ party }: Props) => {
    return (
        <section className="h-fit overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-[#E2E8F0]/70">
            <div className="border-b border-border px-5 py-4">
                <h2 className="text-base font-semibold text-text-primary">
                    Party information
                </h2>
            </div>

            <div className="space-y-6 p-5">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#94A3B8]">
                        <UserRound size={14} />
                        Name
                    </div>

                    <p className="mt-2 text-sm font-semibold text-[#334155]">
                        {party.name}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#94A3B8]">
                        Role
                    </p>

                    <div className="mt-2">
                        <PartyRole role={party.role} />
                    </div>
                </div>

                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#94A3B8]">
                        Status
                    </p>

                    <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#334155]">
                        <span
                            className={`h-2 w-2 rounded-full ${party.is_active
                                ? "bg-income"
                                : "bg-text-lite"
                                }`}
                        />

                        {party.is_active ? "Active" : "Inactive"}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#94A3B8]">
                        <FileText size={14} />
                        Notes
                    </div>

                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-text-secondary">
                        {party.description?.trim() || "No description added."}
                    </p>

                    <Link
                        to={`/transactions?party=${party.id || ""}`}
                        className="mt-5 hidden items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary-hover sm:inline-flex"
                    >
                        View all
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PartyInfo;