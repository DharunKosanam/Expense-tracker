// features/categories/components/edit-category-sheet.tsx
"use client"

import { useOpenCategory } from "../hooks/use-open-category"
import { CategoryForm, type FormValues } from "./category-form"
import { useGetCategory } from "../api/use-get-category"
import { useEditCategory } from "@/features/categories/api/use-edit-category"
import { useDeleteCategory } from "@/features/categories/api/use-delete-category"
import { useConfirm } from "@/hooks/use-confirm"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Loader2 } from "lucide-react"

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory()

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category."
  )


  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMuatation = useDeleteCategory(id);

  const isPending = 
    editMutation.isPending
    deleteMuatation.isPending;


  const isLoading = categoryQuery.isLoading

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

  const defaultValues = categoryQuery.data
    ? { name: categoryQuery.data.name }
    : { name: "" }

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={open => !open && onClose()}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Edit Category
            </SheetTitle>
            <SheetDescription>
              Edit an existing category.
            </SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
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
