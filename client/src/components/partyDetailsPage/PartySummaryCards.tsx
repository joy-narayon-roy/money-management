import {
    CircleDollarSign,
    CheckCircle2,
    Clock3,
    ArrowLeftRight,
} from "lucide-react";
import type { Party } from "../../types/party";


interface Props {
    party: Party;
}

// const formatMoney = (value: number) => {
//     return new Intl.NumberFormat("en-BD", {
//         style: "currency",
//         currency: "BDT",
//         maximumFractionDigits: 0,
//     }).format(value);
// };


const PartySummaryCards = ({ party }: Props) => {
    const cards = [
        {
            label: "Transaction",
            value: party.total_transaction || 0,
            icon: ArrowLeftRight,
            iconClass: "bg-[#ECFDF5] text-[#059669]",
        },
        {
            label: "Total",
            value: party.total,
            icon: CircleDollarSign,
            iconClass: "bg-[#ECFDF5] text-[#059669]",
        },
        {
            label: "Paid",
            value: party.paid,
            icon: CheckCircle2,
            iconClass: "bg-[#EFF6FF] text-[#2563EB]",
        },
        {
            label: "Due",
            value: party.due,
            icon: Clock3,
            iconClass: "bg-[#FFFBEB] text-[#D97706]",
        },
    ];

    return (
        // <div className="flex flex-row flex-wrap gap-2 justify-around">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.label}
                        className="min-w-48 rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-[#E2E8F0]/70"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-text-secondary">
                                    {card.label}
                                </p>

                                <p className="mt-2 text-2xl font-bold tracking-tight text-text-primary">
                                    {card.label==="Transaction"?"":"৳"} {card.value}
                                </p>
                            </div>

                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconClass}`}
                            >
                                <Icon size={19} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PartySummaryCards;