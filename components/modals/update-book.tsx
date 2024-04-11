"use client";
import React, { useEffect } from "react";

import { format } from "date-fns";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/tw-merge";
import { CalendarIcon, SquarePen } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

import { createClient } from "@/utils/supabase/client";
import { booksStore } from "@/store/books";
import { formSchema } from "@/schema/book-schema";
import { useBooks } from "@/hooks/useBooks";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";

export const UpdateBookModal = () => {
  const supabase = createClient();
  const { refetch } = useBooks();
  const { id } = booksStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      published_date: new Date(),
    },
  });

  useEffect(() => {
    const getSingleBook = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", id)
        .single();
      if (error) return;
      const { title, author, genre, published_date } = data;
      form.setValue("author", author);
      form.setValue("title", title);
      form.setValue("genre", genre);
      form.setValue("published_date", new Date(published_date));
    };

    getSingleBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!id) return;
    const { error } = await supabase
      .from("books")
      .update({ ...values })
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    form.reset();
    refetch();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full flex items-center justify-between">
          <div className="flex">
            <SquarePen className="mr-2 h-4 w-4" />
            <span>Update</span>
          </div>
          <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Input placeholder="Genre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="published_date"
                render={({ field }) => (
                  <FormItem className=" flex flex-col">
                    <FormLabel>Published Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
