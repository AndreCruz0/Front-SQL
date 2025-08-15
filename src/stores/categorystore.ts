import { handleErrorMessage } from '@/utils/errorUtils';
import { logger } from '@/utils/logger';
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
			logger.error(error, 'Erro ao buscar categorias');
			toast.error(`Erro ao buscar categorias`);
		} finally {
			set({ loading: false });
		}
	},
}));
