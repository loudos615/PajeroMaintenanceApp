import { useEffect, useMemo, useState } from "react";
import { MaintenanceCard } from "../components/MaintenanceCard";
import { navigateTo } from "../hooks/useHashRoute";
import { SYSTEM_ORDER, type DueInfo, type DueStatus, type ServiceRecord } from "../types";
import { dueStatusRank, formatDate, formatKm, priorityRank } from "../utils/format";

type FilterKey = "all" | "overdue" | "dueSoon" | "baselineDueNow" | "ok" | "conditionBased";
type SortKey = "database" | "urgency";

const FILTERS: Array<{ key: FilterKey; label: string; status?: DueStatus }> = [
  { key: "all", label: "All" },
  { key: "overdue", label: "Overdue", status: "overdue" },
  { key: "dueSoon", label: "Due soon", status: "dueSoon" },
  { key: "baselineDueNow", label: "Due now", status: "baselineDueNow" },
  { key: "ok", label: "OK", status: "ok" },
  { key: "conditionBased", label: "Condition based", status: "conditionBased" }
];

const SORTS: Array<{ key: SortKey; label: string }> = [
  { key: "database", label: "Database order" },
  { key: "urgency", label: "Urgency" }
];

const LEGACY_BRAKE_ITEM_ID = "brakes_pads_and_discs_inspect";
const MAINTENANCE_LIST_STATE_KEY = "pajero-maintenance-list-state";
export const MAINTENANCE_LIST_RESTORE_KEY = "pajero-maintenance-list-restore";

interface MaintenanceListState {
  filter: FilterKey;
  searchText: string;
  sort: SortKey;
  scrollY: number;
}

interface MaintenanceListProps {
  dueInfos: DueInfo[];
  serviceRecords: ServiceRecord[];
}

function isRestorePending(): boolean {
  return sessionStorage.getItem(MAINTENANCE_LIST_RESTORE_KEY) === "1";
}

function readSavedState(): MaintenanceListState | null {
  try {
    const raw = sessionStorage.getItem(MAINTENANCE_LIST_STATE_KEY);
    return raw ? (JSON.parse(raw) as MaintenanceListState) : null;
  } catch {
    return null;
  }
}

function writeSavedState(state: MaintenanceListState) {
  sessionStorage.setItem(MAINTENANCE_LIST_STATE_KEY, JSON.stringify(state));
}

function defaultListState(): MaintenanceListState {
  return {
    filter: "all",
    searchText: "",
    sort: "database",
    scrollY: 0
  };
}

function initialListState(): MaintenanceListState {
  return isRestorePending() ? { ...defaultListState(), ...readSavedState() } : defaultListState();
}

function matchesSearch(info: DueInfo, searchText: string): boolean {
  const query = searchText.trim().toLowerCase();
  if (!query) return true;
  return [info.item.name, info.item.action, info.item.system, info.item.priority]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(query));
}

function sortDueInfos(items: DueInfo[], sort: SortKey, indexById: Map<string, number>): DueInfo[] {
  return [...items].sort((a, b) => {
    const originalOrder = (indexById.get(a.item.id) ?? 0) - (indexById.get(b.item.id) ?? 0);
    if (sort === "database") return originalOrder;
    return dueStatusRank(a.status) - dueStatusRank(b.status) || priorityRank(a.item) - priorityRank(b.item) || originalOrder;
  });
}

function LegacyBrakeRecords({ records }: { records: ServiceRecord[] }) {
  if (!records.length) return null;
  return (
    <section className="section-block">
      <div className="section-heading">
        <h2>Legacy records</h2>
        <span className="muted">{records.length} records</span>
      </div>
      <div className="history-list">
        {records.map((record) => (
          <article className="history-card" key={record.id}>
            <div className="history-card__topline">
              <strong>Legacy brake pads/discs record</strong>
              <span className="muted">{formatDate(record.performedDate)}</span>
            </div>
            <span>{formatKm(record.performedOdometerKm)}</span>
            {record.partsUsed ? <p>{record.partsUsed}</p> : null}
            {record.note ? <p className="muted">{record.note}</p> : null}
            {record.verificationValue ? <p className="verification-value">{record.verificationValue}</p> : null}
            {record.cost !== null ? <p className="muted">Cost: {record.cost}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export function MaintenanceList({ dueInfos, serviceRecords }: MaintenanceListProps) {
  const [state, setState] = useState<MaintenanceListState>(() => initialListState());
  const { filter, searchText, sort } = state;

  useEffect(() => {
    if (!isRestorePending()) return;
    const saved = readSavedState();
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: saved?.scrollY ?? 0, left: 0, behavior: "auto" });
        sessionStorage.removeItem(MAINTENANCE_LIST_RESTORE_KEY);
      });
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  const grouped = useMemo(() => {
    const indexById = new Map(dueInfos.map((info, index) => [info.item.id, index]));
    const filtered = sortDueInfos(
      dueInfos
        .filter((info) => {
          const selected = FILTERS.find((item) => item.key === filter);
          return !selected?.status || info.status === selected.status;
        })
        .filter((info) => matchesSearch(info, searchText)),
      sort,
      indexById
    );

    return SYSTEM_ORDER.map((system) => ({
      system,
      items: filtered.filter((info) => info.item.system === system)
    })).filter((group) => group.items.length > 0);
  }, [dueInfos, filter, searchText, sort]);

  const legacyBrakeRecords = useMemo(
    () =>
      serviceRecords
        .filter((record) => record.itemId === LEGACY_BRAKE_ITEM_ID)
        .sort((a, b) => b.performedDate.localeCompare(a.performedDate)),
    [serviceRecords]
  );

  function updateState(nextState: Partial<MaintenanceListState>) {
    setState((current) => ({ ...current, ...nextState }));
  }

  function openDetail(itemId: string) {
    writeSavedState({ ...state, scrollY: window.scrollY });
    sessionStorage.setItem(MAINTENANCE_LIST_RESTORE_KEY, "1");
    navigateTo(`/item/${itemId}`);
  }

  return (
    <main className="page">
      <section className="section-block">
        <p className="eyebrow">Service database</p>
        <h1>Maintenance</h1>
        <div className="list-controls">
          <label className="search-field">
            <span>Search</span>
            <input
              type="search"
              value={searchText}
              onChange={(event) => updateState({ searchText: event.target.value })}
              placeholder="Filter maintenance items"
            />
          </label>
          <div>
            <span className="control-label">Sort</span>
            <div className="filter-row" role="tablist" aria-label="Maintenance sort">
              {SORTS.map((item) => (
                <button
                  key={item.key}
                  className={sort === item.key ? "chip chip--active" : "chip"}
                  type="button"
                  onClick={() => updateState({ sort: item.key })}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="filter-row" role="tablist" aria-label="Maintenance filters">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              className={filter === item.key ? "chip chip--active" : "chip"}
              type="button"
              onClick={() => updateState({ filter: item.key })}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {grouped.map((group) => (
        <section className="section-block" key={group.system}>
          <div className="section-heading">
            <h2>{group.system}</h2>
            <span className="muted">{group.items.length} items</span>
          </div>
          <div className="card-list">
            {group.items.map((info) => (
              <MaintenanceCard key={info.item.id} dueInfo={info} onOpen={() => openDetail(info.item.id)} />
            ))}
          </div>
        </section>
      ))}

      <LegacyBrakeRecords records={legacyBrakeRecords} />
    </main>
  );
}
