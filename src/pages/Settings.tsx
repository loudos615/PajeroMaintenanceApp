import { Download, RotateCcw, Upload } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { exportUserData, importUserData } from "../db/indexedDb";
import type { AppExport, VehicleProfile } from "../types";

interface SettingsProps {
  profile: VehicleProfile;
  onSaveProfile: (profile: VehicleProfile) => Promise<void>;
  onImportComplete: () => Promise<void>;
  onReset: () => Promise<void>;
}

export function Settings({ profile, onSaveProfile, onImportComplete, onReset }: SettingsProps) {
  const [draft, setDraft] = useState(profile);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateDraft<Value extends keyof VehicleProfile>(key: Value, value: VehicleProfile[Value]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    await onSaveProfile(draft);
    setMessage("Vehicle profile saved.");
  }

  async function handleExport() {
    const data = await exportUserData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `pajero-maintenance-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Export prepared.");
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

      <section className="section-block">
        <h2>Vehicle profile</h2>
        <form className="form-stack" onSubmit={saveProfile}>
          <label>
            Vehicle name
            <input value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} />
          </label>
          <label>
            VIN
            <input value={draft.vin} onChange={(event) => updateDraft("vin", event.target.value)} />
          </label>
          <label>
            Model code
            <input value={draft.modelCode} onChange={(event) => updateDraft("modelCode", event.target.value)} />
          </label>
          <label>
            Engine
            <input value={draft.engine} onChange={(event) => updateDraft("engine", event.target.value)} />
          </label>
          <label>
            Transmission
            <input value={draft.transmission} onChange={(event) => updateDraft("transmission", event.target.value)} />
          </label>
          <label>
            Current odometer km
            <input
              inputMode="numeric"
              type="number"
              value={draft.currentOdometerKm ?? ""}
              onChange={(event) => updateDraft("currentOdometerKm", event.target.value ? Number(event.target.value) : null)}
            />
          </label>
          <label>
            Purchase date
            <input
              type="date"
              value={draft.purchaseDate ?? ""}
              onChange={(event) => updateDraft("purchaseDate", event.target.value || null)}
            />
          </label>
          <label>
            Purchase odometer km
            <input
              inputMode="numeric"
              type="number"
              value={draft.purchaseOdometerKm ?? ""}
              onChange={(event) => updateDraft("purchaseOdometerKm", event.target.value ? Number(event.target.value) : null)}
            />
          </label>
          <label className="toggle-row">
            <span>
              <strong>Unknown history mode</strong>
              <small>Flags baseline items until they get a service record.</small>
            </span>
            <input
              type="checkbox"
              checked={draft.unknownHistoryMode}
              onChange={(event) => updateDraft("unknownHistoryMode", event.target.checked)}
            />
          </label>

          {message ? <p className="form-success">{message}</p> : null}
          {error ? <p className="form-error">{error}</p> : null}

          <button className="primary-button" type="submit">
            Save profile
          </button>
        </form>
      </section>

      <section className="section-block">
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
