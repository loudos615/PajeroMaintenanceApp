import { useEffect, useMemo, useState } from "react";

export interface HashRoute {
  name: string;
  params: string[];
  query: URLSearchParams;
  path: string;
}

function readRoute(): HashRoute {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [pathPart, queryPart = ""] = raw.split("?");
  const normalizedPath = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
  const parts = normalizedPath.split("/").filter(Boolean);

  return {
    name: parts[0] ?? "dashboard",
    params: parts.slice(1),
    query: new URLSearchParams(queryPart),
    path: normalizedPath
  };
}

export function useHashRoute() {
  const [route, setRoute] = useState<HashRoute>(() => readRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return useMemo(() => route, [route]);
}

export function navigateTo(path: string) {
  window.location.hash = path.startsWith("/") ? path : `/${path}`;
}
