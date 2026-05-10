import { useMemo, useState } from "react";
import { MaintenanceCard } from "../components/MaintenanceCard";
import { navigateTo } from "../hooks/useHashRoute";
import { SYSTEM_ORDER, type DueInfo, type DueStatus } from "../types";
import { dueStatusRank, priorityRank } from "../utils/format";

type FilterKey = "all" | "overdue" | "dueSoon" | "baselineDueNow" | "ok" | "conditionBased";

const FILTERS: Array<{ key: FilterKey; label: string; status?: DueStatus }> = [
  { key: "all", label: "All" },
  { key: "overdue", label: "Overdue", status: "overdue" },
  { key: "dueSoon", label: "Due soon", status: "dueSoon" },
  { key: "baselineDueNow", label: "Due now", status: "baselineDueNow" },
  { key: "ok", label: "OK", status: "ok" },
  { key: "conditionBased", label: "Condition based", status: "conditionBased" }
];

interface MaintenanceListProps {
  dueInfos: DueInfo[];
}

export function MaintenanceList({ dueInfos }: MaintenanceListProps) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const grouped = useMemo(() => {
    const filtered = dueInfos
      .filter((info) => {
        const selected = FILTERS.find((item) => item.key === filter);
        return !selected?.status || info.status === selected.status;
      })
      .sort((a, b) => dueStatusRank(a.status) - dueStatusRank(b.status) || priorityRank(a.item) - priorityRank(b.item));

    return SYSTEM_ORDER.map((system) => ({
      system,
      items: filtered.filter((info) => info.item.system === system)
    })).filter((group) => group.items.length > 0);
  }, [dueInfos, filter]);

  return (
    <main className="page">
      <section className="section-block">
        <p className="eyebrow">Service database</p>
        <h1>Maintenance</h1>
        <div className="filter-row" role="tablist" aria-label="Maintenance filters">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              className={filter === item.key ? "chip chip--active" : "chip"}
              type="button"
              onClick={() => setFilter(item.key)}
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
              <MaintenanceCard key={info.item.id} dueInfo={info} onOpen={() => navigateTo(`/item/${info.item.id}`)} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
