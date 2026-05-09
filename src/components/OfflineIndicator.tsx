import { CheckCircle2, WifiOff } from "lucide-react";

interface OfflineIndicatorProps {
  offlineReady: boolean;
  online: boolean;
}

export function OfflineIndicator({ offlineReady, online }: OfflineIndicatorProps) {
  return (
    <div className={offlineReady ? "offline-indicator offline-indicator--ready" : "offline-indicator"}>
      {offlineReady ? <CheckCircle2 size={16} aria-hidden="true" /> : <WifiOff size={16} aria-hidden="true" />}
      <span>{offlineReady ? "Offline ready" : online ? "Preparing offline" : "Offline"}</span>
    </div>
  );
}
