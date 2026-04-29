import { jsPDF } from "jspdf";
import { getInvoiceTotals, getLineItemTotal } from "@/lib/invoice/calculations";
import { formatCurrency } from "@/lib/invoice/formatters";
import type { InvoiceFormData } from "@/types/invoice";

interface GeneratePdfInput {
  data: InvoiceFormData;
}

const LEFT = 40;
const LINE_H = 13;
const SECTION_GAP = 22;

function getPaymentTermsLabel(data: InvoiceFormData) {
  if (data.paymentTerms === "CUSTOM") return data.customPaymentTerms || "Custom";
  if (data.paymentTerms === "DUE_ON_RECEIPT") return "Due on Receipt";
  const days = data.paymentTerms.split("_")[1];
  return days ? `Net ${days}` : data.paymentTerms;
}

function getImageFormat(dataUrl: string): "PNG" | "JPEG" {
  return dataUrl.startsWith("data:image/jpeg") || dataUrl.startsWith("data:image/jpg")
    ? "JPEG"
    : "PNG";
}


export function generateInvoicePdf({ data }: GeneratePdfInput) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const PAGE_W = doc.internal.pageSize.getWidth();
  const PAGE_H = doc.internal.pageSize.getHeight();
  const RIGHT = PAGE_W - LEFT;
  const CONTENT_W = RIGHT - LEFT;
  const DETAIL_RIGHT_X = RIGHT;
  const DETAIL_W = 230;

  let y = 44;

  /* ── HEADER ── */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(30, 30, 30);
  doc.text("INVOICE", LEFT, y);

  // Logo
  if (data.logoDataUrl) {
    try {
      const imageFormat = getImageFormat(data.logoDataUrl);
      const props = doc.getImageProperties(data.logoDataUrl);
      const maxLogoW = 110;
      const maxLogoH = 44;
      const scale = Math.min(maxLogoW / props.width, maxLogoH / props.height);
      const drawW = Math.max(1, props.width * scale);
      const drawH = Math.max(1, props.height * scale);
      doc.addImage(data.logoDataUrl, imageFormat, LEFT, y + 8, drawW, drawH);
    } catch {
      // skip
    }
  }

  // Business info — right side, wraps address
  doc.setFontSize(9);
  let bizY = y;
  doc.setFont("helvetica", "bold");
  doc.text(data.from.name || "Business Name", DETAIL_RIGHT_X, bizY, { align: "right", maxWidth: DETAIL_W });
  bizY += LINE_H;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  if (data.from.address) {
    const addrLines = doc.splitTextToSize(data.from.address, DETAIL_W);
    addrLines.forEach((line: string) => {
      doc.text(line, DETAIL_RIGHT_X, bizY, { align: "right" });
      bizY += LINE_H;
    });
  }
  if (data.from.email) {
    doc.text(data.from.email, DETAIL_RIGHT_X, bizY, { align: "right", maxWidth: DETAIL_W });
    bizY += LINE_H;
  }
  if (data.from.phone) {
    doc.text(data.from.phone, DETAIL_RIGHT_X, bizY, { align: "right", maxWidth: DETAIL_W });
    bizY += LINE_H;
  }

  y = Math.max(y + 62, bizY) + SECTION_GAP;

  /* ── DIVIDER ── */
  doc.setDrawColor(210, 215, 225);
  doc.setLineWidth(0.5);
  doc.line(LEFT, y, RIGHT, y);
  y += SECTION_GAP;

  /* ── BILL TO + INVOICE DETAILS ── */
  const billToStartY = y;

  // Bill To (left column)
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(120, 120, 120);
  doc.text("BILL TO", LEFT, y);
  y += LINE_H;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text(data.to.name || "Client Name", LEFT, y);
  y += LINE_H;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(9);

  if (data.to.email) {
    doc.text(data.to.email, LEFT, y);
    y += LINE_H;
  }
  if (data.to.address) {
    const toAddrLines = doc.splitTextToSize(data.to.address, DETAIL_RIGHT_X - LEFT - DETAIL_W - 20);
    toAddrLines.forEach((line: string) => {
      doc.text(line, LEFT, y);
      y += LINE_H;
    });
  }

  // Invoice details (right column) — aligned with billToStartY
  const detailRightX = RIGHT;
  let detY = billToStartY;

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(120, 120, 120);
  doc.text("INVOICE DETAILS", detailRightX, detY, { align: "right" });
  detY += LINE_H;
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);

  const details: [string, string][] = [
    ["Invoice #", data.invoiceNumber || "-"],
    ["Issue Date", data.issueDate || "-"],
    ["Due Date", data.dueDate || "-"],
    ["Terms", getPaymentTermsLabel(data)],
    ["Currency", data.currency],
  ];
  for (const [key, val] of details) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text(`${key}:`, detailRightX - doc.getTextWidth(val) - 6, detY, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.text(val, detailRightX, detY, { align: "right" });
    detY += LINE_H;
  }

  y = Math.max(y, detY) + SECTION_GAP;

  /* ── LINE ITEMS TABLE ── */
  const COL = {
    desc: LEFT,
    qty: LEFT + CONTENT_W * 0.52,
    price: LEFT + CONTENT_W * 0.65,
    total: RIGHT,
  };

  // Table header
  doc.setFillColor(245, 246, 248);
  doc.rect(LEFT, y - 10, CONTENT_W, 18, "F");

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(90, 95, 110);
  doc.text("DESCRIPTION", COL.desc, y);
  doc.text("QTY", COL.qty, y);
  doc.text("UNIT PRICE", COL.price, y);
  doc.text("TOTAL", COL.total, y, { align: "right" });
  y += 6;

  doc.setDrawColor(210, 215, 225);
  doc.line(LEFT, y, RIGHT, y);
  y += LINE_H;

  // Rows
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 40);

  let rowAlt = false;
  for (const item of data.lineItems) {
    const total = getLineItemTotal(item);
    const descLines = doc.splitTextToSize(item.description || "Untitled item", COL.qty - COL.desc - 8);
    const rowH = Math.max(LINE_H, descLines.length * LINE_H) + 6;

    if (rowAlt) {
      doc.setFillColor(250, 251, 253);
      doc.rect(LEFT, y - LINE_H + 2, CONTENT_W, rowH, "F");
    }
    rowAlt = !rowAlt;

    doc.setTextColor(40, 40, 40);
    doc.text(descLines, COL.desc, y);
    doc.text(String(item.quantity), COL.qty, y);
    doc.text(formatCurrency(item.unitPrice, data.currency), COL.price, y);
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(total, data.currency), COL.total, y, { align: "right" });
    doc.setFont("helvetica", "normal");

    y += rowH;

    // Overflow guard — new page if needed
    if (y > PAGE_H - 180) {
      doc.addPage();
      y = 50;
    }
  }

  doc.setDrawColor(210, 215, 225);
  doc.line(LEFT, y, RIGHT, y);
  y += SECTION_GAP;

  /* ── TOTALS ── */
  const totals = getInvoiceTotals(data);
  const TOT_X = RIGHT - 220;

  function totalsRow(label: string, value: string, isBold = false) {
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setFontSize(isBold ? 10.5 : 9.5);
    doc.setTextColor(isBold ? 20 : 70, isBold ? 20 : 70, isBold ? 20 : 70);
    doc.text(label, TOT_X, y);
    doc.text(value, RIGHT, y, { align: "right" });
    y += LINE_H + (isBold ? 2 : 1);
  }

  totalsRow("Subtotal", formatCurrency(totals.subtotal, data.currency));
  if (totals.discountAmount > 0) {
    totalsRow("Discount", `-${formatCurrency(totals.discountAmount, data.currency)}`);
  }
  if (totals.taxAmount > 0) {
    totalsRow(
      `${data.tax.label || "Tax"} (${data.tax.rate}%)`,
      formatCurrency(totals.taxAmount, data.currency)
    );
  }
  if (totals.previousBalance > 0) {
    totalsRow("Previous Balance", formatCurrency(totals.previousBalance, data.currency));
    y += 4;
  }

  // Total line
  doc.setDrawColor(180, 185, 195);
  doc.line(TOT_X, y - 2, RIGHT, y - 2);
  y += 14;
  totalsRow("Total Due", formatCurrency(totals.total, data.currency), true);

  /* ── NOTES ── */
  if (data.notes.trim()) {
    y += SECTION_GAP;
    doc.setDrawColor(210, 215, 225);
    doc.line(LEFT, y - 6, RIGHT, y - 6);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(120, 120, 120);
    doc.text("NOTES / TERMS", LEFT, y);
    y += LINE_H;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const noteLines = doc.splitTextToSize(data.notes, CONTENT_W);
    doc.text(noteLines, LEFT, y);
  }

  doc.save(`invoice-${(data.invoiceNumber || "aikittools").toLowerCase().replace(/[^a-z0-9-]/g, "-")}.pdf`);
}
