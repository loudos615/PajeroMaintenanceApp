import type { DueStatus } from "../types";
import { statusLabel } from "../utils/format";

interface StatusBadgeProps {
  status: DueStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-${status}`}>{statusLabel(status)}</span>;
}
