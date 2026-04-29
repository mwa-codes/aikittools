import type { CurrencyCode, InvoiceFormData, PaymentTermsOption } from "@/types/invoice";

export const CURRENCY_OPTIONS: Array<{ code: CurrencyCode; label: string }> = [
  { code: "USD", label: "USD - US Dollar" },
  { code: "EUR", label: "EUR - Euro" },
  { code: "GBP", label: "GBP - British Pound" },
  { code: "PKR", label: "PKR - Pakistani Rupee" },
  { code: "AED", label: "AED - UAE Dirham" },
  { code: "CAD", label: "CAD - Canadian Dollar" },
];

export const PAYMENT_TERMS_OPTIONS: Array<{ value: PaymentTermsOption; label: string; days: number | null }> = [
  { value: "DUE_ON_RECEIPT", label: "Due on Receipt", days: 0 },
  { value: "NET_7", label: "Net 7", days: 7 },
  { value: "NET_15", label: "Net 15", days: 15 },
  { value: "NET_30", label: "Net 30", days: 30 },
  { value: "CUSTOM", label: "Custom", days: null },
];

export const DEFAULT_TAX_LABEL = "VAT";

export const DEFAULT_INVOICE_FORM_DATA = (initialInvoiceNumber: string, today: string): InvoiceFormData => ({
  from: {
    name: "",
    email: "",
    address: "",
    phone: "",
  },
  to: {
    name: "",
    email: "",
    address: "",
  },
  invoiceNumber: initialInvoiceNumber,
  issueDate: today,
  dueDate: today,
  paymentTerms: "NET_15",
  customPaymentTerms: "",
  currency: "USD",
  lineItems: [
    {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unitPrice: 0,
    },
  ],
  discount: {
    type: "PERCENT",
    value: 0,
  },
  tax: {
    label: DEFAULT_TAX_LABEL,
    rate: 0,
  },
  notes: "",
  previousBalance: 0,
  logoDataUrl: null,
});
