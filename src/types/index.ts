export const SYSTEM_ORDER = [
  "Engine",
  "Automatic transmission",
  "Transfer case / 4WD",
  "Differentials and driveline",
  "Brakes",
  "Suspension and steering",
  "Body and chassis",
  "Electrical",
  "HVAC",
  "Interior and comfort"
] as const;

export type SystemName = (typeof SYSTEM_ORDER)[number];

export type Priority = "Critical" | "High" | "Medium" | "Low" | string;

export interface VehicleProfile {
  id: string;
  name: string;
  vin: string;
  modelCode: string;
  engine: string;
  transmission: string;
  currentOdometerKm: number | null;
  purchaseDate: string | null;
  purchaseOdometerKm: number | null;
  unknownHistoryMode: boolean;
  odometerReminderDismissedAt: string | null;
}

export interface MaintenanceItem {
  id: string;
  system: SystemName;
  name: string;
  action: string;
  officialIntervalKm: number | null;
  officialIntervalMonths: number | null;
  preventiveIntervalKm: number | null;
  preventiveIntervalMonths: number | null;
  priority: Priority;
  difficulty: string | null;
  afterPurchaseUnknownHistory: boolean;
  conditionBased: boolean;
  verificationRequired: boolean;
  parts: string[] | null;
  fluidSpec: string | null;
  symptomsIfNeglected: string | null;
  notes: string | null;
  sourceType: string | null;
  sourceKeys: string[];
}

export interface ServiceRecord {
  id: string;
  itemId: string;
  performedDate: string;
  performedOdometerKm: number | null;
  note: string | null;
  partsUsed: string | null;
  cost: number | null;
  verificationValue: string | null;
}

export interface OdometerReading {
  id: string;
  date: string;
  odometerKm: number;
  method: "manual" | "ocr";
  rawOcrText: string | null;
  confirmed: true;
}

export type DueStatus =
  | "baselineDueNow"
  | "overdue"
  | "dueSoon"
  | "ok"
  | "conditionBased"
  | "noHistory";

export interface DueInfo {
  item: MaintenanceItem;
  status: DueStatus;
  dueKm: number | null;
  dueDate: string | null;
  kmRemaining: number | null;
  daysRemaining: number | null;
  basis: "serviceRecord" | "purchaseBaseline" | "unknownHistory" | "condition" | "none";
  lastPerformedDate: string | null;
  lastPerformedOdometerKm: number | null;
  reason: string;
}

export interface AppExport {
  exportedAt: string;
  vehicleProfile: VehicleProfile;
  serviceRecords: ServiceRecord[];
  odometerReadings: OdometerReading[];
}
