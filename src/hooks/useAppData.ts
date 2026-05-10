import { useCallback, useEffect, useMemo, useState } from "react";
import { maintenanceItems } from "../data/maintenanceItems";
import {
  addOdometerReading,
  addServiceRecord,
  getLocalPartsNotes,
  getOdometerReadings,
  getServiceRecords,
  getVehicleProfile,
  resetUserData,
  saveLocalPartsNote,
  saveVehicleProfile
} from "../db/indexedDb";
import { calculateAllDue } from "../services/dueCalculator";
import type { LocalPartsNote, OdometerReading, ServiceRecord, VehicleProfile } from "../types";

export function useAppData() {
  const [profile, setProfile] = useState<VehicleProfile | null>(null);
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>([]);
  const [odometerReadings, setOdometerReadings] = useState<OdometerReading[]>([]);
  const [localPartsNotes, setLocalPartsNotes] = useState<LocalPartsNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [nextProfile, nextRecords, nextReadings, nextPartsNotes] = await Promise.all([
        getVehicleProfile(),
        getServiceRecords(),
        getOdometerReadings(),
        getLocalPartsNotes()
      ]);
      setProfile(nextProfile);
      setServiceRecords(nextRecords);
      setOdometerReadings(nextReadings);
      setLocalPartsNotes(nextPartsNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load local data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const updateProfile = useCallback(async (nextProfile: VehicleProfile) => {
    await saveVehicleProfile(nextProfile);
    setProfile(nextProfile);
  }, []);

  const recordOdometer = useCallback(
    async (reading: OdometerReading) => {
      if (!profile) return;

      await addOdometerReading(reading);
      const nextProfile = {
        ...profile,
        currentOdometerKm: reading.odometerKm
      };
      await saveVehicleProfile(nextProfile);
      setProfile(nextProfile);
      setOdometerReadings((current) => [reading, ...current].sort((a, b) => b.date.localeCompare(a.date)));
    },
    [profile]
  );

  const dismissOdometerReminder = useCallback(async () => {
    if (!profile) return;
    const nextProfile = {
      ...profile,
      odometerReminderDismissedAt: new Date().toISOString()
    };
    await saveVehicleProfile(nextProfile);
    setProfile(nextProfile);
  }, [profile]);

  const recordService = useCallback(
    async (record: ServiceRecord) => {
      if (!profile) return;
      await addServiceRecord(record);

      let nextProfile = profile;
      if (record.performedOdometerKm !== null && (profile.currentOdometerKm ?? 0) < record.performedOdometerKm) {
        nextProfile = {
          ...profile,
          currentOdometerKm: record.performedOdometerKm
        };
        await saveVehicleProfile(nextProfile);
        setProfile(nextProfile);
      }

      setServiceRecords((current) => [record, ...current].sort((a, b) => b.performedDate.localeCompare(a.performedDate)));
    },
    [profile]
  );

  const resetAll = useCallback(async () => {
    await resetUserData();
    await reload();
  }, [reload]);

  const savePartsNote = useCallback(async (note: LocalPartsNote) => {
    await saveLocalPartsNote(note);
    setLocalPartsNotes((current) => [
      note,
      ...current.filter((existing) => existing.itemId !== note.itemId)
    ]);
  }, []);

  const dueInfos = useMemo(() => {
    if (!profile) return [];
    return calculateAllDue(maintenanceItems, profile, serviceRecords);
  }, [profile, serviceRecords]);

  return {
    items: maintenanceItems,
    profile,
    serviceRecords,
    odometerReadings,
    localPartsNotes,
    dueInfos,
    loading,
    error,
    reload,
    updateProfile,
    recordOdometer,
    recordService,
    savePartsNote,
    dismissOdometerReminder,
    resetAll
  };
}
