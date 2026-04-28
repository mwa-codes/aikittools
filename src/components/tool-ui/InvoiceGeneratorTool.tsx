"use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";

interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

function normalizeNumberInput(value: string, allowDecimal: boolean) {
  const cleaned = allowDecimal ? value.replace(/[^\d.]/g, "") : value.replace(/[^\d]/g, "");
  if (!allowDecimal) {
    return cleaned.replace(/^0+(?=\d)/, "");
  }

  const [rawIntPart = "", ...rest] = cleaned.split(".");
  const decimalPart = rest.join("").replace(/\./g, "");
  const intPart = rawIntPart.replace(/^0+(?=\d)/, "");
  return decimalPart ? `${intPart || "0"}.${decimalPart}` : intPart;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function InvoiceGeneratorTool() {
  const [clientName, setClientName] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([{ id: 1, name: "", quantity: 1, price: 0 }]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items]
  );

  function updateItem(id: number, field: keyof InvoiceItem, value: string) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (field === "quantity" || field === "price") {
          const allowDecimal = field === "price";
          const normalized = normalizeNumberInput(value, allowDecimal);
          const fallbackValue = field === "quantity" ? 1 : 0;

          if (!normalized) {
            return { ...item, [field]: fallbackValue };
          }

          const numericValue = Number(normalized);
          if (Number.isNaN(numericValue)) {
            return { ...item, [field]: fallbackValue };
          }

          const safeValue =
            field === "quantity"
              ? Math.max(1, Math.trunc(numericValue))
              : Math.max(0, numericValue);

          return { ...item, [field]: safeValue };
        }
        return { ...item, [field]: value };
      })
    );
  }

  function addItem() {
    const nextId = Math.max(...items.map((item) => item.id), 0) + 1;
    setItems((prev) => [...prev, { id: nextId, name: "", quantity: 1, price: 0 }]);
  }

  function removeItem(id: number) {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function downloadPdf() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let cursorY = 20;

    doc.setFontSize(18);
    doc.text("Invoice", 14, cursorY);
    cursorY += 10;

    doc.setFontSize(11);
    doc.text(`Client: ${clientName.trim() || "N/A"}`, 14, cursorY);
    cursorY += 8;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, cursorY);
    cursorY += 12;

    doc.setFontSize(11);
    doc.text("Item", 14, cursorY);
    doc.text("Qty", 110, cursorY);
    doc.text("Price", 130, cursorY);
    doc.text("Total", 165, cursorY);
    cursorY += 3;
    doc.line(14, cursorY, pageWidth - 14, cursorY);
    cursorY += 7;

    items.forEach((item) => {
      const lineTotal = item.quantity * item.price;
      const name = item.name.trim() || "Untitled item";
      doc.text(name.slice(0, 45), 14, cursorY);
      doc.text(String(item.quantity), 110, cursorY);
      doc.text(formatCurrency(item.price), 130, cursorY);
      doc.text(formatCurrency(lineTotal), 165, cursorY);
      cursorY += 8;
    });

    cursorY += 2;
    doc.line(110, cursorY, pageWidth - 14, cursorY);
    cursorY += 8;
    doc.setFontSize(12);
    doc.text(`Grand Total: ${formatCurrency(subtotal)}`, 110, cursorY);

    doc.save("invoice-aikittools.pdf");
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="client-name" className="block text-sm font-medium text-gray-700 mb-1">
          Client Name
        </label>
        <input
          id="client-name"
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Enter client or company name"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-800 mb-3">Invoice Items</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(item.id, "name", e.target.value)}
                placeholder="Item name"
                className="sm:col-span-5 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                className="sm:col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                type="number"
                min={0}
                step="0.01"
                value={item.price}
                onChange={(e) => updateItem(item.id, "price", e.target.value)}
                className="sm:col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <div className="sm:col-span-2 text-sm font-medium text-gray-700">
                {formatCurrency(item.quantity * item.price)}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                disabled={items.length === 1}
                className="sm:col-span-1 px-2 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addItem}
          className="mt-3 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg"
        >
          + Add Item
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <h2 className="text-sm font-semibold text-gray-800 mb-2">Invoice Preview</h2>
        <p className="text-sm text-gray-600 mb-1">Client: {clientName.trim() || "N/A"}</p>
        <p className="text-sm text-gray-600 mb-3">Items: {items.length}</p>
        <p className="text-lg font-bold text-gray-900">Total: {formatCurrency(subtotal)}</p>
      </div>

      <button
        onClick={downloadPdf}
        className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
      >
        Download Invoice PDF
      </button>
    </div>
  );
}
