import type { CurrencyCode } from "@/types/invoice";

export function formatCurrency(value: number, currency: CurrencyCode) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export function normalizeNumberInput(value: string, allowDecimal: boolean) {
  const cleaned = allowDecimal ? value.replace(/[^\d.]/g, "") : value.replace(/[^\d]/g, "");
  if (!allowDecimal) {
    return cleaned.replace(/^0+(?=\d)/, "");
  }

  const [intPart = "", ...decimalParts] = cleaned.split(".");
  const decimal = decimalParts.join("");
  const safeInt = intPart.replace(/^0+(?=\d)/, "");
  return decimal ? `${safeInt || "0"}.${decimal}` : safeInt;
}

export function toIsoDateString(date: Date) {
  return date.toISOString().split("T")[0];
}
