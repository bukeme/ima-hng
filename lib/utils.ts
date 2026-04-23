import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  InvoiceFormValues,
  InvoiceItem,
  InvoiceRecord,
  NewInvoiceFormValues,
} from "./types";
import { defaultValues } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(value);
}

export function toInputDate(value?: string) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
}

export function sumItems(items: InvoiceItem[]) {
  return items.reduce(
    (total, item) =>
      total + Number(item.quantity || 0) * Number(item.price || 0),
    0
  );
}

export function makeEmptyItem(): InvoiceItem {
  return { name: "", quantity: 1, price: 0 };
}

export function makeDefaultValues(
  invoice?: InvoiceRecord
): NewInvoiceFormValues {
  if (!invoice) return defaultValues;
  return {
    invoiceNumber: invoice.invoiceNumber,
    billFromStreet: invoice.billFromStreet,
    billFromCity: invoice.billFromCity,
    billFromPostCode: invoice.billFromPostCode,
    billFromCountry: invoice.billFromCountry,
    clientName: invoice.clientName,
    clientEmail: invoice.clientEmail,
    billToStreet: invoice.billToStreet,
    billToCity: invoice.billToCity,
    billToPostCode: invoice.billToPostCode,
    billToCountry: invoice.billToCountry,
    invoiceDate: toInputDate(invoice.invoiceDate),
    paymentTerms: invoice.paymentTerms,
    projectDescription: invoice.projectDescription,
    items: invoice.items.length ? invoice.items : [makeEmptyItem()],
  };
}

import { format, addDays } from "date-fns";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "dd MMM yyyy");
};

export function calculateDueDate(
  dateString: string,
  paymentTerm: string
): string {
  const date = new Date(dateString);

  // Extract the number of days from the payment term string
  const daysToAdd = parseInt(
    paymentTerm.replace("Net ", "").replace(" Days", ""),
    10
  );

  // Add the days to the date
  const dueDate = addDays(date, daysToAdd);

  // Format the resulting date
  return format(dueDate, "dd MMM yyyy");
}
