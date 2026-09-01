import { type ReactNode, useState } from "react";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-[#F8FAF9]">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* Right side */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <div className="shrink-0">
          <Topbar onMenuClick={openSidebar} />
        </div>

        {/* Page content */}
        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}