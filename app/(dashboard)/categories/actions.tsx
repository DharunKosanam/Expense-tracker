"use client"

import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { useOpenCategory } from "@/features/categories/hooks/use-open-category";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";


type Props = {
    id:string;
}

export const Actions = ({ id }: Props) => {
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this category."
    )

    const deleteMuatation = useDeleteCategory();
    const { onOpen } = useOpenCategory();

    const handleDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMuatation.mutate();
        }
    }

    return (
        <>
        <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant= "ghost" className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        disabled={deleteMuatation.isPending}
                        onClick={() => onOpen(id)}
                    >
                        <Edit className="size-4 mr-2" />
                            Edit 
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={deleteMuatation.isPending}
                        onClick={handleDelete}
                    >
                        <Trash className="size-4 mr-2" />
                            Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}