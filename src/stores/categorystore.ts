// src/stores/categoryStore.ts
import { create } from "zustand";

interface Category {
  id: number;
  name: string;
}

interface CategoryStore {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
