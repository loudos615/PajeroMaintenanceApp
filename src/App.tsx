import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";
import { BottomNav } from "./components/BottomNav";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { useAppData } from "./hooks/useAppData";
import { useHashRoute } from "./hooks/useHashRoute";
import { Dashboard } from "./pages/Dashboard";
import { MaintenanceDetail } from "./pages/MaintenanceDetail";
import { MaintenanceList } from "./pages/MaintenanceList";
import { OdometerScan } from "./pages/OdometerScan";
import { Settings } from "./pages/Settings";

function useOnlineState() {
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return online;
}

export default function App() {
  const route = useHashRoute();
  const data = useAppData();
  const online = useOnlineState();
  const [offlineReady, setOfflineReady] = useState(false);

  useEffect(() => {
    registerSW({
      immediate: true,
      onOfflineReady() {
        setOfflineReady(true);
      },
      onRegisteredSW(_swUrl, registration) {
        if (registration?.active) {
          setOfflineReady(true);
        }
      }
    });
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
      <OfflineIndicator offlineReady={offlineReady} online={online} />
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
          onSaveProfile={data.updateProfile}
          onImportComplete={data.reload}
          onReset={data.resetAll}
        />
      ) : null}
      {["dashboard", ""].includes(route.name) ? <Dashboard profile={data.profile} dueInfos={data.dueInfos} /> : null}

      <BottomNav active={active} />
    </div>
  );
}
