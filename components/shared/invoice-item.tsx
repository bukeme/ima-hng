import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type InvoiceStatus = "Paid" | "Pending" | "Draft";

interface Invoice {
  id: string;
  invoiceNumber: string;
  dueDate: string;
  client: string;
  amount: number;
  status: InvoiceStatus;
}

export function statusStyles(status: InvoiceStatus) {
  switch (status) {
    case "Paid":
      return "text-[var(--green)] bg-[var(--green-light)]";
    case "Pending":
      return "text-[var(--orange)] bg-[var(--orange-light)]";
    case "Draft":
      return "text-[var(--dark-blue)] bg-[var(--dark-blue-light)]";
    default:
      return "bg-slate-100 text-slate-500";
  }
}

export function statusDot(status: InvoiceStatus) {
  switch (status) {
    case "Paid":
      return "bg-[var(--green)]";
    case "Pending":
      return "bg-[var(--orange)]";
    case "Draft":
      return "bg-[var(--dark-blue)]";
    default:
      return "bg-slate-400";
  }
}

const InvoiceItem = (invoice: Invoice) => {
  const router = useRouter();
  return (
    <div
      key={invoice.id}
      onClick={() => router.push(`/${invoice.id}`)}
      className="flex items-center gap-4 rounded-2xl bg-[var(--color-card)] px-4 py-5 shadow-[0_10px_30px_rgba(37,42,70,0.08)] transition-transform duration-200 hover:-translate-y-0.5 border border-[var(--color-border)] cursor-pointer hover:border-[var(--purple)] sm:px-6"
    >
      <div className="min-w-[78px] shrink-0 font-bold tracking-tight text-[var(--primary-foreground)] sm:min-w-[88px]">
        <span className="text-[var(--color-card-foreground)]">#</span>
        {invoice.invoiceNumber}
      </div>

      <div className="hidden min-w-[120px] shrink-0 text-sm text-[var(--color-card-foreground)] sm:block">
        {invoice.dueDate}
      </div>

      <div className="min-w-0 flex-1 truncate text-sm text-[var(--color-card-foreground)]">
        {invoice.client}
      </div>

      <div className="min-w-[90px] text-right font-semibold text-[var(--primary-foreground)] sm:min-w-[120px]">
        £ {invoice.amount}
      </div>

      <div
        className={`hidden items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold sm:flex ${statusStyles(
          invoice.status
        )}`}
      >
        <span className={`h-2 w-2 rounded-full ${statusDot(invoice.status)}`} />
        <span>{invoice.status}</span>
      </div>

      <div className="flex items-center justify-center sm:hidden">
        <span
          className={`h-2.5 w-2.5 rounded-full ${statusDot(invoice.status)}`}
        />
      </div>

      <button
        type="button"
        aria-label={`Open ${invoice.id}`}
        className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-card-foreground)] transition-colors cursor-pointer"
      >
        <ChevronRight className="h-5 w-5 text-[var(--purple)]" />
      </button>
    </div>
  );
};

export default InvoiceItem;
