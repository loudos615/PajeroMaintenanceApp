import { X } from "lucide-react";
import { type FormEvent, useState } from "react";
import type { MaintenanceItem, ServiceRecord, VehicleProfile } from "../types";
import { createId } from "../utils/id";
import { todayInputValue } from "../utils/format";

interface MarkDoneSheetProps {
  item: MaintenanceItem;
  profile: VehicleProfile;
  onClose: () => void;
  onSave: (record: ServiceRecord) => Promise<void>;
}

export function MarkDoneSheet({ item, profile, onClose, onSave }: MarkDoneSheetProps) {
  const [performedDate, setPerformedDate] = useState(todayInputValue());
  const [performedOdometerKm, setPerformedOdometerKm] = useState(
    profile.currentOdometerKm ? String(profile.currentOdometerKm) : ""
  );
  const [note, setNote] = useState("");
  const [partsUsed, setPartsUsed] = useState("");
  const [cost, setCost] = useState("");
  const [verificationValue, setVerificationValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const odometer = performedOdometerKm ? Number(performedOdometerKm) : null;
    if (odometer !== null && (!Number.isInteger(odometer) || odometer < 0)) {
      setError("Enter a valid odometer reading.");
      return;
    }

    const parsedCost = cost ? Number(cost) : null;
    if (parsedCost !== null && (!Number.isFinite(parsedCost) || parsedCost < 0)) {
      setError("Enter a valid cost.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        id: createId("service"),
        itemId: item.id,
        performedDate,
        performedOdometerKm: odometer,
        note: note.trim() || null,
        partsUsed: partsUsed.trim() || null,
        cost: parsedCost,
        verificationValue: verificationValue.trim() || null
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save service record.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="sheet-backdrop" role="presentation">
      <section className="sheet" aria-label={`Mark ${item.name} as done`}>
        <div className="sheet__header">
          <div>
            <p className="eyebrow">Mark as done</p>
            <h2>{item.name}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close">
            <X aria-hidden="true" />
          </button>
        </div>

        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            Performed date
            <input type="date" value={performedDate} onChange={(event) => setPerformedDate(event.target.value)} required />
          </label>

          <label>
            Performed odometer km
            <input
              inputMode="numeric"
              min="0"
              pattern="[0-9]*"
              type="number"
              value={performedOdometerKm}
              onChange={(event) => setPerformedOdometerKm(event.target.value)}
            />
          </label>

          <label>
            Note
            <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} />
          </label>

          <label>
            Parts used
            <textarea value={partsUsed} onChange={(event) => setPartsUsed(event.target.value)} rows={2} />
          </label>

          <label>
            Cost
            <input inputMode="decimal" min="0" type="number" value={cost} onChange={(event) => setCost(event.target.value)} />
          </label>

          <label>
            Verification value
            <input
              value={verificationValue}
              onChange={(event) => setVerificationValue(event.target.value)}
              placeholder="Coolant amount, ATF amount, diff type..."
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button className="primary-button" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save service record"}
          </button>
        </form>
      </section>
    </div>
  );
}
