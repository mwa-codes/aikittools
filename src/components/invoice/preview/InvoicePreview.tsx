"use client";

import { getInvoiceTotals, getLineItemTotal } from "@/lib/invoice/calculations";
import { formatCurrency } from "@/lib/invoice/formatters";
import type { InvoiceFormData } from "@/types/invoice";

interface InvoicePreviewProps {
  data: InvoiceFormData;
}

function getPaymentTermsLabel(data: InvoiceFormData) {
  if (data.paymentTerms === "CUSTOM") return data.customPaymentTerms || "Custom";
  const days = data.paymentTerms.split("_")[1];
  return days ? `Net ${days}` : data.paymentTerms;
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const totals = getInvoiceTotals(data);
  const termsLabel = getPaymentTermsLabel(data);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm text-gray-800">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          {data.logoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.logoDataUrl}
              alt="Business logo"
              className="h-14 max-w-[100px] object-contain rounded"
            />
          ) : (
            <div className="h-14 w-24 rounded border border-dashed border-gray-300 text-xs text-gray-400 grid place-items-center">
              No Logo
            </div>
          )}
          <p className="text-2xl font-bold tracking-tight text-gray-900">INVOICE</p>
        </div>
        <div className="text-left sm:text-right text-sm leading-relaxed">
          <p className="font-semibold text-gray-900">{data.from.name || "Business Name"}</p>
          <p className="whitespace-pre-line text-gray-600">{data.from.address || "Business address"}</p>
          <p className="text-gray-600">{data.from.email || "email@example.com"}</p>
          <p className="text-gray-600">{data.from.phone || "+00 000 0000000"}</p>
        </div>
      </div>

      {/* Bill to + invoice details */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 text-sm leading-relaxed">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Bill To</p>
          <p className="font-semibold text-gray-900">{data.to.name || "Client name"}</p>
          <p className="text-gray-600">{data.to.email || "client@email.com"}</p>
          <p className="whitespace-pre-line text-gray-600">{data.to.address || "Client address"}</p>
        </div>
        <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 text-sm text-left sm:text-right leading-relaxed">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Invoice Details</p>
          <p><span className="text-gray-500">Invoice #:</span> {data.invoiceNumber || "-"}</p>
          <p><span className="text-gray-500">Issue Date:</span> {data.issueDate || "-"}</p>
          <p><span className="text-gray-500">Due Date:</span> {data.dueDate || "-"}</p>
          <p><span className="text-gray-500">Terms:</span> {termsLabel}</p>
          <p><span className="text-gray-500">Currency:</span> {data.currency}</p>
        </div>
      </div>

      {/* Line items table */}
      <div className="mt-5 overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-3 py-2">Description</th>
              <th className="px-3 py-2">Qty</th>
              <th className="px-3 py-2">Unit Price</th>
              <th className="px-3 py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item, idx) => (
              <tr
                key={item.id}
                className={`border-b border-gray-100 ${idx % 2 !== 0 ? "bg-gray-50/50" : "bg-white"}`}
              >
                <td className="px-3 py-2">{item.description || "Untitled item"}</td>
                <td className="px-3 py-2 tabular-nums">{item.quantity}</td>
                <td className="px-3 py-2 tabular-nums">{formatCurrency(item.unitPrice, data.currency)}</td>
                <td className="px-3 py-2 text-right tabular-nums font-medium">
                  {formatCurrency(getLineItemTotal(item), data.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals block */}
      <div className="mt-5 flex justify-end">
        <div className="w-full max-w-[280px] space-y-1.5 text-sm">
          <PreviewTotalRow label="Subtotal" value={formatCurrency(totals.subtotal, data.currency)} />
          {totals.discountAmount > 0 && (
            <PreviewTotalRow
              label="Discount"
              value={`-${formatCurrency(totals.discountAmount, data.currency)}`}
              muted
            />
          )}
          {totals.taxAmount > 0 && (
            <PreviewTotalRow
              label={`${data.tax.label || "Tax"} (${data.tax.rate}%)`}
              value={formatCurrency(totals.taxAmount, data.currency)}
            />
          )}
          {totals.previousBalance > 0 && (
            <PreviewTotalRow
              label="Previous Balance"
              value={formatCurrency(totals.previousBalance, data.currency)}
            />
          )}
          <div className="border-t-2 border-gray-300 pt-2">
            <PreviewTotalRow
              label="Total Due"
              value={formatCurrency(totals.total, data.currency)}
              bold
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      {(data.notes.trim()) && (
        <div className="mt-6 rounded-lg bg-gray-50 border border-gray-100 p-3 text-sm text-gray-700">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Notes / Terms</p>
          <p className="whitespace-pre-line">{data.notes}</p>
        </div>
      )}
      {!data.notes.trim() && (
        <div className="mt-6 rounded-lg border border-dashed border-gray-200 p-3 text-sm text-gray-400 italic">
          Notes and payment terms will appear here.
        </div>
      )}
    </div>
  );
}

function PreviewTotalRow({
  label,
  value,
  bold,
  muted,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex justify-between gap-3 ${bold ? "font-semibold text-base text-gray-900" : ""} ${muted ? "text-gray-500" : ""}`}
    >
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
