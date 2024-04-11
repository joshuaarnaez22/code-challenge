import { z } from "zod";

export const formSchema = z.object({
  author: z.string().min(1, {
    message: "Author is required",
  }),
  title: z.string().min(1, {
    message: "Title is required",
  }),
  genre: z.string().min(1, {
    message: "Genre is required",
  }),
  published_date: z.date({
    required_error: "Published date is required",
  }),
});
