export type GstMode = "inclusive" | "exclusive";

export interface GstResult {
  gstAmount: number;
  taxableAmount: number;
  finalAmount: number;
}

export function calculateGst(
  amount: number,
  rate: number,
  mode: GstMode
): GstResult {
  const rateFactor = rate / 100;

  if (mode === "exclusive") {
    const taxableAmount = amount;
    const gstAmount = taxableAmount * rateFactor;
    const finalAmount = taxableAmount + gstAmount;
    return { gstAmount, taxableAmount, finalAmount };
  }

  const finalAmount = amount;
  const taxableAmount = finalAmount / (1 + rateFactor);
  const gstAmount = finalAmount - taxableAmount;
  return { gstAmount, taxableAmount, finalAmount };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function parseAmountInput(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;

  const normalized = trimmed.replace(/,/g, "");
  if (!/^\d+(\.\d{0,2})?$/.test(normalized)) return null;

  const value = Number(normalized);
  if (!Number.isFinite(value) || value < 0) return null;

  return value;
}

export function validateAmount(raw: string): string | null {
  const trimmed = raw.trim();
  if (trimmed === "") return "Please enter an amount.";

  const normalized = trimmed.replace(/,/g, "");
  if (!/^\d+(\.\d*)?$/.test(normalized)) {
    return "Enter a valid number (up to 2 decimal places).";
  }

  const parts = normalized.split(".");
  if (parts[1] && parts[1].length > 2) {
    return "Amount can have at most 2 decimal places.";
  }

  const value = Number(normalized);
  if (value <= 0) return "Amount must be greater than zero.";
  if (value > 999_999_999_999) return "Amount is too large.";

  return null;
}

export function parseRateInput(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;

  const normalized = trimmed.replace(/,/g, "");
  if (!/^\d+(\.\d{0,2})?$/.test(normalized)) return null;

  const value = Number(normalized);
  if (!Number.isFinite(value) || value < 0) return null;

  return value;
}

export function validateRate(raw: string): string | null {
  const trimmed = raw.trim();
  if (trimmed === "") return "Please enter a GST rate.";

  const normalized = trimmed.replace(/,/g, "");
  if (!/^\d+(\.\d*)?$/.test(normalized)) {
    return "Enter a valid percentage (up to 2 decimal places).";
  }

  const parts = normalized.split(".");
  if (parts[1] && parts[1].length > 2) {
    return "Rate can have at most 2 decimal places.";
  }

  const value = Number(normalized);
  if (value <= 0) return "GST rate must be greater than zero.";
  if (value > 100) return "GST rate cannot exceed 100%.";

  return null;
}

export function formatResultSummary(
  result: GstResult,
  rate: number,
  mode: GstMode
): string {
  const modeLabel = mode === "inclusive" ? "Inclusive" : "Exclusive";
  return [
    `Smart GST Calculator Result`,
    `Mode: ${modeLabel} | Rate: ${rate}%`,
    `Taxable Amount: ${formatCurrency(result.taxableAmount)}`,
    `GST Amount: ${formatCurrency(result.gstAmount)}`,
    `Final Amount: ${formatCurrency(result.finalAmount)}`,
  ].join("\n");
}
