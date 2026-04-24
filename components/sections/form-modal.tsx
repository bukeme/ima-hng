"use client";

import * as React from "react";

import {
  useFieldArray,
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  InvoiceFormSheetProps,
  InvoiceRecord,
  InvoiceStatus,
  NewInvoiceFormValues,
} from "@/lib/types";
import { useInvoiceStore } from "@/lib/store";
import {
  cx,
  formatMoney,
  makeDefaultValues,
  makeEmptyItem,
  sumItems,
} from "@/lib/utils";
import { defaultValues, paymentTerms } from "@/lib/data";
import { formSchema } from "@/lib/schema";
import { LeftSheet } from "../shared/left-sheet";
import { ChevronLeft } from "lucide-react";

export function InvoiceFormSheet({
  createInvoiceNumber = "",
  onSubmitSuccess,
}: InvoiceFormSheetProps) {
  const {
    formOpen,
    mode,
    activeInvoiceId,
    closeForm,
    saveInvoice,
    getInvoiceById,
  } = useInvoiceStore();
  const currentInvoice = activeInvoiceId
    ? getInvoiceById(activeInvoiceId)
    : undefined;

  const resolvedDefaults = React.useMemo(() => {
    if (mode === "edit" && currentInvoice)
      return makeDefaultValues(currentInvoice);
    return {
      ...defaultValues,
      invoiceNumber: createInvoiceNumber,
      items: [],
    };
  }, [mode, currentInvoice, createInvoiceNumber]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NewInvoiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: resolvedDefaults,
    mode: "onBlur",
  });

  React.useEffect(() => {
    reset(resolvedDefaults);
  }, [resolvedDefaults, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");
  const currentTotal = React.useMemo(
    () => sumItems(watchedItems || []),
    [watchedItems]
  );
  const title =
    mode === "edit" && currentInvoice
      ? `Edit #${currentInvoice.invoiceNumber}`
      : "Create Invoice";
  const submitLabel = mode === "edit" ? "Save Changes" : "Save & Send";

  const onSubmit: SubmitHandler<NewInvoiceFormValues> = (values, event) => {
    const submitter = event?.nativeEvent
      ? ((event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement)
      : null;
    const status =
      mode === "edit"
        ? (currentInvoice?.status as InvoiceStatus)
        : submitter?.name === "saveAsDraft"
        ? "Draft"
        : "Pending";

    const total = sumItems(values.items);
    const id = currentInvoice?.id ?? crypto.randomUUID();
    const invoice: InvoiceRecord = {
      ...values,
      id,
      total,
      status, // Add the status property
    };

    saveInvoice(invoice);
    onSubmitSuccess?.(invoice);
    closeForm();
  };

  const addItem = () => append(makeEmptyItem());

  return (
    <LeftSheet open={formOpen} onOpenChange={closeForm}>
      {/* HEADER */}
      <div className="px-6 py-5 sticky top-0 z-10">
        <Button
          className="bg-transparent outline-none text-[var(--color-primary-foreground)] cursor-pointer space-x-3 text-base p-0"
          onClick={closeForm}
        >
          <ChevronLeft className="text-[var(--purple)]" />
          <span>Go back</span>
        </Button>
        <h2 className="text-xl font-bold text-[var(--color-primary-foreground)]">
          {mode === "edit" ? "Edit Invoice" : "New Invoice"}
        </h2>
      </div>
      <form
        id="invoice-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col"
      >
        <ScrollArea className="flex-1 h-[300px] pb-20">
          <div className="px-6 py-6">
            <div className="space-y-8">
              <SectionTitle>Bill From</SectionTitle>

              <FieldGroup>
                <FieldBlock
                  label="Street Address"
                  error={errors.billFromStreet?.message}
                >
                  <Input
                    {...register("billFromStreet")}
                    className={inputClass(errors.billFromStreet?.message)}
                    placeholder="19 Union Terrace"
                  />
                </FieldBlock>

                <Grid3>
                  <FieldBlock label="City" error={errors.billFromCity?.message}>
                    <Input
                      {...register("billFromCity")}
                      className={inputClass(errors.billFromCity?.message)}
                      placeholder="London"
                    />
                  </FieldBlock>
                  <FieldBlock
                    label="Post Code"
                    error={errors.billFromPostCode?.message}
                  >
                    <Input
                      {...register("billFromPostCode")}
                      className={inputClass(errors.billFromPostCode?.message)}
                      placeholder="E1 3EZ"
                    />
                  </FieldBlock>
                  <FieldBlock
                    label="Country"
                    error={errors.billFromCountry?.message}
                  >
                    <Input
                      {...register("billFromCountry")}
                      className={inputClass(errors.billFromCountry?.message)}
                      placeholder="United Kingdom"
                    />
                  </FieldBlock>
                </Grid3>
              </FieldGroup>

              <FieldGroup>
                <SectionTitle>Bill To</SectionTitle>

                <FieldBlock
                  label="Client's Name"
                  error={errors.clientName?.message}
                >
                  <Input
                    {...register("clientName")}
                    className={inputClass(errors.clientName?.message)}
                    placeholder="Alex Grim"
                  />
                </FieldBlock>

                <FieldBlock
                  label="Client's Email"
                  error={errors.clientEmail?.message}
                >
                  <Input
                    {...register("clientEmail")}
                    className={inputClass(errors.clientEmail?.message)}
                    placeholder="alexgrim@mail.com"
                  />
                </FieldBlock>

                <FieldBlock
                  label="Street Address"
                  error={errors.billToStreet?.message}
                >
                  <Input
                    {...register("billToStreet")}
                    className={inputClass(errors.billToStreet?.message)}
                    placeholder="84 Church Way"
                  />
                </FieldBlock>

                <Grid3>
                  <FieldBlock label="City" error={errors.billToCity?.message}>
                    <Input
                      {...register("billToCity")}
                      className={inputClass(errors.billToCity?.message)}
                      placeholder="Bradford"
                    />
                  </FieldBlock>
                  <FieldBlock
                    label="Post Code"
                    error={errors.billToPostCode?.message}
                  >
                    <Input
                      {...register("billToPostCode")}
                      className={inputClass(errors.billToPostCode?.message)}
                      placeholder="BD1 9PB"
                    />
                  </FieldBlock>
                  <FieldBlock
                    label="Country"
                    error={errors.billToCountry?.message}
                  >
                    <Input
                      {...register("billToCountry")}
                      className={inputClass(errors.billToCountry?.message)}
                      placeholder="United Kingdom"
                    />
                  </FieldBlock>
                </Grid3>
              </FieldGroup>

              <Grid2>
                <FieldBlock
                  label="Invoice Date"
                  error={errors.invoiceDate?.message}
                >
                  <div className="relative">
                    <Input
                      type="date"
                      {...register("invoiceDate")}
                      className={cx(
                        "",
                        inputClass(errors.invoiceDate?.message)
                      )}
                    />
                    {/* <Icon
                      icon="solar:calendar-linear"
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      width="18"
                      height="18"
                    /> */}
                  </div>
                </FieldBlock>

                <FieldBlock
                  label="Payment Terms"
                  error={errors.paymentTerms?.message}
                >
                  <Controller
                    control={control}
                    name="paymentTerms"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={
                            inputClass(errors.paymentTerms?.message) +
                            " w-full mb-0 py-5"
                          }
                        >
                          <SelectValue placeholder="Select payment terms" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentTerms.map((term) => (
                            <SelectItem key={term} value={term}>
                              {term}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldBlock>
              </Grid2>

              <FieldBlock
                label="Project Description"
                error={errors.projectDescription?.message}
              >
                <Input
                  {...register("projectDescription")}
                  className={inputClass(errors.projectDescription?.message)}
                  placeholder="Graphic Design"
                />
              </FieldBlock>

              <div className="space-y-4">
                <SectionTitle>Item List</SectionTitle>

                <div className="space-y-3">
                  <div className="hidden sm:grid grid-cols-[minmax(0,2.4fr)_72px_1fr_90px_28px] items-end gap-3 px-1 text-[0.72rem] font-medium text-slate-400 ">
                    <span>Item Name</span>
                    <span>Qty.</span>
                    <span>Price</span>
                    <span>Total</span>
                    <span />
                  </div>

                  {fields.map((field, index) => {
                    const itemError = errors.items?.[index];
                    const qty = Number(watch(`items.${index}.quantity`) || 0);
                    const price = Number(watch(`items.${index}.price`) || 0);
                    const lineTotal = qty * price;

                    return (
                      <div
                        key={field.id}
                        className="grid grid-cols-[minmax(0,2.4fr)_72px_1fr_90px_28px] items-start gap-3"
                      >
                        <div className="col-span-full sm:col-span-1">
                          <FieldBlock
                            label="Item name"
                            compact
                            error={itemError?.name?.message}
                          >
                            <Input
                              {...register(`items.${index}.name`)}
                              className={cx(
                                "h-10",
                                inputClass(itemError?.name?.message)
                              )}
                              placeholder="Banner Design"
                            />
                          </FieldBlock>
                        </div>

                        <FieldBlock
                          compact
                          label="Qty"
                          error={itemError?.quantity?.message}
                        >
                          <Input
                            type="number"
                            min={1}
                            step={1}
                            {...register(`items.${index}.quantity`, {
                              valueAsNumber: true,
                            })}
                            className={cx(
                              "h-10 px-3 text-center",
                              inputClass(itemError?.quantity?.message)
                            )}
                            placeholder="1"
                          />
                        </FieldBlock>

                        <FieldBlock
                          compact
                          label="Price"
                          error={itemError?.price?.message}
                        >
                          <Input
                            type="number"
                            min={0.01}
                            step="0.01"
                            {...register(`items.${index}.price`, {
                              valueAsNumber: true,
                            })}
                            className={cx(
                              "h-10",
                              inputClass(itemError?.price?.message)
                            )}
                            placeholder="156.00"
                          />
                        </FieldBlock>

                        <div className="pt-2 text-sm font-medium text-slate-400 h-full">
                          <Label
                            className={cx(
                              "text-[0.72rem] font-medium text-[var(--color-card-foreground)]",
                              "sm:hidden"
                            )}
                          >
                            Total
                          </Label>
                          <div className="mt-4">{formatMoney(lineTotal)}</div>
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="inline-flex items-center justify-center rounded-full text-[var(--color-card-foreground)] transition hover:text-[var(--red)] cursor-pointer self-center"
                          aria-label={`Remove item ${index + 1}`}
                        >
                          <Icon icon="mdi:trash" width="18" height="18" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <Button
                    type="button"
                    onClick={addItem}
                    variant="secondary"
                    className="h-12 w-full rounded-full bg-[var(--purple-light)] text-[0.9rem] font-semibold text-[var(--purple)] hover:bg-[var(--purple-light)] cursor-pointer"
                  >
                    <Icon
                      icon="ic:round-plus"
                      width="18"
                      height="18"
                      className="mr-2"
                    />
                    Add New Item
                  </Button>

                  {errors.items?.message || errors.items?.root?.message ? (
                    <p className="px-1 text-sm font-medium text-red-500">
                      {errors.items.message || errors.items?.root?.message}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                Current total:{" "}
                <span className="font-semibold text-slate-900">
                  {formatMoney(currentTotal)}
                </span>
              </div> */}
            </div>
          </div>
        </ScrollArea>

        <div className="sticky bottom-0 z-20 border-t border-[var(--color-border)] px-6 py-5 bg-[var(--color-secondary)]">
          <div
            className={`flex items-center ${
              mode == "edit" ? "justify-end" : "justify-between"
            }  gap-3`}
          >
            <Button
              type="button"
              variant="ghost"
              onClick={closeForm}
              className="h-11 rounded-full px-6 text-[var(--purple)] bg-[var(--purple-light)] hover:bg-[var(--purple-light)] hover:text-[var(--purple)] cursor-pointer"
            >
              {mode === "edit" ? "Cancel" : "Discard"}
            </Button>

            <div className="flex items-center space-x-3">
              <Button
                type="submit"
                name="saveAsDraft"
                disabled={isSubmitting}
                className={`h-11 rounded-full bg-[var(--slack-blue)] px-6 font-semibold text-[var(--color-popover-foreground)] hover:bg-[var(--slack-blue)] cursor-pointer ${
                  mode === "edit" && "hidden"
                }`}
              >
                Save as Draft
              </Button>
              <Button
                name="submitInvoice"
                type="submit"
                disabled={isSubmitting}
                className="h-11 rounded-full bg-[var(--purple)] px-6 font-semibold text-white hover:bg-[var(--purple)] cursor-pointer"
              >
                {submitLabel}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </LeftSheet>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold tracking-tight text-[var(--purple)]">
      {children}
    </h2>
  );
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

function Grid2({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
  );
}

function Grid3({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{children}</div>
  );
}

function FieldBlock({
  label,
  error,
  children,
  compact = false,
  showLabelSS,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
  compact?: boolean;
  showLabelSS?: boolean;
}) {
  return (
    <div className={cx("space-y-2", compact && "space-y-1")}>
      {label ? (
        <Label
          className={cx(
            "text-[0.72rem] font-medium text-[var(--color-card-foreground)]",
            error && "text-[var(--red)]",
            showLabelSS && "sm:hidden"
          )}
        >
          {label}
        </Label>
      ) : null}
      {children}
      {error ? (
        <p className="px-1 text-xs font-medium text-[var(--red)]">{error}</p>
      ) : null}
    </div>
  );
}

function inputClass(error?: string) {
  return cx(
    "h-11 rounded-md border-[var(--color-border)] bg-[var(--color-input)] text-sm font-medium text-[var(--color-primary-foreground)] shadow-none placeholder:text-[var(--color-card-foreground)] focus-visible:ring-1 focus-visible:ring-violet-500",
    error && "border-[var(--red)] focus-visible:ring-red-500"
  );
}

/*
Usage example:

import { InvoiceFormSheet, useInvoiceStore } from "@/components/invoice-form-sheet";

function Page() {
  const openEdit = useInvoiceStore((s) => s.openEdit);
  const openCreate = useInvoiceStore((s) => s.openCreate);

  return (
    <>
      <button onClick={() => openCreate()}>New Invoice</button>
      <button onClick={() => openEdit("invoice-id")}>Edit Invoice</button>
      <InvoiceFormSheet createInvoiceNumber="XM9141" />
    </>
  );
}

Required packages:
- zustand
- react-hook-form
- zod
- @hookform/resolvers
- @iconify/react
- shadcn/ui components: button, input, label, select, sheet, scroll-area
*/
