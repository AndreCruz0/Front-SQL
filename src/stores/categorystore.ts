// No store de categorias
import {create} from "zustand";

interface Category {
  id: string | number;
  name: string;
}

interface CategoryStore {
  selectedCategory: Category; 
  setSelectedCategory: (category: Category) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategory: { id: "", name: "" },
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
