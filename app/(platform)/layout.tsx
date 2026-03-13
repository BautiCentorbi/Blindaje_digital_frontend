import { AppShell } from "@/components/layout/app-shell";
import { ProtectedRoute } from "@/lib/auth/protected-route";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <AppShell>{children}</AppShell>
    </ProtectedRoute>
  );
}