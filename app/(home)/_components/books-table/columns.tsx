"use client";

import { UpdateBookModal } from "@/components/modals/update-book";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, SquarePen, Trash } from "lucide-react";
import { booksStore } from "@/store/books";
import { DeleteBookModal } from "@/components/modals/delete-book";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Books = {
  id: string;
  author: string;
  title: string;
  genre: string;
  created_at: Date;
  published_date: Date;
};

export const columns: ColumnDef<Books>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { update, delete: deleteBook } = booksStore();
      const book = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                update(book.id);
              }}
            >
              <UpdateBookModal />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-300"
              onSelect={(e) => {
                e.preventDefault();
                deleteBook(book.id);
              }}
            >
              <DeleteBookModal />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
