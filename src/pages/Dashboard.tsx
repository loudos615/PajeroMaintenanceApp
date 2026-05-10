import { differenceInCalendarDays, parseISO } from "date-fns";
import { Camera, Gauge, PenLine } from "lucide-react";
import { MaintenanceCard } from "../components/MaintenanceCard";
import { navigateTo } from "../hooks/useHashRoute";
import type { DueInfo, OdometerReading, VehicleProfile } from "../types";
import { dueStatusRank, formatDate, formatKm, priorityRank } from "../utils/format";

interface DashboardProps {
  profile: VehicleProfile;
  dueInfos: DueInfo[];
  odometerReadings: OdometerReading[];
  onDismissOdometerReminder: () => Promise<void>;
}

function getLastOdometerReading(readings: OdometerReading[]): OdometerReading | null {
  return [...readings].sort((a, b) => b.date.localeCompare(a.date))[0] ?? null;
}

function shouldShowOdometerReminder(profile: VehicleProfile, readings: OdometerReading[]): boolean {
  const dismissedAt = profile.odometerReminderDismissedAt;
  const today = new Date();

  if (dismissedAt && differenceInCalendarDays(today, parseISO(dismissedAt)) < 7) {
    return false;
  }

  const lastReading = getLastOdometerReading(readings);
  const baselineDate = lastReading?.date ?? profile.purchaseDate;
  if (!baselineDate) return false;

  return differenceInCalendarDays(today, parseISO(baselineDate)) > 30;
}

export function Dashboard({ profile, dueInfos, odometerReadings, onDismissOdometerReminder }: DashboardProps) {
  const overdueCount = dueInfos.filter((info) => info.status === "overdue").length;
  const dueSoonCount = dueInfos.filter((info) => info.status === "dueSoon").length;
  const baselineCount = dueInfos.filter((info) => info.status === "baselineDueNow").length;
  const lastReading = getLastOdometerReading(odometerReadings);
  const lastUpdatedDate = lastReading?.date ?? profile.purchaseDate;
  const showReminder = shouldShowOdometerReminder(profile, odometerReadings);
  const urgentItems = [...dueInfos]
    .sort((a, b) => dueStatusRank(a.status) - dueStatusRank(b.status) || priorityRank(a.item) - priorityRank(b.item))
    .slice(0, 6);

  return (
    <main className="page">
      <section className="vehicle-hero">
        <h1>Mitsubishi Pajero</h1>
      </section>

      {showReminder ? (
        <section className="reminder-banner">
          <div>
            <h2>Update odometer</h2>
            <p>Your Pajero odometer has not been updated for more than 30 days.</p>
          </div>
          <div className="button-grid">
            <button className="primary-button" type="button" onClick={() => navigateTo("/odometer?mode=manual")}>
              <PenLine aria-hidden="true" size={20} />
              Update manually
            </button>
            <button className="secondary-button" type="button" onClick={() => navigateTo("/odometer?mode=scan")}>
              <Camera aria-hidden="true" size={20} />
              Scan odometer
            </button>
            <button className="secondary-button" type="button" onClick={() => void onDismissOdometerReminder()}>
              Dismiss for 7 days
            </button>
          </div>
        </section>
      ) : null}

      <section className="odometer-card">
        <dl className="vehicle-facts">
          <div>
            <dt>Current odometer</dt>
            <dd>{formatKm(profile.currentOdometerKm)}</dd>
          </div>
          <div>
            <dt>Last updated</dt>
            <dd>{formatDate(lastUpdatedDate)}</dd>
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
          <p>Due now</p>
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
