import { Link } from "react-router-dom";
import type { Party, PartyRoleType } from "../../types/party";
import PartyRole from "./PartyRole";
import formatAmount from "../../utils/formatAmount";

interface Props {
  party: Party;
}


const PartyTableRow = ({
  party,
}: Props) => {
  return (
    <tr className="group border-b border-border/70 last:border-0 transition-colors hover:bg-background">

      {/* Party */}
      <td className="px-6 py-4.5">
        <Link
          to={`/parties/${party.id}`}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5] text-sm font-semibold text-primary-dark">
            {party.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <p className="text-sm font-semibold text-text-primary transition-colors group-hover:text-text-primary-dark">
              {party.name}
            </p>

            {!party.is_active && (
              <p className="mt-0.5 text-xs text-text-disable">
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

      {/* Total Transaction */}
      <td className="px-6 py-4.5">
        {party.total_transaction}
      </td>

      {/* Total */}
      <td className="px-6 py-4.5 text-center text-sm font-semibold text-text-primary/80">
        {formatAmount(party.total)}
      </td>

      {/* Paid */}
      <td className="px-6 py-4.5 text-right text-sm font-medium text-text-secondary">
        {showLiabilityInfo(party.role) && <>{formatAmount(party.paid)}</>}
      </td>

      {/* Due */}
      <td className="px-6 py-4.5 text-right text-sm font-semibold">
        {showLiabilityInfo(party.role) && <span
          className={
            party.due > 0
              ? "text-warning"
              : "text-text-secondary"
          }
        >
          {formatAmount(party.due)}
        </span>
        }
      </td>
    </tr>
  );
};

export default PartyTableRow;

function showLiabilityInfo(rol: PartyRoleType): boolean {
  return (rol === "AP" || rol === "AR")
}