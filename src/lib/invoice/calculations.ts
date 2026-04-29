import type { InvoiceFormData, InvoiceLineItem } from "@/types/invoice";

export function getLineItemTotal(item: InvoiceLineItem) {
  return item.quantity * item.unitPrice;
}

export function getSubtotal(data: InvoiceFormData) {
  return data.lineItems.reduce((sum, item) => sum + getLineItemTotal(item), 0);
}

export function getDiscountAmount(data: InvoiceFormData, subtotal: number) {
  if (data.discount.value <= 0) return 0;
  if (data.discount.type === "PERCENT") {
    return (subtotal * data.discount.value) / 100;
  }
  return Math.min(data.discount.value, subtotal);
}

export function getTaxableAmount(subtotal: number, discountAmount: number) {
  return Math.max(0, subtotal - discountAmount);
}

export function getTaxAmount(data: InvoiceFormData, taxableAmount: number) {
  if (data.tax.rate <= 0) return 0;
  return (taxableAmount * data.tax.rate) / 100;
}

export function getGrandTotal(data: InvoiceFormData) {
  const subtotal = getSubtotal(data);
  const discountAmount = getDiscountAmount(data, subtotal);
  const taxableAmount = getTaxableAmount(subtotal, discountAmount);
  const taxAmount = getTaxAmount(data, taxableAmount);
  return subtotal - discountAmount + taxAmount;
}

export function getInvoiceTotals(data: InvoiceFormData) {
  const subtotal = getSubtotal(data);
  const discountAmount = getDiscountAmount(data, subtotal);
  const taxableAmount = getTaxableAmount(subtotal, discountAmount);
  const taxAmount = getTaxAmount(data, taxableAmount);
  const previousBalance = data.previousBalance || 0;
  const total = subtotal - discountAmount + taxAmount + previousBalance;
  return {
    subtotal,
    discountAmount,
    taxableAmount,
    taxAmount,
    previousBalance,
    total,
  };
}
