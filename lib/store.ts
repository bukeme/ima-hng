import { create } from "zustand";
import { persist } from "zustand/middleware";
import { InvoiceStatus, InvoiceStoreState } from "./types";
import { initialInvoices } from "./data";

export const useInvoiceStore = create<InvoiceStoreState>()(
  persist(
    (set, get) => ({
      invoices: initialInvoices,
      formOpen: false,
      mode: "create",
      activeInvoiceId: null,
      openCreate: () =>
        set({ formOpen: true, mode: "create", activeInvoiceId: null }),
      openEdit: (id) =>
        set({ formOpen: true, mode: "edit", activeInvoiceId: id }),
      closeForm: () =>
        set({ formOpen: false, mode: "create", activeInvoiceId: null }),
      saveInvoice: (invoice) =>
        set((state) => {
          const exists = state.invoices.some((item) => item.id === invoice.id);
          return {
            invoices: exists
              ? state.invoices.map((item) =>
                  item.id === invoice.id ? invoice : item
                )
              : [invoice, ...state.invoices],
          };
        }),
      deleteInvoice: (id) =>
        set((state) => ({
          invoices: state.invoices.filter((invoice) => invoice.id !== id),
        })),
      getInvoiceById: (id) =>
        get().invoices.find((invoice) => invoice.id === id),
      // Add the filterInvoicesByStatus function
      filterInvoicesByStatus: (statuses) => {
        const checkedStatuses = statuses
          .filter((status) => status.checked)
          .map((status) => status.id);

        if (checkedStatuses.length === 0) {
          // If no status is checked, return all invoices
          return get().invoices;
        }

        // Filter invoices by the checked statuses
        return get().invoices.filter((invoice) =>
          checkedStatuses.includes(invoice.status.toLowerCase())
        );
      },
      // Add function to update the status of an invoice
      updateInvoiceStatus: (id, newStatus) =>
        set((state) => ({
          invoices: state.invoices.map((invoice) =>
            invoice.id === id ? { ...invoice, status: newStatus } : invoice
          ),
        })),
    }),
    {
      name: "invoice-store",
      partialize: (state) => ({ invoices: state.invoices }),

      onRehydrateStorage: () => (state) => {
        if (state && state.invoices.length === 0) {
          state.invoices = initialInvoices;
        }
      },
    }
  )
);
