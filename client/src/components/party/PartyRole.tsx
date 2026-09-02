import type { PartyRoleType } from "../../types/party";

interface Props {
  role: PartyRoleType;
}

const roleConfig: Record<
  PartyRoleType,
  {
    label: string;
    color: string;
    dot: string;
  }
> = {
  INCOME: {
    label: "Income",
    color: "#15803D",
    dot: "#22C55E",
  },

  EXPENSE: {
    label: "Expense",
    color: "#DC2626",
    dot: "#EF4444",
  },

  AR: {
    label: "Receivable",
    color: "#2563EB",
    dot: "#3B82F6",
  },

  AP: {
    label: "Payable",
    color: "#D97706",
    dot: "#F59E0B",
  },
};

const PartyRole = ({
  role,
}: Props) => {
  const config = roleConfig[role];

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: config.dot,
        }}
      />

      <span
        style={{
          color: config.color,
        }}
      >
        {config.label}
      </span>
    </span>
  );
};

export default PartyRole;