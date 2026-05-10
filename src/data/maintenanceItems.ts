import maintenanceDatabase from "./maintenance_items_v17_parts_checklist.json";
import { SYSTEM_ORDER, type MaintenanceItem, type MaintenanceVehicleProfile, type SystemName } from "../types";

interface RawMaintenanceDatabase {
  vehicleProfile?: MaintenanceVehicleProfile;
  maintenanceItems?: Array<Partial<MaintenanceItem> & Record<string, unknown>>;
}

const systemAliases: Record<string, SystemName> = {
  "Transfer case and 4WD system": "Transfer case / 4WD"
};

function normalizeSystem(system: unknown): SystemName {
  if (typeof system !== "string") return "Engine";
  if (system in systemAliases) return systemAliases[system];
  if ((SYSTEM_ORDER as readonly string[]).includes(system)) return system as SystemName;
  return "Engine";
}

function cleanName(name: string): string {
  return name.replace(/\s+on unknown history/gi, "").trim();
}

function cleanNote(note: string): string {
  return note
    .replace(/unknown history/gi, "first-service baseline")
    .replace(
      /Condition-based diagnostic item only\. Do not treat HBB accumulator as a normal recurring maintenance part\./gi,
      "Condition-based diagnostic item. Use when HBB symptoms or codes are present."
    )
    .replace(/Do not show as due by mileage\.\s*/gi, "")
    .trim();
}

function normalizeNotes(notes: unknown): string | null {
  if (!Array.isArray(notes)) return null;
  const cleaned = notes.filter((note): note is string => typeof note === "string").map(cleanNote).filter(Boolean);
  return cleaned.length ? cleaned.join("\n") : null;
}

function normalizeItem(raw: Partial<MaintenanceItem> & Record<string, unknown>): MaintenanceItem {
  const verification = raw.verification ?? null;
  const fluid = raw.fluid ?? null;
  const recommendedIntervalKm = raw.recommendedIntervalKm ?? raw.preventiveIntervalKm ?? null;
  const recommendedIntervalMonths = raw.recommendedIntervalMonths ?? raw.preventiveIntervalMonths ?? null;
  const appNotes = Array.isArray(raw.appNotes)
    ? raw.appNotes.filter((note): note is string => typeof note === "string").map(cleanNote).filter(Boolean)
    : [];

  return {
    id: String(raw.id ?? ""),
    system: normalizeSystem(raw.system),
    name: cleanName(String(raw.name ?? "Maintenance item")),
    action: String(raw.action ?? "Inspect"),
    officialIntervalKm: raw.officialIntervalKm ?? null,
    officialIntervalMonths: raw.officialIntervalMonths ?? null,
    preventiveIntervalKm: recommendedIntervalKm,
    preventiveIntervalMonths: recommendedIntervalMonths,
    recommendedIntervalKm,
    recommendedIntervalMonths,
    priority: raw.priority ? String(raw.priority) : "Medium",
    difficulty: raw.difficulty ? String(raw.difficulty) : null,
    afterPurchaseUnknownHistory: Boolean(raw.afterPurchaseUnknownHistory ?? raw.baselineDue ?? false),
    baselineDue: Boolean(raw.baselineDue ?? raw.afterPurchaseUnknownHistory ?? false),
    conditionBased: Boolean(raw.conditionBased ?? false),
    diagnosticOnly: Boolean(raw.diagnosticOnly ?? false),
    showInRegularDueList: raw.showInRegularDueList !== false,
    verificationRequired: Boolean(raw.verificationRequired ?? verification?.needed ?? false),
    verification,
    parts: Array.isArray(raw.parts) ? raw.parts : null,
    fluid,
    replacementChecklist: raw.replacementChecklist ?? null,
    fluidSpec: raw.fluidSpec ?? fluid?.specification ?? null,
    symptomsIfNeglected: raw.symptomsIfNeglected ? String(raw.symptomsIfNeglected) : null,
    notes: normalizeNotes(appNotes),
    appNotes,
    originalNotes: raw.originalNotes ? String(raw.originalNotes) : null,
    sourceType: raw.sourceType ? String(raw.sourceType) : null,
    sourceKeys: Array.isArray(raw.sourceKeys) ? raw.sourceKeys.map(String) : []
  };
}

const database = maintenanceDatabase as RawMaintenanceDatabase;

export const maintenanceVehicleProfile: MaintenanceVehicleProfile = database.vehicleProfile ?? {};

export const maintenanceItems: MaintenanceItem[] = (database.maintenanceItems ?? [])
  .map(normalizeItem)
  .filter((item) => item.id);
