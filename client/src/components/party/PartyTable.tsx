import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";


import PartyTableRow from "./PartyTableRow";
import type { Party } from "../../types/party";

interface Props {
  parties?: Party[];
  loading?: boolean;
  sort?: string,
  updateSort?: (key: string, type: "" | "-") => void
}

type sortInfoType = { [x: string]: "" | "-" }

const PartyTable = ({
  parties = [],
  loading = false,
  sort = "",
  updateSort = () => { }
}: Props) => {
  const sortInfo: sortInfoType = sort.split(",").reduce<sortInfoType>((p, s) => {
    p[s.replace("-", "")] = s[0] === "-" ? "-" : ""
    return p
  }, {})
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-60">

        <thead>
          <tr className="border-b border-border">

            {/* Party */}
            <th className="px-6 py-3.5 text-left">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-disable"
                onClick={() => updateSort("name", sortInfo["name"] === "" ? "-" : "")}
              >
                Name
                {
                  sortInfo["name"] == "-" ?
                    <ChevronDown size={14} />
                    :
                    <ChevronUp size={14} />
                }
              </button>
            </th>

            {/* Role */}
            <th className="px-6 py-3.5 text-left">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-disable"
                onClick={() => updateSort("role", sortInfo["role"] === "" ? "-" : "")}
              >
                Role
                {
                  sortInfo["role"] == "-" ?
                    <ChevronDown size={14} />
                    :
                    <ChevronUp size={14} />
                }
              </button>
            </th>

            {/* Total Transactions */}
            <th className="px-6 py-3.5 text-left">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-disable"
                onClick={() => updateSort("total_transaction", sortInfo["total_transaction"] === "" ? "-" : "")}
              >
                Transactions
                {
                  sortInfo["total_transaction"] == "-" ?
                    <ChevronDown size={14} />
                    :
                    <ChevronUp size={14} />
                }
              </button>
            </th>

            {/* Total */}
            <th className="px-6 py-3.5 text-right">
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-disable"
                onClick={() => updateSort("total", sortInfo["total"] === "" ? "-" : "")}

              >
                Total
                {
                  sortInfo["total"] == "-" ?
                    <ChevronDown size={14} />
                    :
                    <ChevronUp size={14} />
                }
              </button>
            </th>

            {/* Paid */}
            <th className="px-6 py-3.5 text-right">
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-disable"
                onClick={() => updateSort("paid", sortInfo["paid"] === "" ? "-" : "")}
              >
                Paid
                {
                  sortInfo["paid"] == "-" ?
                    <ChevronDown size={14} />
                    :
                    <ChevronUp size={14} />
                }

              </button>
            </th>

            {/* Due */}
            <th className="px-6 py-3.5 text-right">
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-disable"
                onClick={() => updateSort("due", sortInfo["due"] === "" ? "-" : "")}
              >
                Due
                {
                  sortInfo["due"] == "-" ?
                    <ChevronDown size={14} />
                    :
                    <ChevronUp size={14} />
                }

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
                  className="border-b border-border/70"
                >
                  <td
                    colSpan={5}
                    className="px-6 py-5"
                  >
                    <div className="h-5 animate-pulse rounded-md bg-background" />
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
                <p className="text-sm font-medium text-text-primary">
                  No parties found
                </p>

                <p className="mt-1 text-xs text-text-disable">
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