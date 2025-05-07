// features/accounts/components/account-form.tsx
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { insertAccountSchema } from "@/db/schema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

const formSchema = insertAccountSchema.pick({ name: true })

export type FormValues = z.input<typeof formSchema>

type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (values: FormValues) => void
  onDelete?: () => void
  disabled?: boolean
}

export const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled = false,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Cash, Bank, Credit Card"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={disabled}>
          {id ? "Save changes" : "Create account"}
        </Button>

        {id && onDelete && (
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={onDelete}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete account
          </Button>
        )}
      </form>
    </Form>
  )
}
