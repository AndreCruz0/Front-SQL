import { handleErrorMessage } from '@/utils/errorUtils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';

interface Category {
	id: string | number;
	name: string;
}

interface CategoriesStore {
	categories: Category[];
	loading: boolean;
	setCategories: (categories: Category[]) => void;
	fetchCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
	categories: [],
	loading: false,
	setCategories: (categories) => set({ categories }),
	fetchCategories: async () => {
		set({ loading: true });
		try {
			const res = await axios.get<Category[]>(
				'http://localhost:3001/categories/list',
			);
			set({ categories: res.data });
		} catch (error: unknown) {
			const message = handleErrorMessage(error);
			toast.error(`Erro ao buscar categorias: ${message}`);
		} finally {
			set({ loading: false });
		}
	},
}));
