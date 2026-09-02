import {
  ChevronDown,
} from "lucide-react";


import PartyTableRow from "./PartyTableRow";
import type { Party } from "../../types/party";

interface Props {
  parties?: Party[];
  loading?: boolean;
}

const PartyTable = ({
  parties = [],
  loading = false,
}: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px]">

        <thead>
          <tr className="border-b border-[#E2E8F0]">

            {/* Party */}
            <th className="px-6 py-3.5 text-left">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]"
              >
                Party

                <ChevronDown size={14} />
              </button>
            </th>

            {/* Role */}
            <th className="px-6 py-3.5 text-left">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]"
              >
                Role

                <ChevronDown size={14} />
              </button>
            </th>

            {/* Total */}
            <th className="px-6 py-3.5 text-right">
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]"
              >
                Total

                <ChevronDown size={14} />
              </button>
            </th>

            {/* Paid */}
            <th className="px-6 py-3.5 text-right">
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]"
              >
                Paid

                <ChevronDown size={14} />
              </button>
            </th>

            {/* Due */}
            <th className="px-6 py-3.5 text-right">
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]"
              >
                Due

                <ChevronDown size={14} />
              </button>
            </th>

          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: 6 }).map(
              (_, index) => (
                <tr
                  key={index}
                  className="border-b border-[#E2E8F0]/70"
                >
                  <td
                    colSpan={5}
                    className="px-6 py-5"
                  >
                    <div className="h-5 animate-pulse rounded-md bg-[#F1F5F9]" />
                  </td>
                </tr>
              )
            )
          ) : parties.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-16 text-center"
              >
                <p className="text-sm font-medium text-[#1E293B]">
                  No parties found
                </p>

                <p className="mt-1 text-xs text-[#94A3B8]">
                  Try changing your search or filters.
                </p>
              </td>
            </tr>
          ) : (
            parties.map((party) => (
              <PartyTableRow
                key={party.id}
                party={party}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PartyTable;