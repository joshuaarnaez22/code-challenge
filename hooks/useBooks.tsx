import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useBooks = () => {
  const supabase = createClient();

  const fetchBooks = async () => {
    let { data: books, error } = await supabase
      .from("books")
      .select("*")
      .order("id", { ascending: true });
    if (error) throw new Error(error.message);
    return books;
  };

  return useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
};
