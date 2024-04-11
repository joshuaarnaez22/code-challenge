import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useBooks } from "@/hooks/useBooks";
import { booksStore } from "@/store/books";
import { createClient } from "@/utils/supabase/client";
import { Trash } from "lucide-react";

import { DropdownMenuShortcut } from "../ui/dropdown-menu";

export const DeleteBookModal = () => {
  const supabase = createClient();
  const { refetch } = useBooks();
  const { id } = booksStore();

  const deleteBook = async () => {
    const { error } = await supabase.from("books").delete().eq("id", id);
    if (error) throw new Error(error.message);
    refetch();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="w-full flex items-center justify-between">
          <div className="flex">
            <Trash className="mr-2 h-4 w-4 " />
            <span>Delete</span>
          </div>
          <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your book
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteBook}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
