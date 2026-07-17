import { BRAND } from "@/lib/site-config";

/** Multiply ledger USD for public UI. Share prices and % stay unscaled. */
export function scaleUsd(amount: number): number {
  return amount * BRAND.displayUsdScale;
}

/** Format a ledger USD amount (NAV, size, cash) with display scale. */
export function formatLedgerUsd(
  amount: number,
  opts?: { digits?: number; signed?: boolean },
): string {
  const digits = opts?.digits ?? 0;
  const scaled = scaleUsd(amount);
  const abs = Math.abs(scaled).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  if (opts?.signed) {
    const sign = scaled > 0 ? "+" : scaled < 0 ? "-" : "";
    return `${sign}$${abs}`;
  }
  return `$${abs}`;
}

/** Starting NAV as shown in the UI. */
export function displayStartingNav(): number {
  return scaleUsd(BRAND.startingNav);
}

export function formatStartingNav(): string {
  return formatLedgerUsd(BRAND.startingNav, { digits: 0 });
}
