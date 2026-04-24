import { formatDate } from "@/lib/utils";
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
      className="flex justify-between lg:justify-start items-center gap-8 lg:gap-4 rounded-2xl bg-[var(--color-card)] px-4 py-5 shadow-[0_10px_30px_rgba(37,42,70,0.08)] transition-transform duration-200 hover:-translate-y-0.5 border border-[var(--color-border)] cursor-pointer hover:border-[var(--purple)] sm:px-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 lg:gap-4">
        <div className="lg:min-w-[78px] shrink-0 font-bold tracking-tight text-[var(--primary-foreground)] lg:min-w-[88px] mb-2 sm:mb-0">
          <span className="text-[var(--color-card-foreground)]">#</span>
          {invoice.invoiceNumber}
        </div>
        <div className="lg:in-w-[120px] shrink-0 text-sm text-[var(--color-card-foreground)]">
          {formatDate(invoice.dueDate)}
        </div>
        <div className="min-w-0 hidden sm:block flex-1 truncate text-sm text-[var(--color-card-foreground)]">
          {invoice.client}
        </div>

        <div className="lg:min-w-[90px] text-right font-semibold text-[var(--primary-foreground)] lg:min-w-[120px] sm:hidden lg:block">
          £ {invoice.amount}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 lg:gap-4">
        <div className="lg:min-w-[90px] text-right font-semibold text-[var(--primary-foreground)] hidden sm:block lg:hidden lg:min-w-[120px]">
          £ {invoice.amount}
        </div>
        <div className="min-w-0 block sm:hidden flex-1 truncate text-sm mb-2 sm:mb-0 text-[var(--color-card-foreground)]">
          {invoice.client}
        </div>
        <div
          className={`items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold flex ${statusStyles(
            invoice.status
          )}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${statusDot(invoice.status)}`}
          />
          <span>{invoice.status}</span>
        </div>
        <button
          type="button"
          aria-label={`Open ${invoice.id}`}
          className="ml-1 hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-card-foreground)] transition-colors cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 text-[var(--purple)]" />
        </button>
      </div>

      {/* <div className="flex items-center justify-center sm:hidden">
        <span
          className={`h-2.5 w-2.5 rounded-full ${statusDot(invoice.status)}`}
        />
      </div> */}
    </div>
  );
};

export default InvoiceItem;
