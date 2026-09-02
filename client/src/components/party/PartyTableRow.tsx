import { Link } from "react-router-dom";
import type { Party } from "../../types/party";
import PartyRole from "./PartyRole";

interface Props {
  party: Party;
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};

const PartyTableRow = ({
  party,
}: Props) => {
  return (
    <tr className="group border-b border-[#E2E8F0]/70 last:border-0 transition-colors hover:bg-[#F8FAFC]">

      {/* Party */}
      <td className="px-6 py-4.5">
        <Link
          to={`/parties/${party.id}`}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5] text-sm font-semibold text-[#059669]">
            {party.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <p className="text-sm font-semibold text-[#1E293B] transition-colors group-hover:text-[#059669]">
              {party.name}
            </p>

            {!party.is_active && (
              <p className="mt-0.5 text-xs text-[#94A3B8]">
                Inactive
              </p>
            )}
          </div>
        </Link>
      </td>

      {/* Role */}
      <td className="px-6 py-4.5">
        <PartyRole role={party.role} />
      </td>

      {/* Total */}
      <td className="px-6 py-4.5 text-right text-sm font-semibold text-[#475569]">
        {formatAmount(party.total)}
      </td>

      {/* Paid */}
      <td className="px-6 py-4.5 text-right text-sm font-medium text-[#64748B]">
        {formatAmount(party.paid)}
      </td>

      {/* Due */}
      <td className="px-6 py-4.5 text-right text-sm font-semibold">
        <span
          className={
            party.due > 0
              ? "text-[#D97706]"
              : "text-[#64748B]"
          }
        >
          {formatAmount(party.due)}
        </span>
      </td>

    </tr>
  );
};

export default PartyTableRow;