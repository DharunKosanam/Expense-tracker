// features/categories/components/new-category-sheet.tsx
"use client"

import { useNewCategory } from "../hooks/use-new-category"
import { useCreateCategory } from "../api/use-create-category"
import { CategoryForm, type FormValues } from "./category-form"



import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory()
  const mutation = useCreateCategory()

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, { onSuccess: onClose })
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            New Category
          </SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  )
}
