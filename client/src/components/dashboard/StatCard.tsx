import { type LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    change?: number;
    description?: string;
    icon: LucideIcon;
    iconClassName?: string;
    positive?: boolean;
}

export function StatCard({
    title,
    value,
    change,
    description = "vs last month",
    icon: Icon,
    iconClassName = "bg-[#E8F5EF] text-[#1C9A6E]",
    positive = true,
}: StatCardProps) {
    return (
        <div className="rounded-2xl border border-[#E3EBE7] bg-white p-5 transition hover:shadow-[0_10px_30px_rgba(21,62,48,0.06)]">
            <div className="flex items-start justify-between">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}
                >
                    <Icon className="h-5 w-5" />
                </div>

                {change !== undefined && (
                    <span
                        className={`flex items-center gap-0.5 text-xs font-semibold ${positive
                                ? "text-income"
                                : "text-expense"
                            }`}
                    >
                        {positive ? (
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        ) : (
                            <ArrowDownRight className="h-3.5 w-3.5" />
                        )}

                        {Math.abs(change)}%
                    </span>
                )}
            </div>

            <p className="mt-4 text-xs font-medium text-text-lite">
                {title}
            </p>

            <h3 className="mt-1 text-xl font-bold tracking-[-0.04em] text-text-primary">
                {value}
            </h3>

            <p className="mt-1 text-[11px] text-[#A0AAA6]">
                {description}
            </p>
        </div>
    );
}