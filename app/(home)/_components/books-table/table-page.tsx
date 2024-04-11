"use client";
import { useBooks } from "@/hooks/useBooks";
import { Books, columns } from "./columns";
import { DataTable } from "./data-table";

export default function TablePage() {
  const { data, error } = useBooks();

  if (!data) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>something went wrong...</div>;
  }
  return (
    <div className="container  ">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
