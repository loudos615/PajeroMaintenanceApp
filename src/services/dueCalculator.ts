import { addMonths, differenceInCalendarDays, parseISO } from "date-fns";
import type { DueInfo, DueStatus, MaintenanceItem, ServiceRecord, VehicleProfile } from "../types";

const DUE_SOON_KM = 1000;
const DUE_SOON_DAYS = 30;

function mostRecentRecord(records: ServiceRecord[]): ServiceRecord | null {
  if (!records.length) return null;

  return [...records].sort((a, b) => {
    const dateCompare = b.performedDate.localeCompare(a.performedDate);
    if (dateCompare !== 0) return dateCompare;
    return (b.performedOdometerKm ?? 0) - (a.performedOdometerKm ?? 0);
  })[0];
}

function statusFromSignals(kmRemaining: number | null, daysRemaining: number | null): DueStatus {
  if ((kmRemaining !== null && kmRemaining <= 0) || (daysRemaining !== null && daysRemaining <= 0)) {
    return "overdue";
  }

  if (
    (kmRemaining !== null && kmRemaining <= DUE_SOON_KM) ||
    (daysRemaining !== null && daysRemaining <= DUE_SOON_DAYS)
  ) {
    return "dueSoon";
  }

  return "ok";
}

function isBaselineDue(item: MaintenanceItem): boolean {
  return Boolean(item.baselineDue ?? item.afterPurchaseUnknownHistory);
}

function isHbbDiagnosticItem(item: MaintenanceItem): boolean {
  const text = `${item.name} ${item.action}`.toLowerCase();
  return text.includes("hbb") || text.includes("hydraulic brake booster");
}

function isRegularDueListItem(item: MaintenanceItem): boolean {
  if (item.showInRegularDueList === false) return false;
  if (item.diagnosticOnly && isHbbDiagnosticItem(item)) return false;
  return true;
}

export function calculateDueInfo(
  item: MaintenanceItem,
  profile: VehicleProfile,
  allRecords: ServiceRecord[],
  today = new Date()
): DueInfo {
  const records = allRecords.filter((record) => record.itemId === item.id);
  const latestRecord = mostRecentRecord(records);

  if (isHbbDiagnosticItem(item) && (item.diagnosticOnly || item.conditionBased)) {
    return {
      item,
      status: "conditionBased",
      dueKm: null,
      dueDate: null,
      kmRemaining: null,
      daysRemaining: null,
      basis: "condition",
      lastPerformedDate: latestRecord?.performedDate ?? null,
      lastPerformedOdometerKm: latestRecord?.performedOdometerKm ?? null,
      reason: "Condition based"
    };
  }

  if (isBaselineDue(item) && !latestRecord) {
    return {
      item,
      status: "baselineDueNow",
      dueKm: profile.currentOdometerKm,
      dueDate: new Date().toISOString().slice(0, 10),
      kmRemaining: 0,
      daysRemaining: 0,
      basis: "unknownHistory",
      lastPerformedDate: null,
      lastPerformedOdometerKm: null,
      reason: "Due now"
    };
  }

  if (!item.preventiveIntervalKm && !item.preventiveIntervalMonths) {
    return {
      item,
      status: "conditionBased",
      dueKm: null,
      dueDate: null,
      kmRemaining: null,
      daysRemaining: null,
      basis: "condition",
      lastPerformedDate: latestRecord?.performedDate ?? null,
      lastPerformedOdometerKm: latestRecord?.performedOdometerKm ?? null,
      reason: "No fixed preventive interval"
    };
  }

  const baselineDate = latestRecord?.performedDate ?? profile.purchaseDate;
  const baselineKm = latestRecord?.performedOdometerKm ?? profile.purchaseOdometerKm;
  const basis = latestRecord ? "serviceRecord" : "purchaseBaseline";

  let dueKm: number | null = null;
  let dueDate: string | null = null;

  if (item.preventiveIntervalKm && baselineKm !== null) {
    dueKm = baselineKm + item.preventiveIntervalKm;
  }

  if (item.preventiveIntervalMonths && baselineDate) {
    dueDate = addMonths(parseISO(baselineDate), item.preventiveIntervalMonths).toISOString().slice(0, 10);
  }

  if (dueKm === null && dueDate === null) {
    return {
      item,
      status: "noHistory",
      dueKm: null,
      dueDate: null,
      kmRemaining: null,
      daysRemaining: null,
      basis: "none",
      lastPerformedDate: latestRecord?.performedDate ?? null,
      lastPerformedOdometerKm: latestRecord?.performedOdometerKm ?? null,
      reason: "No service record or purchase baseline"
    };
  }

  const kmRemaining =
    dueKm !== null && profile.currentOdometerKm !== null ? dueKm - profile.currentOdometerKm : null;
  const daysRemaining = dueDate ? differenceInCalendarDays(parseISO(dueDate), today) : null;
  const status = statusFromSignals(kmRemaining, daysRemaining);

  return {
    item,
    status,
    dueKm,
    dueDate,
    kmRemaining,
    daysRemaining,
    basis,
    lastPerformedDate: baselineDate ?? null,
    lastPerformedOdometerKm: baselineKm,
    reason: status === "ok" ? "Within preventive interval" : "Preventive interval reached"
  };
}

export function calculateAllDue(
  items: MaintenanceItem[],
  profile: VehicleProfile,
  records: ServiceRecord[],
  today = new Date()
): DueInfo[] {
  return items.filter(isRegularDueListItem).map((item) => calculateDueInfo(item, profile, records, today));
}
