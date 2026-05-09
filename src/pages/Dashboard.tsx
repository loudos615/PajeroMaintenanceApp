import { Camera, Gauge, PenLine } from "lucide-react";
import { MaintenanceCard } from "../components/MaintenanceCard";
import { navigateTo } from "../hooks/useHashRoute";
import type { DueInfo, VehicleProfile } from "../types";
import { dueStatusRank, formatKm, priorityRank } from "../utils/format";

interface DashboardProps {
  profile: VehicleProfile;
  dueInfos: DueInfo[];
}

export function Dashboard({ profile, dueInfos }: DashboardProps) {
  const overdueCount = dueInfos.filter((info) => info.status === "overdue").length;
  const dueSoonCount = dueInfos.filter((info) => info.status === "dueSoon").length;
  const baselineCount = dueInfos.filter((info) => info.status === "baselineDueNow").length;
  const urgentItems = [...dueInfos]
    .sort((a, b) => dueStatusRank(a.status) - dueStatusRank(b.status) || priorityRank(a.item) - priorityRank(b.item))
    .slice(0, 6);

  return (
    <main className="page">
      <section className="vehicle-hero">
        <p className="eyebrow">Private tracker</p>
        <h1>{profile.name}</h1>
        <dl className="vehicle-facts">
          <div>
            <dt>VIN</dt>
            <dd>{profile.vin}</dd>
          </div>
          <div>
            <dt>Current odometer</dt>
            <dd>{formatKm(profile.currentOdometerKm)}</dd>
          </div>
        </dl>
        <div className="button-grid">
          <button className="primary-button" type="button" onClick={() => navigateTo("/odometer?mode=manual")}>
            <PenLine aria-hidden="true" size={20} />
            Update manually
          </button>
          <button className="secondary-button" type="button" onClick={() => navigateTo("/odometer?mode=scan")}>
            <Camera aria-hidden="true" size={20} />
            Scan odometer
          </button>
        </div>
      </section>

      <section className="stats-grid" aria-label="Maintenance status">
        <div className="stat-card stat-card--danger">
          <span>{overdueCount}</span>
          <p>Overdue</p>
        </div>
        <div className="stat-card stat-card--warn">
          <span>{dueSoonCount}</span>
          <p>Due soon</p>
        </div>
        <div className="stat-card stat-card--baseline">
          <span>{baselineCount}</span>
          <p>Baseline</p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Most urgent</p>
            <h2>Next work</h2>
          </div>
          <button className="text-button" type="button" onClick={() => navigateTo("/maintenance")}>
            <Gauge aria-hidden="true" size={18} />
            All items
          </button>
        </div>

        <div className="card-list">
          {urgentItems.map((info) => (
            <MaintenanceCard key={info.item.id} dueInfo={info} onOpen={() => navigateTo(`/item/${info.item.id}`)} />
          ))}
        </div>
      </section>
    </main>
  );
}
