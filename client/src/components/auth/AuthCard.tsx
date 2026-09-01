import type { ReactNode } from "react";

interface AuthCardProps {
    title: string;
    description: string;
    children: ReactNode;
}

export function AuthCard({
    title,
    description,
    children,
}: AuthCardProps) {
    return (
        <div className="rounded-2xl border border-[#E2EBE7] bg-white p-6 shadow-[0_20px_60px_rgba(21,62,48,0.08)] sm:p-8">
            <div className="mb-7 text-center">
                <h1 className="text-2xl font-bold tracking-[-0.04em] text-[#18231F]">
                    {title}
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#718079]">
                    {description}
                </p>
            </div>

            {children}
        </div>
    );
}