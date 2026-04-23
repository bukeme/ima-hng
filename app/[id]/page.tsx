"use client";

import { DeleteConfirmDialog } from "@/components/sections/delete-confirm-dialog";
import { InvoiceFormSheet } from "@/components/sections/form-modal";
import { statusDot, statusStyles } from "@/components/shared/invoice-item";
import { Button } from "@/components/ui/button";
import { useInvoiceStore } from "@/lib/store";
import { calculateDueDate, formatDate } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

type LineItem = {
  name: string;
  qty: number;
  price: string;
  total: string;
};

const items: LineItem[] = [
  {
    name: "Banner Design",
    qty: 1,
    price: "£ 156.00",
    total: "£ 156.00",
  },
  {
    name: "Email Design",
    qty: 2,
    price: "£ 200.00",
    total: "£ 400.00",
  },
];

const InvoiceDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const {
    getInvoiceById,
    invoices,
    formOpen,
    updateInvoiceStatus,
    deleteInvoice,
  } = useInvoiceStore((state) => state);
  const invoice = React.useMemo(
    () => getInvoiceById(id as string),
    [id, getInvoiceById, invoices, formOpen]
  );
  console.log(invoice);
  const openEdit = useInvoiceStore((s) => s.openEdit);
  const [openDelete, setOpenDelete] = React.useState(false);

  return invoice ? (
    <div>
      <InvoiceFormSheet />
      <DeleteConfirmDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        invoiceNumber={invoice.invoiceNumber}
        onConfirm={() => {
          deleteInvoice(invoice.id as string);
          router.push("/");
          setOpenDelete(false);
        }}
      />
      <Button
        className="bg-transparent outline-none text-[var(--color-primary-foreground)] cursor-pointer space-x-3 text-base"
        onClick={() => router.back()}
      >
        <ChevronLeft className="text-[var(--purple)]" />
        <span>Go back</span>
      </Button>
      <div className="flex items-center justify-between bg-[var(--color-card)] rounded-xl shadow-[0_5px_10px_rgba(37,42,70,0.08)] p-6 mt-8">
        <div className="flex items-center space-x-5">
          <p>Status</p>
          <div
            className={`hidden items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold sm:flex ${statusStyles(
              invoice.status
            )}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${statusDot(invoice.status)}`}
            />
            <span>{invoice.status}</span>
          </div>
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => openEdit(id as string)}
            className="text-[var(--color-muted-foreground)] bg-[var(--purple-light)] rounded-4xl px-5 py-5 cursor-pointer"
          >
            Edit
          </Button>
          <Button
            onClick={() => setOpenDelete(true)}
            className="text-[var(--color-white)] bg-[var(--red)] rounded-4xl px-5 py-5 cursor-pointer"
          >
            Delete
          </Button>
          {invoice.status !== "Paid" && (
            <Button
              onClick={() => {
                updateInvoiceStatus(id as string, "Paid");
              }}
              className="text-[var(--color-white)] bg-[var(--purple)] rounded-4xl px-5 py-5 cursor-pointer"
            >
              Mark as Paid
            </Button>
          )}
        </div>
      </div>
      <div className="w-full bg-[var(--color-card)] p-8 rounded-xl mt-8 space-y-10">
        {/* Top Row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-primary-foreground)]">
              <span className="text-[var(--color-card-foreground)]">#</span>
              {invoice.invoiceNumber}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-card-foreground)]">
              {invoice.projectDescription}
            </p>
          </div>

          <div className="text-right text-sm text-[var(--color-card-foreground)] leading-6">
            <p>{invoice.billFromStreet}</p>
            <p>{invoice.billFromCity}</p>
            <p>{invoice.billFromPostCode}</p>
            <p>{invoice.billFromCountry}</p>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-[var(--color-card-foreground)]">
                Invoice Date
              </p>
              <p className="mt-1 font-bold text-[var(--color-primary-foreground)]">
                {formatDate(invoice.invoiceDate)}
              </p>
            </div>

            <div>
              <p className="text-sm text-[var(--color-card-foreground)]">
                Payment Due
              </p>
              <p className="mt-1 font-bold text-[var(--color-primary-foreground)]">
                {calculateDueDate(invoice.invoiceDate, invoice.paymentTerms)}
              </p>
            </div>
          </div>

          {/* Middle Column */}
          <div>
            <p className="text-sm text-[var(--color-card-foreground)]">
              Bill To
            </p>
            <p className="mt-1 font-bold text-[var(--color-primary-foreground)]">
              {invoice.clientName}
            </p>
            <div className="mt-2 text-sm text-[var(--color-card-foreground)] leading-6">
              <p>{invoice.billToStreet}</p>
              <p>{invoice.billToCity}</p>
              <p>{invoice.billToPostCode}</p>
              <p>{invoice.billToCountry}</p>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <p className="text-sm text-[var(--color-card-foreground)]">
              Sent to
            </p>
            <p className="mt-1 font-bold text-[var(--color-primary-foreground)]">
              {invoice.clientEmail}
            </p>
          </div>
        </div>

        <div className="w-full rounded-xl overflow-hidden bg-[var(--purple-light)] shadow-sm">
          <div className="px-8 pt-10 pb-8">
            <div className="grid grid-cols-4 gap-4 text-[14px] font-medium text-[var(--color-card-foreground)]">
              <div>Item Name</div>
              <div className="text-center">QTY.</div>
              <div>Price</div>
              <div className="text-right">Total</div>
            </div>

            <div className="mt-8 space-y-8">
              {invoice.items.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-4 gap-4 items-center text-[15px]"
                >
                  <div className="font-semibold text-[var(--color-primary-foreground)]">
                    {item.name}
                  </div>
                  <div className="text-center font-semibold text-[var(--color-card-foreground)]">
                    {item.quantity as number}
                  </div>
                  <div className="font-semibold text-[var(--color-card-foreground)]">
                    £ {item.price as number}
                  </div>
                  <div className="text-right font-semibold text-[var(--color-primary-foreground)]">
                    £ {(item.quantity as number) * (item.price as number)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--color-muted)] px-8 py-6">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-white/90">
                Amount Due
              </span>
              <span className="text-[22px] font-bold tracking-tight text-white">
                £ {invoice.total as number}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default InvoiceDetail;
