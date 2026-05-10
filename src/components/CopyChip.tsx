import { copyToClipboard } from "../utils/clipboard";

interface CopyChipProps {
  value: string;
  label?: string;
  ariaLabel: string;
  onCopied: (value: string) => void;
}

export function CopyChip({ value, label, ariaLabel, onCopied }: CopyChipProps) {
  async function handleClick() {
    await copyToClipboard(value);
    onCopied(value);
  }

  return (
    <button className="copy-chip" type="button" onClick={() => void handleClick()} aria-label={ariaLabel}>
      {label ?? value}
    </button>
  );
}
