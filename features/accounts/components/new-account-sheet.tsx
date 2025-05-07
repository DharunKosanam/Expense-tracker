// features/accounts/components/new-account-sheet.tsx
"use client"

import { useNewAccount } from "../hooks/use-new-account"
import { useCreateAccount } from "../api/use-create-account"
import { AccountForm, type FormValues } from "./account-form"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount()
  const mutation = useCreateAccount()

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, { onSuccess: onClose })
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  )
}
