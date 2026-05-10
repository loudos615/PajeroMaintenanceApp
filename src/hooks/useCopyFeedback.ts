import { useEffect, useState } from "react";

export function useCopyFeedback() {
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!copyMessage) return;
    const timer = window.setTimeout(() => setCopyMessage(null), 1500);
    return () => window.clearTimeout(timer);
  }, [copyMessage]);

  return { copyMessage, setCopyMessage };
}
