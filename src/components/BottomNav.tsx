import { Gauge, ListChecks, Settings } from "lucide-react";
import { navigateTo } from "../hooks/useHashRoute";

interface BottomNavProps {
  active: string;
}

const items = [
  { path: "/", label: "Dashboard", icon: Gauge, key: "dashboard" },
  { path: "/maintenance", label: "Maintenance", icon: ListChecks, key: "maintenance" },
  { path: "/settings", label: "Settings", icon: Settings, key: "settings" }
];

export function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          active === item.key ||
          (item.key === "dashboard" && active === "dashboard") ||
          (item.key === "maintenance" && active === "item");

        return (
          <button
            className={isActive ? "bottom-nav__button bottom-nav__button--active" : "bottom-nav__button"}
            key={item.path}
            type="button"
            onClick={() => navigateTo(item.path)}
          >
            <Icon aria-hidden="true" size={22} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
