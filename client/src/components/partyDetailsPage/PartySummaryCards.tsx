import {
    CircleDollarSign,
    CheckCircle2,
    Clock3,
} from "lucide-react";
import type { Party } from "../../types/party";


interface Props {
    party: Party;
}

const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(value);
};

const PartySummaryCards = ({ party }: Props) => {
    const cards = [
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
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.label}
                        className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-[#E2E8F0]/70"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#64748B]">
                                    {card.label}
                                </p>

                                <p className="mt-2 text-2xl font-bold tracking-tight text-[#1E293B]">
                                    {formatMoney(card.value)}
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