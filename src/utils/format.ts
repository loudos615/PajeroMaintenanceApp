import { format, parseISO } from "date-fns";
import type { DueStatus, MaintenanceItem } from "../types";

export function formatKm(value: number | null | undefined): string {
  if (value === null || value === undefined) return "Not set";
  return `${new Intl.NumberFormat("en-US").format(value)} km`;
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "Not set";
  return format(parseISO(value), "d MMM yyyy");
}

export function formatInterval(km: number | null, months: number | null): string {
  const parts = [];
  if (km) parts.push(formatKm(km));
  if (months) parts.push(`${months} mo`);
  return parts.length ? parts.join(" / ") : "Condition based";
}

export function statusLabel(status: DueStatus): string {
  switch (status) {
    case "baselineDueNow":
      return "Baseline";
    case "overdue":
      return "Overdue";
    case "dueSoon":
      return "Due soon";
    case "conditionBased":
      return "Condition based";
    case "noHistory":
      return "No history";
    default:
      return "OK";
  }
}

export function priorityRank(item: MaintenanceItem): number {
  const priority = item.priority.toLowerCase();
  if (priority === "critical") return 0;
  if (priority === "high") return 1;
  if (priority === "medium") return 2;
  return 3;
}

export function dueStatusRank(status: DueStatus): number {
  switch (status) {
    case "baselineDueNow":
      return 0;
    case "overdue":
      return 1;
    case "dueSoon":
      return 2;
    case "noHistory":
      return 3;
    case "conditionBased":
      return 4;
    default:
      return 5;
  }
}

export function todayInputValue(): string {
  return new Date().toISOString().slice(0, 10);
}
