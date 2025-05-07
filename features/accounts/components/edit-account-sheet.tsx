// features/accounts/components/edit-account-sheet.tsx
"use client"

import { useOpenAccount } from "../hooks/use-open-account"
import { AccountForm, type FormValues } from "./account-form"
import { useGetAccount } from "../api/use-get-account"
import { useEditAccount } from "@/features/accounts/api/use-edit-account"
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account"
import { useConfirm } from "@/hooks/use-confirm"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Loader2 } from "lucide-react"

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount()

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account."
  )


  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMuatation = useDeleteAccount(id);

  const isPending = 
    editMutation.isPending
    deleteMuatation.isPending;


  const isLoading = accountQuery.isLoading

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, { onSuccess: onClose })
  }

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMuatation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        }
      })
    }
  }

  const defaultValues = accountQuery.data
    ? { name: accountQuery.data.name }
    : { name: "" }

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={open => !open && onClose()}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Edit Account
            </SheetTitle>
            <SheetDescription>
              Edit an existing account.
            </SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
