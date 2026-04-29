"use client";

import { useMemo, useReducer } from "react";
import { DEFAULT_INVOICE_FORM_DATA, PAYMENT_TERMS_OPTIONS } from "@/lib/invoice/constants";
import { toIsoDateString } from "@/lib/invoice/formatters";
import type { DiscountType, InvoiceFormData, PaymentTermsOption } from "@/types/invoice";

type PartySection = "from" | "to";

type Action =
  | { type: "SET_PARTY_FIELD"; section: PartySection; field: "name" | "email" | "address" | "phone"; value: string }
  | { type: "SET_FIELD"; field: "invoiceNumber" | "issueDate" | "dueDate" | "customPaymentTerms" | "notes"; value: string }
  | { type: "SET_PAYMENT_TERMS"; value: PaymentTermsOption }
  | { type: "SET_CURRENCY"; value: InvoiceFormData["currency"] }
  | { type: "ADD_LINE_ITEM" }
  | { type: "REMOVE_LINE_ITEM"; id: string }
  | { type: "SET_LINE_ITEM_FIELD"; id: string; field: "description" | "quantity" | "unitPrice"; value: string }
  | { type: "SET_DISCOUNT_TYPE"; value: DiscountType }
  | { type: "SET_DISCOUNT_VALUE"; value: string }
  | { type: "SET_TAX_LABEL"; value: string }
  | { type: "SET_TAX_RATE"; value: string }
  | { type: "SET_PREVIOUS_BALANCE"; value: string }
  | { type: "SET_LOGO"; value: string | null };

function addDays(dateString: string, days: number) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  date.setDate(date.getDate() + days);
  return toIsoDateString(date);
}

function reducer(state: InvoiceFormData, action: Action): InvoiceFormData {
  switch (action.type) {
    case "SET_PARTY_FIELD":
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.field]: action.value,
        },
      };
    case "SET_FIELD": {
      if (action.field === "issueDate") {
        const selected = PAYMENT_TERMS_OPTIONS.find((option) => option.value === state.paymentTerms);
        const nextDueDate = selected?.days ? addDays(action.value, selected.days) : state.dueDate;
        return {
          ...state,
          issueDate: action.value,
          dueDate: nextDueDate,
        };
      }
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case "SET_PAYMENT_TERMS": {
      const selected = PAYMENT_TERMS_OPTIONS.find((option) => option.value === action.value);
      const dueDate = selected?.days ? addDays(state.issueDate, selected.days) : state.dueDate;
      return {
        ...state,
        paymentTerms: action.value,
        dueDate,
      };
    }
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.value,
      };
    case "ADD_LINE_ITEM":
      return {
        ...state,
        lineItems: [
          ...state.lineItems,
          {
            id: crypto.randomUUID(),
            description: "",
            quantity: 1,
            unitPrice: 0,
          },
        ],
      };
    case "REMOVE_LINE_ITEM":
      return {
        ...state,
        lineItems:
          state.lineItems.length > 1
            ? state.lineItems.filter((item) => item.id !== action.id)
            : state.lineItems,
      };
    case "SET_LINE_ITEM_FIELD":
      return {
        ...state,
        lineItems: state.lineItems.map((item) => {
          if (item.id !== action.id) return item;
          if (action.field === "description") {
            return { ...item, description: action.value };
          }
          const parsed = Number(action.value);
          if (Number.isNaN(parsed)) {
            return item;
          }
          if (action.field === "quantity") {
            return { ...item, quantity: Math.max(1, Math.trunc(parsed)) };
          }
          return { ...item, unitPrice: Math.max(0, parsed) };
        }),
      };
    case "SET_DISCOUNT_TYPE":
      return {
        ...state,
        discount: {
          ...state.discount,
          type: action.value,
        },
      };
    case "SET_DISCOUNT_VALUE":
      return {
        ...state,
        discount: {
          ...state.discount,
          value: Math.max(0, Number(action.value) || 0),
        },
      };
    case "SET_TAX_LABEL":
      return {
        ...state,
        tax: {
          ...state.tax,
          label: action.value,
        },
      };
    case "SET_TAX_RATE":
      return {
        ...state,
        tax: {
          ...state.tax,
          rate: Math.max(0, Number(action.value) || 0),
        },
      };
    case "SET_PREVIOUS_BALANCE":
      return {
        ...state,
        previousBalance: Math.max(0, Number(action.value) || 0),
      };
    case "SET_LOGO":
      return {
        ...state,
        logoDataUrl: action.value,
      };
    default:
      return state;
  }
}

export function useInvoiceForm(initialInvoiceNumber: string) {
  const today = toIsoDateString(new Date());
  const [data, dispatch] = useReducer(reducer, DEFAULT_INVOICE_FORM_DATA(initialInvoiceNumber, today));

  const actions = useMemo(
    () => ({
      setPartyField: (section: PartySection, field: "name" | "email" | "address" | "phone", value: string) =>
        dispatch({ type: "SET_PARTY_FIELD", section, field, value }),
      setField: (field: "invoiceNumber" | "issueDate" | "dueDate" | "customPaymentTerms" | "notes", value: string) =>
        dispatch({ type: "SET_FIELD", field, value }),
      setPaymentTerms: (value: PaymentTermsOption) => dispatch({ type: "SET_PAYMENT_TERMS", value }),
      setCurrency: (value: InvoiceFormData["currency"]) => dispatch({ type: "SET_CURRENCY", value }),
      addLineItem: () => dispatch({ type: "ADD_LINE_ITEM" }),
      removeLineItem: (id: string) => dispatch({ type: "REMOVE_LINE_ITEM", id }),
      setLineItemField: (id: string, field: "description" | "quantity" | "unitPrice", value: string) =>
        dispatch({ type: "SET_LINE_ITEM_FIELD", id, field, value }),
      setDiscountType: (value: DiscountType) => dispatch({ type: "SET_DISCOUNT_TYPE", value }),
      setDiscountValue: (value: string) => dispatch({ type: "SET_DISCOUNT_VALUE", value }),
      setTaxLabel: (value: string) => dispatch({ type: "SET_TAX_LABEL", value }),
      setTaxRate: (value: string) => dispatch({ type: "SET_TAX_RATE", value }),
      setPreviousBalance: (value: string) => dispatch({ type: "SET_PREVIOUS_BALANCE", value }),
      setLogo: (value: string | null) => dispatch({ type: "SET_LOGO", value }),
    }),
    []
  );

  return { data, actions };
}
