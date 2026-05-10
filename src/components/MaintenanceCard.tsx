import { ChevronRight } from "lucide-react";
import type { DueInfo } from "../types";
import { formatDate, formatInterval, formatKm } from "../utils/format";
import { StatusBadge } from "./StatusBadge";

interface MaintenanceCardProps {
  dueInfo: DueInfo;
  onOpen: () => void;
}

export function MaintenanceCard({ dueInfo, onOpen }: MaintenanceCardProps) {
  const { item } = dueInfo;

  return (
    <button className="maintenance-card" type="button" onClick={onOpen}>
      <span className="maintenance-card__main">
        <span className="maintenance-card__topline">
          <strong>{item.name}</strong>
          <StatusBadge status={dueInfo.status} />
        </span>
        <span className="muted">
          {item.system} - {item.action} - {item.priority}
        </span>
        <span className="maintenance-card__intervals">
          <span>
            Next: {dueInfo.dueKm ? formatKm(dueInfo.dueKm) : dueInfo.dueDate ? formatDate(dueInfo.dueDate) : dueInfo.reason}
          </span>
          <span>Recommended: {formatInterval(item.preventiveIntervalKm, item.preventiveIntervalMonths)}</span>
          <span>Official: {formatInterval(item.officialIntervalKm, item.officialIntervalMonths)}</span>
        </span>
      </span>
      <ChevronRight aria-hidden="true" size={22} />
    </button>
  );
}
