import { Download, RotateCcw, Upload } from "lucide-react";
import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from "react";
import { exportUserData, importUserData } from "../db/indexedDb";
import type { AppExport, OdometerReading, VehicleProfile } from "../types";
import { formatDate, formatKm } from "../utils/format";

interface SettingsProps {
  profile: VehicleProfile;
  odometerReadings: OdometerReading[];
  onSaveProfile: (profile: VehicleProfile) => Promise<void>;
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

export function Settings({ profile, odometerReadings, onSaveProfile, onImportComplete, onReset }: SettingsProps) {
  const [unknownHistoryMode, setUnknownHistoryMode] = useState(profile.unknownHistoryMode);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUnknownHistoryMode(profile.unknownHistoryMode);
  }, [profile.unknownHistoryMode]);

  const sortedOdometerReadings = useMemo(
    () => [...odometerReadings].sort((a, b) => b.date.localeCompare(a.date)),
    [odometerReadings]
  );

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    await onSaveProfile({
      ...profile,
      unknownHistoryMode
    });
    setMessage("Settings saved.");
  }

  async function handleExport() {
    const data = await exportUserData();
    downloadJson(`pajero-maintenance-${new Date().toISOString().slice(0, 10)}.json`, data);
    setMessage("Export prepared.");
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

  return (
    <main className="page">
      <section className="section-block">
        <p className="eyebrow">Local device settings</p>
        <h1>Settings</h1>
      </section>

      <section className="section-block detail-card">
        <h2>Vehicle details</h2>
        <dl className="detail-grid">
          <div className="detail-row">
            <dt>Vehicle</dt>
            <dd>Mitsubishi Pajero III / Montero / Shogun Gen 3</dd>
          </div>
          <div className="detail-row">
            <dt>Year</dt>
            <dd>2001</dd>
          </div>
          <div className="detail-row">
            <dt>Model code</dt>
            <dd>{profile.modelCode}</dd>
          </div>
          <div className="detail-row">
            <dt>Engine</dt>
            <dd>{profile.engine}</dd>
          </div>
          <div className="detail-row">
            <dt>Transmission</dt>
            <dd>automatic {profile.transmission.replace(/^automatic\s+/i, "").replace(/\s+automatic$/i, "")}</dd>
          </div>
          <div className="detail-row">
            <dt>VIN</dt>
            <dd>{profile.vin}</dd>
          </div>
        </dl>
      </section>

      <section className="section-block detail-card">
        <h2>Purchase baseline</h2>
        <dl className="detail-grid">
          <div className="detail-row">
            <dt>Purchased</dt>
            <dd>{formatDate(profile.purchaseDate)}</dd>
          </div>
          <div className="detail-row">
            <dt>Purchase odometer</dt>
            <dd>{formatKm(profile.purchaseOdometerKm)}</dd>
          </div>
          <div className="detail-row">
            <dt>Current odometer</dt>
            <dd>{formatKm(profile.currentOdometerKm)}</dd>
          </div>
        </dl>
      </section>

      <section className="section-block detail-card">
        <h2>Maintenance settings</h2>
        <form className="form-stack" onSubmit={saveSettings}>
          <label className="toggle-row">
            <span>
              <strong>Unknown history mode</strong>
              <small>Flags baseline items until they get a service record.</small>
            </span>
            <input
              type="checkbox"
              checked={unknownHistoryMode}
              onChange={(event) => setUnknownHistoryMode(event.target.checked)}
            />
          </label>

          <p className="settings-note">
            Offline web apps cannot schedule reliable monthly iPhone notifications while closed. This app shows odometer
            reminders when opened.
          </p>

          {message ? <p className="form-success">{message}</p> : null}
          {error ? <p className="form-error">{error}</p> : null}

          <button className="primary-button" type="submit">
            Save settings
          </button>
        </form>
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
        <h2>Local data</h2>
        <div className="button-grid">
          <button className="secondary-button" type="button" onClick={handleExport}>
            <Download aria-hidden="true" size={20} />
            Export JSON
          </button>
          <label className="secondary-button file-button">
            <Upload aria-hidden="true" size={20} />
            Import JSON
            <input accept="application/json" type="file" onChange={handleImport} />
          </label>
          <button className="danger-button" type="button" onClick={handleReset}>
            <RotateCcw aria-hidden="true" size={20} />
            Reset local data
          </button>
        </div>
      </section>
    </main>
  );
}
