import { GuardDashboardView } from "./guard-dashboard-view";
import { GuardMobileHomeView } from "./guard-mobile-home-view";

export function GuardResponsiveHome() {
  return (
    <>
      <div className="hidden lg:block">
        <GuardDashboardView />
      </div>

      <div className="lg:hidden">
        <GuardMobileHomeView />
      </div>
    </>
  );
}