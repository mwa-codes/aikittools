export type CurrencyCode = "USD" | "EUR" | "GBP" | "PKR" | "AED" | "CAD";

export type PaymentTermsOption = "DUE_ON_RECEIPT" | "NET_7" | "NET_15" | "NET_30" | "CUSTOM";

export type DiscountType = "PERCENT" | "FIXED";

export interface InvoiceParty {
  name: string;
  email: string;
  address: string;
  phone?: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceDiscount {
  type: DiscountType;
  value: number;
}

export interface InvoiceTax {
  label: string;
  rate: number;
}

export interface InvoiceFormData {
  from: InvoiceParty;
  to: InvoiceParty;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  paymentTerms: PaymentTermsOption;
  customPaymentTerms: string;
  currency: CurrencyCode;
  lineItems: InvoiceLineItem[];
  discount: InvoiceDiscount;
  tax: InvoiceTax;
  notes: string;
  previousBalance: number;
  logoDataUrl: string | null;
}
