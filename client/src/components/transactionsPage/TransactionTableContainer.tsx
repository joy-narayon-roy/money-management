import type { ReactNode } from "react";

interface TransactionTableContainerProps {
    children?: ReactNode;
}

export default function TransactionTableContainer({
    children = <></>,
}: TransactionTableContainerProps) {
    return (
        <section className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-[#E2E8F0]/70">
            {children}
        </section>
    );
}