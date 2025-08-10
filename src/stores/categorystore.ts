import { create } from "zustand";

interface Category {
	id: string | number;
	name: string;
}

interface CategoriesStore {
	categories: Category[];
	setCategories: (categories: Category[]) => void;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
	categories: [],
	setCategories: (categories) => set({ categories }),
}));
