import { paymentTerms } from "./data";

type PaymentTerms = (typeof paymentTerms)[number];

export type InvoiceStatus = "Paid" | "Pending" | "Draft";

export type InvoiceItem = {
  name: string;
  quantity: number | unknown;
  price: number | unknown;
};

export type NewInvoiceFormValues = {
  invoiceNumber: string;
  billFromStreet: string;
  billFromCity: string;
  billFromPostCode: string;
  billFromCountry: string;
  clientName: string;
  clientEmail: string;
  billToStreet: string;
  billToCity: string;
  billToPostCode: string;
  billToCountry: string;
  invoiceDate: string;
  paymentTerms: PaymentTerms;
  projectDescription: string;
  items: InvoiceItem[];
};

export type InvoiceFormValues = NewInvoiceFormValues & {
  status: InvoiceStatus;
};

export type InvoiceRecord = InvoiceFormValues & {
  id: string;
  total: number;
};

type InvoiceFormMode = "create" | "edit";

export type InvoiceFilterProps = {
  id: string;
  label: InvoiceStatus;
  checked: boolean;
}[];

export type InvoiceStoreState = {
  invoices: InvoiceRecord[];
  formOpen: boolean;
  mode: InvoiceFormMode;
  activeInvoiceId: string | null;
  openCreate: () => void;
  openEdit: (id: string) => void;
  closeForm: () => void;
  saveInvoice: (invoice: InvoiceRecord) => void;
  deleteInvoice: (id: string) => void;
  getInvoiceById: (id: string) => InvoiceRecord | undefined;
  filterInvoicesByStatus: (statuses: InvoiceFilterProps) => InvoiceRecord[];
  updateInvoiceStatus: (id: string, newStatus: InvoiceStatus) => void;
};

export type InvoiceFormSheetProps = {
  createInvoiceNumber?: string;
  onSubmitSuccess?: (invoice: InvoiceRecord) => void;
};
