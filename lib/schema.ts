import { z } from "zod";
import { paymentTerms } from "./data";

const itemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  quantity: z.coerce
    .number()
    .int("Qty must be a whole number")
    .min(1, "Qty must be at least 1"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
});

export const formSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  billFromStreet: z.string().min(1, "Street address is required"),
  billFromCity: z.string().min(1, "City is required"),
  billFromPostCode: z.string().min(1, "Post code is required"),
  billFromCountry: z.string().min(1, "Country is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Enter a valid email address"),
  billToStreet: z.string().min(1, "Street address is required"),
  billToCity: z.string().min(1, "City is required"),
  billToPostCode: z.string().min(1, "Post code is required"),
  billToCountry: z.string().min(1, "Country is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  paymentTerms: z.enum(paymentTerms),
  projectDescription: z.string().min(1, "Project description is required"),
  items: z.array(itemSchema).min(1, "At least one item is required"),
});
