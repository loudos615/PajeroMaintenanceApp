import { Download, RotateCcw, Upload } from "lucide-react";
import { type ChangeEvent, useMemo, useState } from "react";
import { APP_VERSION } from "../app/version";
import { maintenanceVehicleProfile } from "../data/maintenanceItems";
import { exportUserData, importUserData } from "../db/indexedDb";
import { checkForUpdateAndReload } from "../services/appUpdate";
import type { AppExport, OdometerReading, VehicleProfile } from "../types";
import { formatDate, formatKm } from "../utils/format";

interface SettingsProps {
  profile: VehicleProfile;
  odometerReadings: OdometerReading[];
  onImportComplete: () => Promise<void>;
  onReset: () => Promise<void>;
}

function methodLabel(method: OdometerReading["method"]): string {
  return method === "ocr" ? "OCR" : "manual";
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function transmissionLabel(value: string | undefined): string {
  if (!value) return "Automatic V5A51";
  return value.toLowerCase().includes("automatic") ? value.replace(/^v5a51/i, "V5A51") : `Automatic ${value}`;
}

export function Settings({ profile, odometerReadings, onImportComplete, onReset }: SettingsProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkingForUpdate, setCheckingForUpdate] = useState(false);

  const sortedOdometerReadings = useMemo(
    () => [...odometerReadings].sort((a, b) => b.date.localeCompare(a.date)),
    [odometerReadings]
  );

  async function handleExport() {
    const data = await exportUserData();
    downloadJson(`pajero-maintenance-backup-${new Date().toISOString().slice(0, 10)}.json`, data);
    setMessage("Backup export prepared.");
  }

  function handleOdometerExport() {
    downloadJson(`pajero-odometer-history-${new Date().toISOString().slice(0, 10)}.json`, {
      exportedAt: new Date().toISOString(),
      odometerReadings: sortedOdometerReadings
    });
    setMessage("Odometer history export prepared.");
  }

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setMessage(null);
    try {
      const parsed = JSON.parse(await file.text()) as AppExport;
      await importUserData(parsed);
      await onImportComplete();
      setMessage("Import complete.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not import that JSON file.");
    } finally {
      event.target.value = "";
    }
  }

  async function handleReset() {
    const confirmed = window.confirm("Reset all local Pajero Maintenance data on this device?");
    if (!confirmed) return;
    await onReset();
    setMessage("Local data reset.");
  }

  async function handleUpdateReload() {
    setError(null);
    setMessage("Checking for an app update...");
    setCheckingForUpdate(true);
    try {
      await checkForUpdateAndReload();
    } catch (err) {
      setCheckingForUpdate(false);
      setError(err instanceof Error ? err.message : "Could not reload the app update.");
      setMessage(null);
    }
  }

  return (
    <main className="page">
      <section className="section-block">
        <p className="eyebrow">Local device settings</p>
        <h1>Settings</h1>
        {message ? <p className="form-success">{message}</p> : null}
        {error ? <p className="form-error">{error}</p> : null}
      </section>

      <section className="section-block detail-card">
        <h2>Vehicle details</h2>
        <dl className="detail-grid">
          <Detail label="Vehicle" value="Mitsubishi Pajero III" />
          <Detail label="Market name" value="Pajero / Montero / Shogun" />
          <Detail label="Generation" value="Gen 3" />
          <Detail label="Year" value={String(maintenanceVehicleProfile.year ?? 2001)} />
          <Detail label="Body" value={maintenanceVehicleProfile.body ?? "5-door long wheelbase"} />
          <Detail label="Model code" value={maintenanceVehicleProfile.modelCode ?? profile.modelCode} />
          <Detail label="Engine" value={maintenanceVehicleProfile.engine ?? profile.engine} />
          <Detail label="Fuel" value="Diesel" />
          <Detail label="Transmission" value={transmissionLabel(maintenanceVehicleProfile.transmission)} />
          <Detail label="Drive" value="4WD / Super Select" />
          <Detail label="Power" value={`${maintenanceVehicleProfile.powerKw ?? 121} kW`} />
          <Detail label="VIN" value={profile.vin} />
        </dl>
      </section>

      <section className="section-block detail-card">
        <h2>Current odometer</h2>
        <dl className="detail-grid">
          <Detail label="Odometer" value={formatKm(profile.currentOdometerKm)} />
          <Detail label="Purchased" value={formatDate(profile.purchaseDate)} />
          <Detail label="Purchase odometer" value={formatKm(profile.purchaseOdometerKm)} />
        </dl>
      </section>

      <section className="section-block detail-card">
        <h2>App update</h2>
        <dl className="detail-grid">
          <Detail label="App version" value={APP_VERSION} />
        </dl>
        <button
          className="secondary-button full-width-button"
          type="button"
          onClick={handleUpdateReload}
          disabled={checkingForUpdate}
        >
          <RotateCcw aria-hidden="true" size={20} />
          {checkingForUpdate ? "Checking..." : "Check for update / Reload app"}
        </button>
      </section>

      <section className="section-block detail-card">
        <div className="section-heading">
          <h2>Odometer history</h2>
          <span className="muted">{sortedOdometerReadings.length} updates</span>
        </div>

        <button className="secondary-button full-width-button" type="button" onClick={handleOdometerExport}>
          <Download aria-hidden="true" size={20} />
          Export odometer history JSON
        </button>

        {sortedOdometerReadings.length ? (
          <div className="history-list odometer-history-list">
            {sortedOdometerReadings.map((reading) => (
              <article className="history-card" key={reading.id}>
                <div className="history-card__topline">
                  <strong>{formatDate(reading.date)}</strong>
                  <span>{formatKm(reading.odometerKm)}</span>
                </div>
                <p className="muted">Method: {methodLabel(reading.method)}</p>
                {reading.rawOcrText ? <p className="verification-value">OCR text: {reading.rawOcrText}</p> : null}
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">No confirmed odometer updates yet.</p>
        )}
      </section>

      <section className="section-block detail-card">
        <h2>Data backup</h2>
        <p className="settings-note">
          Your service history is stored locally on this device. Export a backup before clearing Safari data or reinstalling the app.
        </p>
        <div className="button-grid">
          <button className="secondary-button" type="button" onClick={handleExport}>
            <Download aria-hidden="true" size={20} />
            Export full backup JSON
          </button>
          <label className="secondary-button file-button">
            <Upload aria-hidden="true" size={20} />
            Import full backup JSON
            <input accept="application/json" type="file" onChange={handleImport} />
          </label>
        </div>
      </section>

      <section className="section-block detail-card">
        <h2>Reset local data</h2>
        <button className="danger-button full-width-button" type="button" onClick={handleReset}>
          <RotateCcw aria-hidden="true" size={20} />
          Reset local data
        </button>
      </section>
    </main>
  );
}
