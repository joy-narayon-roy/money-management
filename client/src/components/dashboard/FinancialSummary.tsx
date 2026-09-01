import {
  ArrowDownLeft,
  ArrowUpRight,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export function FinancialSummary() {
  return (
    <div className="rounded-2xl border border-[#E3EBE7] bg-white">
      <div className="border-b border-[#EDF1EF] px-5 py-4">
        <h3 className="text-sm font-bold text-[#26362F]">
          Financial summary
        </h3>

        <p className="mt-1 text-xs text-[#89958F]">
          Money that needs your attention
        </p>
      </div>

      <div className="p-5">
        {/* Receivable */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EF] text-[#1C9A6E]">
            <ArrowDownLeft className="h-4 w-4" />
          </div>

          <div className="flex-1">
            <p className="text-xs text-[#89958F]">
              Receivable
            </p>

            <p className="mt-1 text-sm font-bold text-[#26362F]">
              ৳24,500
            </p>
          </div>

          <Link
            to="/receivables"
            className="text-[11px] font-semibold text-[#1C9A6E]"
          >
            View
          </Link>
        </div>

        <div className="my-5 h-px bg-[#EDF1EF]" />

        {/* Payable */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8ECE9] text-[#C87565]">
            <ArrowUpRight className="h-4 w-4" />
          </div>

          <div className="flex-1">
            <p className="text-xs text-[#89958F]">
              Payable
            </p>

            <p className="mt-1 text-sm font-bold text-[#26362F]">
              ৳12,200
            </p>
          </div>

          <Link
            to="/payables"
            className="text-[11px] font-semibold text-[#C87565]"
          >
            View
          </Link>
        </div>

        <div className="my-5 h-px bg-[#EDF1EF]" />

        {/* Parties */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF0F6] text-[#547493]">
            <Users className="h-4 w-4" />
          </div>

          <div className="flex-1">
            <p className="text-xs text-[#89958F]">
              Active parties
            </p>

            <p className="mt-1 text-sm font-bold text-[#26362F]">
              18
            </p>
          </div>

          <Link
            to="/parties"
            className="text-[11px] font-semibold text-[#547493]"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
} 