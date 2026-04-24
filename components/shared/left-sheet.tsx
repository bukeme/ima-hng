// components/ui/left-sheet.tsx
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export function LeftSheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay (offset from sidebar) */}
        <Dialog.Overlay
          className={cn(
            "fixed top-0 right-0 bottom-0 lg:left-14 z-40 bg-black/40 backdrop-blur-sm"
          )}
        />

        {/* Sheet */}
        <Dialog.Content
          className={cn(
            "fixed top-0 bottom-0 lg:left-14 z-50",
            "w-full max-w-[640px]",
            "bg-[var(--color-secondary)] shadow-xl",
            "flex flex-col"
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
