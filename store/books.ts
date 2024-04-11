import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

export interface BooksState {
  id: string;
  update: (id: string) => void;
  delete: (id: string) => void;
}

export const booksStore = create<BooksState>((set) => ({
  id: "",
  update: (state) => set(() => ({ id: state })),
  delete: (state) => set(() => ({ id: state })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("book-store", booksStore);
}
