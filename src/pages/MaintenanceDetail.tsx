import { AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";
import { MarkDoneSheet } from "../components/MarkDoneSheet";
import { StatusBadge } from "../components/StatusBadge";
import { navigateTo } from "../hooks/useHashRoute";
import type { DueInfo, MaintenanceItem, ServiceRecord, VehicleProfile } from "../types";
import { formatDate, formatInterval, formatKm } from "../utils/format";

interface MaintenanceDetailProps {
  itemId: string;
  profile: VehicleProfile;
  dueInfos: DueInfo[];
  serviceRecords: ServiceRecord[];
  onSaveRecord: (record: ServiceRecord) => Promise<void>;
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="detail-row">
      <dt>{label}</dt>
      <dd>{value || "Not set"}</dd>
    </div>
  );
}

function PartsList({ item }: { item: MaintenanceItem }) {
  if (!item.parts?.length) return <span>Not set</span>;
  return (
    <ul className="inline-list">
      {item.parts.map((part) => (
        <li key={part}>{part}</li>
      ))}
    </ul>
  );
}

export function MaintenanceDetail({ itemId, profile, dueInfos, serviceRecords, onSaveRecord }: MaintenanceDetailProps) {
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
        <p>Maintenance item not found.</p>
      </main>
    );
  }

  const item = dueInfo.item;

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

      {item.verificationRequired ? (
        <div className="warning-band">
          <AlertTriangle aria-hidden="true" />
          <span>Verification required on this exact vehicle before hard-coding the value.</span>
        </div>
      ) : null}

      <section className="section-block">
        <h2>Details</h2>
        <dl className="detail-grid">
          <DetailRow label="Action" value={item.action} />
          <DetailRow label="Priority" value={item.priority} />
          <DetailRow label="Difficulty" value={item.difficulty} />
          <DetailRow label="Preventive interval" value={formatInterval(item.preventiveIntervalKm, item.preventiveIntervalMonths)} />
          <DetailRow label="Official interval" value={formatInterval(item.officialIntervalKm, item.officialIntervalMonths)} />
          <DetailRow label="Next due km" value={dueInfo.dueKm ? formatKm(dueInfo.dueKm) : "Not set"} />
          <DetailRow label="Next due date" value={dueInfo.dueDate ? formatDate(dueInfo.dueDate) : "Not set"} />
          <DetailRow label="Parts needed" value={<PartsList item={item} />} />
          <DetailRow label="Fluid specification" value={item.fluidSpec} />
          <DetailRow label="Symptoms if neglected" value={item.symptomsIfNeglected} />
          <DetailRow label="Notes" value={item.notes} />
          <DetailRow label="Source type" value={item.sourceType} />
          <DetailRow label="Source keys" value={item.sourceKeys.join(", ")} />
        </dl>
      </section>

      <section className="section-block">
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
