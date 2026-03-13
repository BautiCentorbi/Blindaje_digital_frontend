"use client";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f4f6] text-[#1f1f24] lg:grid lg:grid-cols-[280px_1fr]">
      <Sidebar />

      <div className="min-w-0">
        <Topbar />

        <main className="px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-6 lg:px-8 lg:pb-10 lg:pt-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}