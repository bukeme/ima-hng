"use client";

import EmptyStateImage from "@/assets/Email campaign_Flatline.png";
import Image from "next/image";

export default function InvoiceEmptyState() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-8 h-[320px] w-[320px] sm:h-[auto] sm:w-[200px]">
          <Image
            src={EmptyStateImage.src}
            alt="empty state"
            width={200}
            height={200}
            className="w-full h-full"
          />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-primary-foreground)] sm:text-[28px]">
          There is nothing here
        </h1>
        <p className="mt-4 max-w-[260px] text-center text-[15px] leading-6 text-[var(--color-card-foreground)] sm:max-w-[320px] sm:text-base">
          Create a invoice by clicking the New Invoice button to get started
        </p>
      </div>
    </div>
  );
}
