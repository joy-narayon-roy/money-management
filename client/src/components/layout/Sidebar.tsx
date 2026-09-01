import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    ArrowLeftRight,
    Users,
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    BarChart3,
    Settings,
    LogOut,
    X,
    ChevronDown,
    ChevronRight,
    type LucideIcon,
} from "lucide-react";

import Logo from "../Logo";

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

interface NavigationItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

const mainNavigation: NavigationItem[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Parties",
        href: "/parties",
        icon: Users,
    },
    {
        name: "Accounts",
        href: "/accounts",
        icon: Wallet,
    },
];

const financeNavigation: NavigationItem[] = [
    {
        name: "Receivables",
        href: "/receivables",
        icon: ArrowDownLeft,
    },
    {
        name: "Payables",
        href: "/payables",
        icon: ArrowUpRight,
    },
    {
        name: "Reports",
        href: "/reports",
        icon: BarChart3,
    },
];

export function Sidebar({
    open,
    onClose,
}: SidebarProps) {
    const nav = useNavigate();

    const handleLogout = () => {
        nav("/logout");
    };

    return (
        <>
            {/* Mobile backdrop */}
            <div
                onClick={onClose}
                className={`
                    fixed inset-0 z-40
                    bg-[#10271F]/30
                    backdrop-blur-sm
                    transition-opacity
                    lg:hidden
                    ${open
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                    }
                `}
            />

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex h-dvh w-64 shrink-0
                    flex-col
                    border-r border-[#E5EBE8]
                    bg-white
                    transition-transform duration-300 ease-in-out
                    ${open
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                    lg:static
                    lg:translate-x-0
                `}
            >
                {/* Header */}
                <div className="flex h-20 shrink-0 items-center justify-between px-6">
                    <Logo />

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="
                            rounded-lg
                            p-2
                            text-[#718079]
                            transition
                            hover:bg-[#F3F7F5]
                            hover:text-[#153E30]
                            lg:hidden
                        "
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav
                    className="
                        min-h-0
                        flex-1
                        overflow-y-auto
                        overflow-x-hidden
                        px-4
                        py-4
                    "
                >
                    <NavigationGroup
                        label="MAIN"
                        items={mainNavigation}
                        onNavigate={onClose}
                    />

                    <TransactionNavigation
                        onNavigate={onClose}
                    />

                    <NavigationGroup
                        label="FINANCE"
                        items={financeNavigation}
                        onNavigate={onClose}
                    />
                </nav>

                {/* Footer */}
                <div className="shrink-0 border-t border-[#E8EEEB] p-4">
                    <NavLink
                        to="/settings"
                        onClick={onClose}
                        className={navItemClasses}
                    >
                        <Settings className="h-4.5 w-4.5 shrink-0" />

                        <span>
                            Settings
                        </span>
                    </NavLink>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="
                            mt-1
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-lg
                            px-3
                            py-2.5
                            text-sm
                            text-[#718079]
                            transition
                            hover:bg-red-50
                            hover:text-red-600
                        "
                    >
                        <LogOut className="h-4.5 w-4.5 shrink-0" />

                        <span>
                            Sign out
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
}

const navItemClasses = ({
    isActive,
}: {
    isActive: boolean;
}) =>
    `
        mb-1
        flex
        items-center
        gap-3
        rounded-lg
        px-3
        py-2.5
        text-sm
        transition
        ${isActive
        ? "bg-[#E8F5EF] font-semibold text-[#197B5A]"
        : "text-[#718079] hover:bg-[#F3F7F5] hover:text-[#153E30]"
    }
    `;

interface NavigationGroupProps {
    label: string;
    items: NavigationItem[];
    onNavigate: () => void;
}

function NavigationGroup({
    label,
    items,
    onNavigate,
}: NavigationGroupProps) {
    return (
        <div className="mb-7">
            <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.12em] text-[#A0AAA6]">
                {label}
            </p>

            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        onClick={onNavigate}
                        className={navItemClasses}
                    >
                        <Icon className="h-4.5 w-4.5 shrink-0" />

                        <span className="truncate">
                            {item.name}
                        </span>
                    </NavLink>
                );
            })}
        </div>
    );
}

interface TransactionNavigationProps {
    onNavigate: () => void;
}

function TransactionNavigation({
    onNavigate,
}: TransactionNavigationProps) {
    const location = useLocation();

    const isTransactionRoute =
        location.pathname === "/transactions" ||
        location.pathname.startsWith("/transactions/");

    const [isOpen, setIsOpen] = useState(
        isTransactionRoute
    );

    const nav = useNavigate()
    return (
        <div className="mb-7">
            {/* Transactions */}
            <button
                type="button"
                onClick={() => {
                    nav("/transactions")
                    setIsOpen((value) => !value)
                }
                }
                aria-expanded={isOpen}
                className={`
                    mb-1
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-sm
                    transition
                    ${isTransactionRoute
                        ? "bg-[#E8F5EF] font-semibold text-[#197B5A]"
                        : "text-[#718079] hover:bg-[#F3F7F5] hover:text-[#153E30]"
                    }
                `}
            >
                <ArrowLeftRight className="h-4.5 w-4.5 shrink-0" />

                <span className="truncate">
                    Transactions
                </span>

                <span className="ml-auto shrink-0">
                    {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    )}
                </span>
            </button>

            {/* Transaction submenu */}
            {
                isOpen && (
                    <div className="ml-7 border-l border-[#E5EBE8] pl-3">
                        <CreateTransactionNavigation
                            onNavigate={onNavigate}
                        />

                        {/* Incomes */}
                        <NavLink
                            to="/transactions/income"
                            onClick={onNavigate}
                            className={({ isActive }) => `
                            mb-1
                            block
                            rounded-lg
                            px-3
                            py-2
                            text-sm
                            transition
                            ${isActive
                                    ? "font-semibold text-[#197B5A]"
                                    : "text-[#718079] hover:bg-[#F3F7F5] hover:text-[#153E30]"
                                }
                        `}
                        >
                            Incomes
                        </NavLink>

                        {/* Expense */}
                        <NavLink
                            to="/transactions/expense"
                            onClick={onNavigate}
                            className={({ isActive }) => `
                            mb-1
                            block
                            rounded-lg
                            px-3
                            py-2
                            text-sm
                            transition
                            ${isActive
                                    ? "font-semibold text-[#197B5A]"
                                    : "text-[#718079] hover:bg-[#F3F7F5] hover:text-[#153E30]"
                                }
                        `}
                        >
                            Expense
                        </NavLink>
                    </div>
                )
            }
        </div >
    );
}

interface CreateTransactionNavigationProps {
    onNavigate: () => void;
}

function CreateTransactionNavigation({
    onNavigate,
}: CreateTransactionNavigationProps) {
    const location = useLocation();

    const isCreateRoute =
        location.pathname === "/transactions/new" ||
        location.pathname.startsWith(
            "/transactions/new/"
        );

    const [isOpen, setIsOpen] = useState(isCreateRoute);

    return (
        <div>
            {/* Create */}
            <div
                className={`
                    mb-1
                    flex
                    items-center
                    rounded-lg
                    text-sm
                    transition
                    ${isCreateRoute
                        ? "font-semibold text-[#197B5A]"
                        : "text-[#718079]"
                    }
                `}
            >
                {/* Create link */}
                <NavLink
                    to="/transactions/new"
                    onClick={onNavigate}
                    end
                    className="
                        flex
                        min-w-0
                        flex-1
                        items-center
                        rounded-lg
                        px-3
                        py-2
                        transition
                        hover:bg-[#F3F7F5]
                        hover:text-[#153E30]
                    "
                >
                    <span className="truncate">
                        Create
                    </span>
                </NavLink>

                {/* Create toggle */}
                <button
                    type="button"
                    onClick={() =>
                        setIsOpen((value) => !value)
                    }
                    aria-label={
                        isOpen
                            ? "Collapse create menu"
                            : "Expand create menu"
                    }
                    aria-expanded={isOpen}
                    className="
                        rounded-lg
                        p-2
                        transition
                        hover:bg-[#F3F7F5]
                        hover:text-[#153E30]
                    "
                >
                    {isOpen ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                    )}
                </button>
            </div>

            {/* Create submenu */}
            {isOpen && (
                <div className="ml-5 border-l border-[#E5EBE8] pl-3">
                    {/* Bulk */}
                    <NavLink
                        to="/transactions/new/bulk"
                        onClick={onNavigate}
                        className={({ isActive }) => `
                            mb-1
                            block
                            rounded-lg
                            px-3
                            py-2
                            text-sm
                            transition
                            ${isActive
                                ? "font-semibold text-[#197B5A]"
                                : "text-[#718079] hover:bg-[#F3F7F5] hover:text-[#153E30]"
                            }
                        `}
                    >
                        Bulk
                    </NavLink>

                    {/* Bulk Expense */}
                    <NavLink
                        to="/transactions/new/bulk-expense"
                        onClick={onNavigate}
                        className={({ isActive }) => `
                            mb-1
                            block
                            rounded-lg
                            px-3
                            py-2
                            text-sm
                            transition
                            ${isActive
                                ? "font-semibold text-[#197B5A]"
                                : "text-[#718079] hover:bg-[#F3F7F5] hover:text-[#153E30]"
                            }
                        `}
                    >
                        Bulk Expense
                    </NavLink>
                </div>
            )}
        </div>
    );
}