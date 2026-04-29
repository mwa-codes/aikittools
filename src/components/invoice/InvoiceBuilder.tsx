"use client";

import { useEffect, useMemo, type ReactNode, type FocusEvent, type MouseEvent } from "react";
import InvoicePreview from "@/components/invoice/preview/InvoicePreview";
import { getInvoiceTotals, getLineItemTotal } from "@/lib/invoice/calculations";
import { CURRENCY_OPTIONS, PAYMENT_TERMS_OPTIONS } from "@/lib/invoice/constants";
import { formatCurrency } from "@/lib/invoice/formatters";
import { getNextStoredInvoiceNumber, getSuggestedInvoiceNumber } from "@/lib/invoice/invoice-number";
import { generateInvoicePdf } from "@/lib/invoice/pdf/generateInvoicePdf";
import { useInvoiceForm } from "@/lib/invoice/useInvoiceForm";
import type { DiscountType, PaymentTermsOption } from "@/types/invoice";

// Select-all on focus so typing replaces existing value instead of appending
function selectAll(e: FocusEvent<HTMLInputElement>) {
  requestAnimationFrame(() => e.target.select());
}

function keepSelection(e: MouseEvent<HTMLInputElement>) {
  e.preventDefault();
}

export default function InvoiceBuilder() {
  const initialInvoiceNumber = useMemo(() => getSuggestedInvoiceNumber(), []);
  const { data, actions } = useInvoiceForm(initialInvoiceNumber);
  const totals = getInvoiceTotals(data);

  useEffect(() => {
    actions.setField("invoiceNumber", getNextStoredInvoiceNumber());
  }, [actions]);

  function handleLogoUpload(file: File | null) {
    if (!file) { actions.setLogo(null); return; }
    const reader = new FileReader();
    reader.onload = () => {
      actions.setLogo(typeof reader.result === "string" ? reader.result : null);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-xl border border-blue-100 bg-linear-to-r from-blue-50 to-indigo-50 px-4 py-3 text-sm text-blue-800">
        Build professional invoices and download as PDF instantly — no account required.
      </div>

      <div className="flex flex-col xl:flex-row gap-6">

        {/* ────────── LEFT: Form ────────── */}
        <div className="min-w-0 xl:w-[62%] space-y-5">

          {/* FROM */}
          <Card title="From — Your Business">
            <Grid2>
              <Field label="Business Name">
                <Input value={data.from.name} onChange={(v) => actions.setPartyField("from", "name", v)} placeholder="Acme Studio" />
              </Field>
              <Field label="Email">
                <Input type="email" value={data.from.email} onChange={(v) => actions.setPartyField("from", "email", v)} placeholder="hello@acme.com" />
              </Field>
              <Field label="Phone">
                <Input value={data.from.phone ?? ""} onChange={(v) => actions.setPartyField("from", "phone", v)} placeholder="+1 555 0100" />
              </Field>
              <Field label="Logo (optional)">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e.target.files?.[0] ?? null)}
                  className={INPUT_CLS}
                />
                {data.logoDataUrl && (
                  <button type="button" onClick={() => actions.setLogo(null)} className="mt-1 text-xs text-red-500 hover:underline">
                    Remove logo
                  </button>
                )}
              </Field>
              <Field label="Business Address" wide>
                <textarea rows={2} value={data.from.address} onChange={(e) => actions.setPartyField("from", "address", e.target.value)} placeholder="Street, City, Country" className={TEXTAREA_CLS} />
              </Field>
            </Grid2>
          </Card>

          {/* TO */}
          <Card title="To — Client">
            <Grid2>
              <Field label="Client Name">
                <Input value={data.to.name} onChange={(v) => actions.setPartyField("to", "name", v)} placeholder="Client Name" />
              </Field>
              <Field label="Client Email">
                <Input type="email" value={data.to.email} onChange={(v) => actions.setPartyField("to", "email", v)} placeholder="client@email.com" />
              </Field>
              <Field label="Client Address" wide>
                <textarea rows={2} value={data.to.address} onChange={(e) => actions.setPartyField("to", "address", e.target.value)} placeholder="Client address" className={TEXTAREA_CLS} />
              </Field>
            </Grid2>
          </Card>

          {/* INVOICE DETAILS */}
          <Card title="Invoice Details">
            <Grid2>
              <Field label="Invoice Number">
                <Input value={data.invoiceNumber} onChange={(v) => actions.setField("invoiceNumber", v)} />
              </Field>
              <Field label="Currency">
                <select value={data.currency} onChange={(e) => actions.setCurrency(e.target.value as typeof data.currency)} className={INPUT_CLS}>
                  {CURRENCY_OPTIONS.map((o) => <option key={o.code} value={o.code}>{o.label}</option>)}
                </select>
              </Field>
              <Field label="Issue Date">
                <Input type="date" value={data.issueDate} onChange={(v) => actions.setField("issueDate", v)} />
              </Field>
              <Field label="Due Date">
                <Input type="date" value={data.dueDate} onChange={(v) => actions.setField("dueDate", v)} />
              </Field>
              <Field label="Payment Terms">
                <select value={data.paymentTerms} onChange={(e) => actions.setPaymentTerms(e.target.value as PaymentTermsOption)} className={INPUT_CLS}>
                  {PAYMENT_TERMS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </Field>
              {data.paymentTerms === "CUSTOM" && (
                <Field label="Custom Terms">
                  <Input value={data.customPaymentTerms} onChange={(v) => actions.setField("customPaymentTerms", v)} placeholder="Due on receipt" />
                </Field>
              )}
              <Field label="Previous Balance (Optional)" wide>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={data.previousBalance}
                  onFocus={selectAll}
                  onMouseUp={keepSelection}
                  onChange={(e) => actions.setPreviousBalance(e.target.value)}
                  placeholder="0.00"
                  className={INPUT_CLS}
                />
                <p className="mt-1 text-xs text-gray-400">
                  If client has unpaid previous dues, add it here. It will be added to the new invoice total.
                </p>
              </Field>
            </Grid2>
          </Card>

          {/* LINE ITEMS */}
          <Card
            title="Line Items"
            action={
              <button onClick={actions.addLineItem} className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                + Add Row
              </button>
            }
          >
            {/* ── Desktop table (sm+) ── */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                <colgroup>
                  <col style={{ width: "44%" }} />
                  <col style={{ width: "12%" }} />
                  <col style={{ width: "22%" }} />
                  <col style={{ width: "16%" }} />
                  <col style={{ width: "6%" }} />
                </colgroup>
                <thead>
                  <tr className="border-y border-gray-200 bg-gray-50">
                    <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Description</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Qty</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Unit Price</th>
                    <th className="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Total</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data.lineItems.map((item, idx) => (
                    <tr key={item.id} className={`border-b border-gray-100 ${idx % 2 !== 0 ? "bg-gray-50/40" : "bg-white"}`}>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => actions.setLineItemField(item.id, "description", e.target.value)}
                          placeholder="Service or product"
                          className={INPUT_CLS}
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onFocus={selectAll}
                          onMouseUp={keepSelection}
                          onChange={(e) => {
                            const n = Math.max(1, Math.trunc(Number(e.target.value) || 1));
                            actions.setLineItemField(item.id, "quantity", String(n));
                          }}
                          className={INPUT_CLS}
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={item.unitPrice}
                          onFocus={selectAll}
                          onMouseUp={keepSelection}
                          onChange={(e) => {
                            const n = Math.max(0, Number(e.target.value) || 0);
                            actions.setLineItemField(item.id, "unitPrice", String(n));
                          }}
                          className={INPUT_CLS}
                        />
                      </td>
                      <td className="px-3 py-2 text-right font-semibold text-gray-800 tabular-nums whitespace-nowrap">
                        {formatCurrency(getLineItemTotal(item), data.currency)}
                      </td>
                      <td className="px-2 py-2 text-center">
                        <button
                          onClick={() => actions.removeLineItem(item.id)}
                          disabled={data.lineItems.length === 1}
                          title="Remove row"
                          className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-25 disabled:cursor-not-allowed transition-colors text-xl leading-none"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile card stack ── */}
            <div className="sm:hidden space-y-3">
              {data.lineItems.map((item, idx) => (
                <div key={item.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Item {idx + 1}</span>
                    <button onClick={() => actions.removeLineItem(item.id)} disabled={data.lineItems.length === 1} className="text-xs text-gray-400 hover:text-red-500 disabled:opacity-30">
                      Remove
                    </button>
                  </div>
                  <Field label="Description">
                    <input type="text" value={item.description} onChange={(e) => actions.setLineItemField(item.id, "description", e.target.value)} placeholder="Service or product" className={INPUT_CLS} />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Qty">
                      <input
                        type="number" min={1} value={item.quantity} onFocus={selectAll}
                        onMouseUp={keepSelection}
                        onChange={(e) => actions.setLineItemField(item.id, "quantity", String(Math.max(1, Math.trunc(Number(e.target.value) || 1))))}
                        className={INPUT_CLS}
                      />
                    </Field>
                    <Field label="Unit Price">
                      <input
                        type="number" min={0} step="0.01" value={item.unitPrice} onFocus={selectAll}
                        onMouseUp={keepSelection}
                        onChange={(e) => actions.setLineItemField(item.id, "unitPrice", String(Math.max(0, Number(e.target.value) || 0)))}
                        className={INPUT_CLS}
                      />
                    </Field>
                  </div>
                  <p className="text-right text-sm font-bold text-gray-800">
                    Total: {formatCurrency(getLineItemTotal(item), data.currency)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* TOTALS & ADJUSTMENTS */}
          <Card title="Totals & Adjustments">
            <Grid2>
              <Field label="Discount Type">
                <select value={data.discount.type} onChange={(e) => actions.setDiscountType(e.target.value as DiscountType)} className={INPUT_CLS}>
                  <option value="PERCENT">Percent (%)</option>
                  <option value="FIXED">Fixed Amount</option>
                </select>
              </Field>
              <Field label={data.discount.type === "PERCENT" ? "Discount (%)" : "Discount Amount"}>
                <input
                  type="number"
                  min={0}
                  value={data.discount.value}
                  onFocus={selectAll}
                  onMouseUp={keepSelection}
                  onChange={(e) => actions.setDiscountValue(e.target.value)}
                  className={INPUT_CLS}
                />
              </Field>
              <Field label="Tax Label (e.g. VAT, GST)">
                <Input value={data.tax.label} onChange={(v) => actions.setTaxLabel(v)} placeholder="VAT" />
              </Field>
              <Field label="Tax Rate (%)">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={data.tax.rate}
                  onFocus={selectAll}
                  onMouseUp={keepSelection}
                  onChange={(e) => actions.setTaxRate(e.target.value)}
                  className={INPUT_CLS}
                />
              </Field>
            </Grid2>

            {/* Totals summary card */}
            <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
              <div className="px-4 py-3 space-y-2 text-sm">
                <TotalsRow label="Subtotal" value={formatCurrency(totals.subtotal, data.currency)} />
                {totals.discountAmount > 0 && (
                  <TotalsRow label="Discount" value={`− ${formatCurrency(totals.discountAmount, data.currency)}`} dim />
                )}
                {totals.taxAmount > 0 && (
                  <TotalsRow label={`${data.tax.label || "Tax"} (${data.tax.rate}%)`} value={formatCurrency(totals.taxAmount, data.currency)} />
                )}
                {totals.previousBalance > 0 && (
                  <TotalsRow label="Previous Balance" value={formatCurrency(totals.previousBalance, data.currency)} />
                )}
              </div>
              <div className="border-t border-gray-200 bg-white px-4 py-3 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Total Due</span>
                <span className="text-base font-bold text-gray-900 tabular-nums">{formatCurrency(totals.total, data.currency)}</span>
              </div>
            </div>
          </Card>

          {/* NOTES */}
          <Card title="Notes / Terms">
            <textarea
              rows={4}
              value={data.notes}
              onChange={(e) => actions.setField("notes", e.target.value)}
              placeholder="Payment terms, bank details, or any notes for your client"
              className={TEXTAREA_CLS}
            />
          </Card>

          <div className="pb-2">
            <button
              onClick={() => generateInvoicePdf({ data })}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-xl shadow transition-colors"
            >
              ↓ Download Invoice PDF
            </button>
          </div>
        </div>

        {/* ────────── RIGHT: Live Preview ────────── */}
        <div className="xl:w-[38%] min-w-0">
          <div className="xl:sticky xl:top-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Live Preview
            </p>
            <InvoicePreview data={data} />
          </div>
        </div>

      </div>
    </div>
  );
}

/* ───────── Primitives ───────── */

function Card({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {action}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function Grid2({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">{children}</div>;
}

function Field({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Input({
  value, onChange, type = "text", placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "email" | "date";
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={INPUT_CLS}
    />
  );
}

function TotalsRow({ label, value, dim }: { label: string; value: string; dim?: boolean }) {
  return (
    <div className={`flex justify-between items-center gap-3 ${dim ? "text-gray-400" : "text-gray-600"}`}>
      <span>{label}</span>
      <span className="tabular-nums font-medium">{value}</span>
    </div>
  );
}

const INPUT_CLS =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-gray-400";

const TEXTAREA_CLS =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors resize-y focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-gray-400";
