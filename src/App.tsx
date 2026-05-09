import { useEffect } from "react";
import { registerSW } from "virtual:pwa-register";
import { BottomNav } from "./components/BottomNav";
import { useAppData } from "./hooks/useAppData";
import { useHashRoute } from "./hooks/useHashRoute";
import { Dashboard } from "./pages/Dashboard";
import { MaintenanceDetail } from "./pages/MaintenanceDetail";
import { MaintenanceList } from "./pages/MaintenanceList";
import { OdometerScan } from "./pages/OdometerScan";
import { Settings } from "./pages/Settings";

export default function App() {
  const route = useHashRoute();
  const data = useAppData();

  useEffect(() => {
    let registration: ServiceWorkerRegistration | undefined;
    const updateWhenVisible = () => {
      if (document.visibilityState === "visible" && navigator.onLine) {
        void registration?.update();
      }
    };

    registerSW({
      immediate: true,
      onRegisteredSW(_swUrl, swRegistration) {
        registration = swRegistration;
        updateWhenVisible();
        document.addEventListener("visibilitychange", updateWhenVisible);
        window.addEventListener("online", updateWhenVisible);
      }
    });

    return () => {
      document.removeEventListener("visibilitychange", updateWhenVisible);
      window.removeEventListener("online", updateWhenVisible);
    };
  }, []);

  if (data.loading || !data.profile) {
    return (
      <div className="app-shell">
        <main className="page page--centered">
          <div className="loader" />
          <p>Loading Pajero Maintenance...</p>
        </main>
      </div>
    );
  }

  const active = route.name === "item" ? "item" : route.name;

  return (
    <div className="app-shell">
      {data.error ? <div className="top-error">{data.error}</div> : null}

      {route.name === "maintenance" ? <MaintenanceList dueInfos={data.dueInfos} /> : null}
      {route.name === "item" ? (
        <MaintenanceDetail
          itemId={decodeURIComponent(route.params[0] ?? "")}
          profile={data.profile}
          dueInfos={data.dueInfos}
          serviceRecords={data.serviceRecords}
          onSaveRecord={data.recordService}
        />
      ) : null}
      {route.name === "odometer" ? (
        <OdometerScan
          profile={data.profile}
          initialMode={route.query.get("mode") === "scan" ? "scan" : "manual"}
          onSave={data.recordOdometer}
        />
      ) : null}
      {/* Diagnostics can be added later as a separate route without changing the local-only data model. */}
      {route.name === "settings" ? (
        <Settings
          profile={data.profile}
          odometerReadings={data.odometerReadings}
          onSaveProfile={data.updateProfile}
          onImportComplete={data.reload}
          onReset={data.resetAll}
        />
      ) : null}
      {["dashboard", ""].includes(route.name) ? (
        <Dashboard
          profile={data.profile}
          dueInfos={data.dueInfos}
          odometerReadings={data.odometerReadings}
          onDismissOdometerReminder={data.dismissOdometerReminder}
        />
      ) : null}

      <BottomNav active={active} />
    </div>
  );
}
