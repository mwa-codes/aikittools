const STORAGE_KEY = "aikittools-invoice-sequence";

export function getSuggestedInvoiceNumber() {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `INV-${datePart}-001`;
}

export function getNextStoredInvoiceNumber() {
  if (typeof window === "undefined") return getSuggestedInvoiceNumber();

  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const stored = window.localStorage.getItem(STORAGE_KEY);
  const current = stored ? Number(stored) : 0;
  const next = Number.isNaN(current) ? 1 : current + 1;
  window.localStorage.setItem(STORAGE_KEY, String(next));
  const padded = String(next).padStart(3, "0");
  return `INV-${datePart}-${padded}`;
}
