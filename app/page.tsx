"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import React, { useState } from "react";
import InvoiceItem from "@/components/shared/invoice-item";
import InvoiceEmptyState from "@/components/shared/invoice-empty-state";
import { useInvoiceStore } from "@/lib/store";
import { InvoiceFilterProps } from "@/lib/types";

type InvoiceStatus = "Paid" | "Pending" | "Draft";

function statusStyles(status: InvoiceStatus) {
  switch (status) {
    case "Paid":
      return "bg-emerald-50 text-emerald-500";
    case "Pending":
      return "bg-amber-50 text-amber-500";
    case "Draft":
      return "bg-slate-100 text-slate-500";
    default:
      return "bg-slate-100 text-slate-500";
  }
}

function statusDot(status: InvoiceStatus) {
  switch (status) {
    case "Paid":
      return "bg-emerald-400";
    case "Pending":
      return "bg-amber-400";
    case "Draft":
      return "bg-slate-400";
    default:
      return "bg-slate-400";
  }
}

const defaultItems: InvoiceFilterProps = [
  { id: "draft", label: "Draft", checked: false },
  { id: "pending", label: "Pending", checked: false },
  { id: "paid", label: "Paid", checked: false },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(defaultItems);
  const { filterInvoicesByStatus, formOpen } = useInvoiceStore(
    (state) => state
  );
  const invoices = React.useMemo(
    () => filterInvoicesByStatus(items),
    [items, formOpen]
  );
  console.log(invoices);
  const openCreate = useInvoiceStore((s) => s.openCreate);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-8 space-x-6">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--color-primary-foreground)]">
            Invoices
          </h2>
          <p>
            <span className="hidden sm:inline">These are</span>{" "}
            {invoices.length} <span className="hidden sm:inline">total</span>{" "}
            invoices
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 font-medium outline-none cursor-pointer text-[var(--color-primary-foreground)]">
                Filter <span className="hidden sm:inline">by status</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 text-[var(--purple)] ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              sideOffset={10}
              className="w-48 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[0_10px_30px_rgba(37,42,70,0.08)]"
            >
              <div className="space-y-4">
                {items.map((item) => (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="h-5 w-5 rounded-sm border-[var(--color-border)] data-[state=checked]:border-[var(--purple)] data-[state=checked]:bg-[var(--purple)] data-[state=checked]:text-white cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-[var(--color-primary-foreground)] cursor-pointer">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={openCreate}
            className="bg-[var(--purple)] text-[var(--color-white)] px-3 py-5 rounded-3xl cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-[var(--color-white)] flex items-center justify-center">
              <Plus className="text-[var(--purple)]" />
            </div>
            New <span className="hidden sm:inline">Invoice</span>
          </Button>
        </div>
      </div>
      <div className="space-y-5">
        {invoices.length ? (
          invoices.map((invoiceItem) => (
            <InvoiceItem
              key={invoiceItem.id}
              id={invoiceItem.id}
              invoiceNumber={invoiceItem.invoiceNumber}
              dueDate={invoiceItem.invoiceDate}
              client={invoiceItem.clientName}
              amount={invoiceItem.total}
              status={invoiceItem.status}
            />
          ))
        ) : (
          <InvoiceEmptyState />
        )}
      </div>
    </div>
  );
}
