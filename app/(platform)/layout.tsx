import { AppShell } from "@/components/layout/app-shell";
import { GuardVisitsProvider } from "@/features/guard-visits/guard-visits-provider";
import { ProtectedRoute } from "@/lib/auth/protected-route";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <GuardVisitsProvider>
        <AppShell>{children}</AppShell>
      </GuardVisitsProvider>
    </ProtectedRoute>
  );
}
