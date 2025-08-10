import { create } from "zustand";

interface Category {
  id: number;
  name: string;
}

interface CategoryStore {
  categories: Category[]; // array de categorias
  setCategories: (categories: Category[]) => void;
}

export const useCategoryStore2 = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));
