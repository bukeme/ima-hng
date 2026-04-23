// components/delete-confirm-dialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DeleteConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceNumber?: string;
  onConfirm: () => void;
  isLoading?: boolean;
};

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  invoiceNumber = "XM9141",
  onConfirm,
  isLoading = false,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[480px] rounded-[22px] border-0 bg-[var(--color-popover)] p-8 shadow-2xl"
      >
        <DialogHeader className="space-y-5">
          <DialogTitle className="text-[1.45rem] font-extrabold tracking-tight text-[var(--color-primary-foreground)]">
            Confirm Deletion
          </DialogTitle>

          <DialogDescription className="max-w-[390px] text-[0.98rem] leading-7 text-[var(--color-popover-foreground)]">
            Are you sure you want to delete invoice #{invoiceNumber}? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-8 flex-row justify-end gap-3 sm:gap-4 bg-[var(--color-popover)] border-none">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-12 rounded-full bg-[#f7f7ff] px-8 text-[0.98rem] font-semibold text-[#7f86c9] hover:bg-[#f0f0ff] hover:text-[#6e76bf] cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="h-12 rounded-full bg-[#ea5454] px-8 text-[0.98rem] font-semibold text-white hover:bg-[#e24545] cursor-pointer"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
