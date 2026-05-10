import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { AppExport, LocalPartsNote, OdometerReading, ServiceRecord, VehicleProfile } from "../types";

const DB_NAME = "pajero-maintenance-db";
const DB_VERSION = 2;
const PROFILE_ID = "v78w-2001";

export const DEFAULT_VEHICLE_PROFILE: VehicleProfile = {
  id: PROFILE_ID,
  name: "2001 Mitsubishi Pajero III V78W 4M41",
  vin: "JMBLYV78W1J007732",
  modelCode: "V78W",
  engine: "4M41 3.2 Di-D",
  transmission: "V5A51 automatic",
  currentOdometerKm: 287000,
  purchaseDate: "2026-04-22",
  purchaseOdometerKm: 287000,
  unknownHistoryMode: true,
  odometerReminderDismissedAt: null
};

function normalizeVehicleProfile(profile: Partial<VehicleProfile> | null | undefined): VehicleProfile {
  return {
    ...DEFAULT_VEHICLE_PROFILE,
    ...profile,
    id: PROFILE_ID,
    purchaseDate: profile?.purchaseDate ?? DEFAULT_VEHICLE_PROFILE.purchaseDate,
    purchaseOdometerKm: profile?.purchaseOdometerKm ?? DEFAULT_VEHICLE_PROFILE.purchaseOdometerKm,
    unknownHistoryMode: true,
    odometerReminderDismissedAt: profile?.odometerReminderDismissedAt ?? null
  };
}

interface PajeroMaintenanceDb extends DBSchema {
  vehicleProfile: {
    key: string;
    value: VehicleProfile;
  };
  serviceRecords: {
    key: string;
    value: ServiceRecord;
    indexes: {
      itemId: string;
      performedDate: string;
    };
  };
  odometerReadings: {
    key: string;
    value: OdometerReading;
    indexes: {
      date: string;
    };
  };
  localPartsNotes: {
    key: string;
    value: LocalPartsNote;
  };
}

let dbPromise: Promise<IDBPDatabase<PajeroMaintenanceDb>> | null = null;

function getDb() {
  dbPromise ??= openDB<PajeroMaintenanceDb>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("vehicleProfile")) {
        db.createObjectStore("vehicleProfile", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("serviceRecords")) {
        const records = db.createObjectStore("serviceRecords", { keyPath: "id" });
        records.createIndex("itemId", "itemId");
        records.createIndex("performedDate", "performedDate");
      }

      if (!db.objectStoreNames.contains("odometerReadings")) {
        const readings = db.createObjectStore("odometerReadings", { keyPath: "id" });
        readings.createIndex("date", "date");
      }

      if (!db.objectStoreNames.contains("localPartsNotes")) {
        db.createObjectStore("localPartsNotes", { keyPath: "itemId" });
      }
    }
  });

  return dbPromise;
}

export async function getVehicleProfile(): Promise<VehicleProfile> {
  const db = await getDb();
  const existing = await db.get("vehicleProfile", PROFILE_ID);

  if (existing) {
    const normalized = normalizeVehicleProfile(existing);
    if (JSON.stringify(existing) !== JSON.stringify(normalized)) {
      await db.put("vehicleProfile", normalized);
    }
    return normalized;
  }

  await db.put("vehicleProfile", DEFAULT_VEHICLE_PROFILE);
  return DEFAULT_VEHICLE_PROFILE;
}

export async function saveVehicleProfile(profile: VehicleProfile): Promise<void> {
  const db = await getDb();
  await db.put("vehicleProfile", profile);
}

export async function getServiceRecords(): Promise<ServiceRecord[]> {
  const db = await getDb();
  const records = await db.getAll("serviceRecords");
  return records.sort((a, b) => b.performedDate.localeCompare(a.performedDate));
}

export async function getServiceRecordsForItem(itemId: string): Promise<ServiceRecord[]> {
  const db = await getDb();
  const records = await db.getAllFromIndex("serviceRecords", "itemId", itemId);
  return records.sort((a, b) => b.performedDate.localeCompare(a.performedDate));
}

export async function addServiceRecord(record: ServiceRecord): Promise<void> {
  const db = await getDb();
  await db.put("serviceRecords", record);
}

export async function getOdometerReadings(): Promise<OdometerReading[]> {
  const db = await getDb();
  const readings = await db.getAll("odometerReadings");
  return readings.sort((a, b) => b.date.localeCompare(a.date));
}

export async function addOdometerReading(reading: OdometerReading): Promise<void> {
  const db = await getDb();
  await db.put("odometerReadings", reading);
}

export async function getLocalPartsNotes(): Promise<LocalPartsNote[]> {
  const db = await getDb();
  const notes = await db.getAll("localPartsNotes");
  return notes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getLocalPartsNote(itemId: string): Promise<LocalPartsNote | undefined> {
  const db = await getDb();
  return db.get("localPartsNotes", itemId);
}

export async function saveLocalPartsNote(note: LocalPartsNote): Promise<void> {
  const db = await getDb();
  await db.put("localPartsNotes", note);
}

export async function exportUserData(): Promise<AppExport> {
  const [vehicleProfile, serviceRecords, odometerReadings, localPartsNotes] = await Promise.all([
    getVehicleProfile(),
    getServiceRecords(),
    getOdometerReadings(),
    getLocalPartsNotes()
  ]);

  return {
    exportedAt: new Date().toISOString(),
    vehicleProfile,
    serviceRecords,
    odometerReadings,
    localPartsNotes,
    dismissedReminders: {
      odometerReminderDismissedAt: vehicleProfile.odometerReminderDismissedAt
    },
    settings: {
      unknownHistoryMode: true,
      odometerReminderDismissedAt: vehicleProfile.odometerReminderDismissedAt
    }
  };
}

export async function importUserData(data: AppExport): Promise<void> {
  if (!data.vehicleProfile || !Array.isArray(data.serviceRecords) || !Array.isArray(data.odometerReadings)) {
    throw new Error("Import file is missing Pajero Maintenance data.");
  }

  const db = await getDb();
  const hasLocalPartsNotes = Array.isArray(data.localPartsNotes);
  const tx = db.transaction(["vehicleProfile", "serviceRecords", "odometerReadings", "localPartsNotes"], "readwrite");

  await Promise.all([
    tx.objectStore("vehicleProfile").clear(),
    tx.objectStore("serviceRecords").clear(),
    tx.objectStore("odometerReadings").clear(),
    hasLocalPartsNotes ? tx.objectStore("localPartsNotes").clear() : Promise.resolve()
  ]);

  await tx.objectStore("vehicleProfile").put(normalizeVehicleProfile(data.vehicleProfile));

  for (const record of data.serviceRecords) {
    await tx.objectStore("serviceRecords").put(record);
  }

  for (const reading of data.odometerReadings) {
    await tx.objectStore("odometerReadings").put(reading);
  }

  if (hasLocalPartsNotes) {
    for (const note of data.localPartsNotes) {
      await tx.objectStore("localPartsNotes").put(note);
    }
  }

  await tx.done;
}

export async function resetUserData(): Promise<void> {
  const db = await getDb();
  const tx = db.transaction(["vehicleProfile", "serviceRecords", "odometerReadings", "localPartsNotes"], "readwrite");
  await Promise.all([
    tx.objectStore("vehicleProfile").clear(),
    tx.objectStore("serviceRecords").clear(),
    tx.objectStore("odometerReadings").clear(),
    tx.objectStore("localPartsNotes").clear()
  ]);
  await tx.objectStore("vehicleProfile").put(DEFAULT_VEHICLE_PROFILE);
  await tx.done;
}
