import { create } from "zustand";

interface Category {
  id: string | number;
  name: string;
}

interface SelectedCategoryStore {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

export const useSelectedCategoryStore = create<SelectedCategoryStore>((set) => ({
  selectedCategory: { id: "", name: "" },
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
