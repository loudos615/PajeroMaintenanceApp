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

export interface MaintenanceFluid {
  specification?: string | null;
  capacity?: string | null;
  serviceFill?: string | null;
  buyQuantity?: string | null;
  shelfLabel?: string | null;
  avoid?: string | null;
  notes?: string | null;
}

export interface AftermarketExample {
  brand?: string | null;
  partNumber?: string | null;
  confidence?: string | null;
  note?: string | null;
}

export interface MaintenancePart {
  role?: string | null;
  specification?: string | null;
  size?: string | null;
  capacity?: string | null;
  quantity?: string | null;
  buyQuantity?: string | null;
  oemPartNumber?: string | null;
  oemPartName?: string | null;
  alternatives?: string[] | null;
  aftermarketExamples?: Array<string | AftermarketExample> | null;
  confidence?: string | null;
  note?: string | null;
}

export interface MaintenanceVerification {
  needed?: boolean;
  shortLabel?: string | null;
  reason?: string | null;
}

export interface ReplacementChecklist {
  mainParts?: Array<string | MaintenancePart>;
  sealsWashersHardware?: Array<string | MaintenancePart>;
  usefulExtras?: Array<string | MaintenancePart>;
  notes?: string | string[] | null;
}

export interface MaintenanceVehicleProfile {
  displayName?: string;
  vehicle?: string;
  year?: number;
  body?: string;
  modelCode?: string;
  modelVariant?: string;
  engine?: string;
  powerKw?: number;
  transmission?: string;
  drive?: string;
  market?: string;
  vin?: string;
  purchaseDate?: string;
  purchaseOdometerKm?: number;
}

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
  recommendedIntervalKm?: number | null;
  recommendedIntervalMonths?: number | null;
  priority: Priority;
  difficulty: string | null;
  afterPurchaseUnknownHistory: boolean;
  baselineDue?: boolean;
  conditionBased: boolean;
  diagnosticOnly?: boolean;
  showInRegularDueList?: boolean;
  verificationRequired: boolean;
  verification?: MaintenanceVerification | null;
  parts: Array<string | MaintenancePart> | null;
  fluid?: MaintenanceFluid | null;
  replacementChecklist?: ReplacementChecklist | null;
  fluidSpec: string | null;
  symptomsIfNeglected: string | null;
  notes: string | null;
  appNotes?: string[];
  originalNotes?: string | null;
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

export interface LocalPartsNote {
  itemId: string;
  preferredBrand: string;
  oemNumberChecked: string;
  aftermarketPartUsed: string;
  shopLink: string;
  personalNote: string;
  updatedAt: string;
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
  localPartsNotes: LocalPartsNote[];
  dismissedReminders: {
    odometerReminderDismissedAt: string | null;
  };
  settings: {
    unknownHistoryMode: boolean;
    odometerReminderDismissedAt: string | null;
  };
}
