// features/categories/api/use-bulk-delete-categories.ts
import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"]

export const useBulkDeleteCategories = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType, 
    Error, 
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.categories["bulk-delete"]["$post"]({json});
      return (await response.json()) as ResponseType
    },
    onSuccess: () => {
      toast.success("Category deleted")
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // TODO :also invalidate summary
    },
    onError: () => {
      toast.error("Failed to delete category")
    },
  })

  return mutation
}
