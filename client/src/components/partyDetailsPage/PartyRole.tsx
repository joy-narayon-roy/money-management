import type { PartyRoleType } from "../../types/party";

interface Props {
    role: PartyRoleType;
}

const roleConfig: Record<
    PartyRoleType,
    {
        label: string;
        text: string;
        dot: string;
        background: string;
    }
> = {
    INCOME: {
        label: "Income",
        text: "text-[#15803D]",
        dot: "bg-[#22C55E]",
        background: "bg-[#F0FDF4]",
    },
    EXPENSE: {
        label: "Expense",
        text: "text-[#DC2626]",
        dot: "bg-[#EF4444]",
        background: "bg-[#FEF2F2]",
    },
    AR: {
        label: "Receivable",
        text: "text-[#2563EB]",
        dot: "bg-[#3B82F6]",
        background: "bg-[#EFF6FF]",
    },
    AP: {
        label: "Payable",
        text: "text-[#D97706]",
        dot: "bg-[#F59E0B]",
        background: "bg-[#FFFBEB]",
    },
};

const PartyRole = ({ role }: Props) => {
    const config = roleConfig[role];

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.text} ${config.background}`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
            {config.label}
        </span>
    );
};

export default PartyRole;