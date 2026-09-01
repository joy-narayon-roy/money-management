import type { ReactNode } from "react";
import AuthLogo from "./AuthLogo";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FAF9] px-4 py-10">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-125 w-125 rounded-full bg-[#DDF2E9] opacity-60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-[#E7F4EE] opacity-70 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <AuthLogo />

        <div className="mt-8 w-full">{children}</div>

        <p className="mt-8 text-center text-xs text-[#89958F]">
          Simple. Clear. In control.
        </p>
      </div>
    </main>
  );
}