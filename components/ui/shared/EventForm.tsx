'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EventFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "./FileUploader"


type EventFormProps = {
  userId: string
  type: "Create" | "Update"
}
const EventForm = ({ userId, type }: EventFormProps) => {

    
    const initialValues = eventDefaultValues;
  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: initialValues
  })
  function onSubmit(values: z.infer<typeof EventFormSchema>) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div  className="flex flex-col gap-5 md:flex-row">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Event title" {...field} className="input-field"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"  // Wrong - uppercase 'C'
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
              <Dropdown onChangeHandler={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
<div className="flex flex-col gap-5 md:flex-row">


       <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-72">
                <Textarea placeholder="Description" {...field} className="textarea rounded-2xl"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-72">
<FileUploader/>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


</div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
export default EventForm
