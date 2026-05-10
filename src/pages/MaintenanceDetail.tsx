import { AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { MarkDoneSheet } from "../components/MarkDoneSheet";
import { StatusBadge } from "../components/StatusBadge";
import { navigateTo } from "../hooks/useHashRoute";
import type { DueInfo, LocalPartsNote, MaintenanceItem, MaintenancePart, ServiceRecord, VehicleProfile } from "../types";
import { formatDate, formatInterval, formatKm } from "../utils/format";

interface MaintenanceDetailProps {
  itemId: string;
  profile: VehicleProfile;
  dueInfos: DueInfo[];
  serviceRecords: ServiceRecord[];
  localPartsNote?: LocalPartsNote;
  onSaveRecord: (record: ServiceRecord) => Promise<void>;
  onSavePartsNote: (note: LocalPartsNote) => Promise<void>;
}

interface PartFluidRow {
  role: string;
  specification: string | null;
  capacity: string | null;
  buyQuantity: string | null;
  oemPartNumber: string | null;
  oemPartName: string | null;
  aftermarketExamples: string[];
  confidence: string | null;
  note: string | null;
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  const isEmpty = value === null || value === undefined || value === "";
  return (
    <div className="detail-row">
      <dt>{label}</dt>
      <dd>{isEmpty ? "Not set" : value}</dd>
    </div>
  );
}

function textValue(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function cleanText(value: string | null): string | null {
  if (!value) return null;
  return value
    .replace(/unknown history/gi, "first-service baseline")
    .replace(/verification required on this exact vehicle before hard-coding the value\.?/gi, "Check on vehicle.")
    .replace(/Do not show as due by mileage\.\s*/gi, "")
    .trim();
}

function cleanPartNumber(value: string | null | undefined): string | null {
  const text = textValue(value);
  if (!text || text.toUpperCase() === "TO_VERIFY") return null;
  return text;
}

function confidenceLabel(confidence: string | null | undefined): string | null {
  const value = (confidence ?? "").toLowerCase().replace(/[_-]/g, " ");
  if (!value || value === "not applicable") return null;
  if (value.includes("user verified") || value === "verified") return "Verified";
  if (value.includes("likely")) return "Likely";
  if (value.includes("to verify") || value.includes("to be added")) return "To be added";
  if (value.includes("verify")) return "Verify at service";
  if (value.includes("check")) return "Check before ordering";
  return "Confirm before ordering";
}

function verificationLabel(item: MaintenanceItem): string | null {
  const label = item.verification?.shortLabel?.toLowerCase() ?? "";
  if (!label || !item.verification?.needed) return null;
  if (label.includes("user verified")) return "Verified";
  if (label.includes("read") || label.includes("vehicle")) return "Check on vehicle";
  if (label.includes("service")) return "Verify at service";
  if (label.includes("order")) return "Confirm before ordering";
  return "Check on vehicle";
}

function isPartObject(part: string | MaintenancePart): part is MaintenancePart {
  return typeof part === "object" && part !== null;
}

function getPartsAndFluids(item: MaintenanceItem): PartFluidRow[] {
  const rows: PartFluidRow[] = [];
  const fluidSpec = textValue(item.fluid?.specification ?? item.fluidSpec);
  const fluidCapacity = textValue(item.fluid?.capacity ?? null);
  const serviceFill = textValue(item.fluid?.serviceFill ?? item.fluid?.notes ?? null);

  if (fluidSpec || fluidCapacity || serviceFill) {
    rows.push({
      role: "Fluid",
      specification: cleanText(fluidSpec),
      capacity: cleanText(fluidCapacity),
      buyQuantity: null,
      oemPartNumber: null,
      oemPartName: null,
      aftermarketExamples: [],
      confidence: verificationLabel(item),
      note: cleanText(serviceFill)
    });
  }

  for (const part of item.parts ?? []) {
    if (!isPartObject(part)) {
      rows.push({
        role: part,
        specification: null,
        capacity: null,
        buyQuantity: null,
        oemPartNumber: null,
        oemPartName: null,
        aftermarketExamples: [],
        confidence: null,
        note: null
      });
      continue;
    }

    rows.push({
      role: textValue(part.role) ?? "Part",
      specification: cleanText(textValue(part.specification)),
      capacity: cleanText(textValue(part.capacity ?? part.quantity)),
      buyQuantity: cleanText(textValue(part.buyQuantity)),
      oemPartNumber: cleanPartNumber(part.oemPartNumber),
      oemPartName: textValue(part.oemPartName),
      aftermarketExamples: [...(part.aftermarketExamples ?? []), ...(part.alternatives ?? [])].filter(Boolean),
      confidence: confidenceLabel(part.confidence),
      note: cleanText(textValue(part.note))
    });
  }

  return rows;
}

function getPracticalNotes(item: MaintenanceItem): string[] {
  const notes = [
    ...(item.appNotes ?? []),
    item.notes,
    item.symptomsIfNeglected ? `Watch for: ${item.symptomsIfNeglected}` : null
  ];

  return Array.from(
    new Set(notes.map((note) => cleanText(textValue(note))).filter((note): note is string => Boolean(note)))
  );
}

function needsVehicleCheck(item: MaintenanceItem, rows: PartFluidRow[]): boolean {
  if (item.verificationRequired || item.verification?.needed) return true;
  return rows.some((row) =>
    ["Verify at service", "Check before ordering", "Confirm before ordering", "To be added", "Check on vehicle"].includes(
      row.confidence ?? ""
    )
  );
}

function PartsAndFluids({ rows }: { rows: PartFluidRow[] }) {
  if (!rows.length) return <p className="empty-state">No parts or fluid details saved for this item yet.</p>;

  return (
    <div className="parts-grid">
      {rows.map((row, index) => (
        <article className="part-card" key={`${row.role}-${index}`}>
          <div className="part-card__header">
            <h3>{row.role}</h3>
            {row.confidence ? <span className="confidence-pill">{row.confidence}</span> : null}
          </div>
          <dl className="detail-grid">
            <DetailRow label="Specification" value={row.specification} />
            <DetailRow label="Capacity / quantity" value={row.capacity} />
            <DetailRow label="Buy quantity" value={row.buyQuantity} />
            <DetailRow label="OEM part number" value={row.oemPartNumber} />
            <DetailRow label="OEM part name" value={row.oemPartName} />
            <DetailRow
              label="Aftermarket examples"
              value={row.aftermarketExamples.length ? row.aftermarketExamples.join(", ") : null}
            />
            <DetailRow label="Note" value={row.note} />
          </dl>
        </article>
      ))}
    </div>
  );
}

const emptyPartsNote: Omit<LocalPartsNote, "itemId" | "updatedAt"> = {
  preferredBrand: "",
  oemNumberChecked: "",
  aftermarketPartUsed: "",
  shopLink: "",
  personalNote: ""
};

function PartsNotesForm({
  itemId,
  currentNote,
  onSave
}: {
  itemId: string;
  currentNote?: LocalPartsNote;
  onSave: (note: LocalPartsNote) => Promise<void>;
}) {
  const [form, setForm] = useState({ ...emptyPartsNote, ...currentNote });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm({ ...emptyPartsNote, ...currentNote });
  }, [currentNote]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await onSave({
        itemId,
        preferredBrand: form.preferredBrand.trim(),
        oemNumberChecked: form.oemNumberChecked.trim(),
        aftermarketPartUsed: form.aftermarketPartUsed.trim(),
        shopLink: form.shopLink.trim(),
        personalNote: form.personalNote.trim(),
        updatedAt: new Date().toISOString()
      });
      setMessage("Parts notes saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save parts notes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      <label>
        Preferred brand
        <input value={form.preferredBrand} onChange={(event) => setForm({ ...form, preferredBrand: event.target.value })} />
      </label>
      <label>
        OEM number checked
        <input value={form.oemNumberChecked} onChange={(event) => setForm({ ...form, oemNumberChecked: event.target.value })} />
      </label>
      <label>
        Aftermarket part used
        <input
          value={form.aftermarketPartUsed}
          onChange={(event) => setForm({ ...form, aftermarketPartUsed: event.target.value })}
        />
      </label>
      <label>
        Shop link
        <input inputMode="url" value={form.shopLink} onChange={(event) => setForm({ ...form, shopLink: event.target.value })} />
      </label>
      <label>
        Personal note
        <textarea value={form.personalNote} onChange={(event) => setForm({ ...form, personalNote: event.target.value })} rows={3} />
      </label>
      {message ? <p className="form-success">{message}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
      <button className="secondary-button full-width-button" type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save parts notes"}
      </button>
    </form>
  );
}

export function MaintenanceDetail({
  itemId,
  profile,
  dueInfos,
  serviceRecords,
  localPartsNote,
  onSaveRecord,
  onSavePartsNote
}: MaintenanceDetailProps) {
  const dueInfo = dueInfos.find((info) => info.item.id === itemId);
  const [sheetOpen, setSheetOpen] = useState(false);

  const itemRecords = useMemo(
    () =>
      serviceRecords
        .filter((record) => record.itemId === itemId)
        .sort((a, b) => b.performedDate.localeCompare(a.performedDate)),
    [itemId, serviceRecords]
  );

  if (!dueInfo) {
    return (
      <main className="page">
        <button className="text-button" type="button" onClick={() => navigateTo("/maintenance")}>
          <ArrowLeft aria-hidden="true" size={18} />
          Back
        </button>
        <p>This maintenance item is no longer in the active database. Any saved local record stays in your backup data.</p>
      </main>
    );
  }

  const item = dueInfo.item;
  const itemParts = getPartsAndFluids(item);
  const practicalNotes = getPracticalNotes(item);
  const latestRecord = itemRecords[0];
  const showVehicleCheck = needsVehicleCheck(item, itemParts);

  return (
    <main className="page">
      <button className="text-button" type="button" onClick={() => navigateTo("/maintenance")}>
        <ArrowLeft aria-hidden="true" size={18} />
        Back
      </button>

      <section className="detail-hero">
        <div className="detail-hero__title">
          <p className="eyebrow">{item.system}</p>
          <h1>{item.name}</h1>
        </div>
        <StatusBadge status={dueInfo.status} />
        <button className="primary-button" type="button" onClick={() => setSheetOpen(true)}>
          <CheckCircle2 aria-hidden="true" size={20} />
          Mark as done
        </button>
      </section>

      {showVehicleCheck ? (
        <div className="warning-band">
          <AlertTriangle aria-hidden="true" />
          <div>
            <strong>Check on vehicle</strong>
            <p>Confirm this value on the vehicle or during the first service before ordering parts.</p>
          </div>
        </div>
      ) : null}

      <section className="section-block detail-card">
        <h2>Status</h2>
        <dl className="detail-grid">
          <DetailRow label="Current status" value={<StatusBadge status={dueInfo.status} />} />
          <DetailRow label="Next due km" value={dueInfo.dueKm ? formatKm(dueInfo.dueKm) : null} />
          <DetailRow label="Next due date" value={dueInfo.dueDate ? formatDate(dueInfo.dueDate) : null} />
          <DetailRow
            label="Last service record"
            value={
              latestRecord
                ? `${formatDate(latestRecord.performedDate)} at ${formatKm(latestRecord.performedOdometerKm)}`
                : "No service record yet"
            }
          />
        </dl>
      </section>

      <section className="section-block detail-card">
        <h2>Interval</h2>
        <dl className="detail-grid">
          <DetailRow label="Recommended interval" value={formatInterval(item.preventiveIntervalKm, item.preventiveIntervalMonths)} />
          <DetailRow label="Official interval" value={formatInterval(item.officialIntervalKm, item.officialIntervalMonths)} />
          {(item.conditionBased || dueInfo.status === "conditionBased") ? (
            <DetailRow label="Condition-based" value="Use inspection, symptoms, or first-service findings." />
          ) : null}
          <DetailRow label="Action" value={item.action} />
          <DetailRow label="Priority" value={item.priority} />
          <DetailRow label="Difficulty" value={item.difficulty} />
        </dl>
      </section>

      <section className="section-block detail-card">
        <h2>Parts and fluids</h2>
        <PartsAndFluids rows={itemParts} />
      </section>

      <section className="section-block detail-card">
        <h2>Notes</h2>
        {practicalNotes.length ? (
          <ul className="notes-list">
            {practicalNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No practical notes saved for this item yet.</p>
        )}
      </section>

      <section className="section-block detail-card">
        <h2>My parts notes</h2>
        <PartsNotesForm itemId={item.id} currentNote={localPartsNote} onSave={onSavePartsNote} />
      </section>

      <section className="section-block detail-card">
        <div className="section-heading">
          <h2>Service history</h2>
          <span className="muted">{itemRecords.length} records</span>
        </div>

        {itemRecords.length ? (
          <div className="history-list">
            {itemRecords.map((record) => (
              <article className="history-card" key={record.id}>
                <strong>{formatDate(record.performedDate)}</strong>
                <span>{formatKm(record.performedOdometerKm)}</span>
                {record.partsUsed ? <p>{record.partsUsed}</p> : null}
                {record.note ? <p className="muted">{record.note}</p> : null}
                {record.verificationValue ? <p className="verification-value">{record.verificationValue}</p> : null}
                {record.cost !== null ? <p className="muted">Cost: {record.cost}</p> : null}
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">No service records saved for this item yet.</p>
        )}
      </section>

      {sheetOpen ? (
        <MarkDoneSheet item={item} profile={profile} onClose={() => setSheetOpen(false)} onSave={onSaveRecord} />
      ) : null}
    </main>
  );
}
