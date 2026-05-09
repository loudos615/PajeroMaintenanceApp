import { useCallback, useEffect, useMemo, useState } from "react";
import maintenanceItems from "../data/maintenance_items.json";
import {
  addOdometerReading,
  addServiceRecord,
  getOdometerReadings,
  getServiceRecords,
  getVehicleProfile,
  resetUserData,
  saveVehicleProfile
} from "../db/indexedDb";
import { calculateAllDue } from "../services/dueCalculator";
import type { MaintenanceItem, OdometerReading, ServiceRecord, VehicleProfile } from "../types";

const typedMaintenanceItems = maintenanceItems as MaintenanceItem[];

export function useAppData() {
  const [profile, setProfile] = useState<VehicleProfile | null>(null);
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>([]);
  const [odometerReadings, setOdometerReadings] = useState<OdometerReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [nextProfile, nextRecords, nextReadings] = await Promise.all([
        getVehicleProfile(),
        getServiceRecords(),
        getOdometerReadings()
      ]);
      setProfile(nextProfile);
      setServiceRecords(nextRecords);
      setOdometerReadings(nextReadings);
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

  const dueInfos = useMemo(() => {
    if (!profile) return [];
    return calculateAllDue(typedMaintenanceItems, profile, serviceRecords);
  }, [profile, serviceRecords]);

  return {
    items: typedMaintenanceItems,
    profile,
    serviceRecords,
    odometerReadings,
    dueInfos,
    loading,
    error,
    reload,
    updateProfile,
    recordOdometer,
    recordService,
    resetAll
  };
}
