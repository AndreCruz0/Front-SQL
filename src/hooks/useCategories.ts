import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { handleErrorMessage } from '@/utils/errorUtils';
import { logger } from '@/utils/logger';

export interface Category {
	id: string | number;
	name: string;
}

export function useCategories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchCategories() {
			setLoading(true);
			try {
				const response = await axios.get<Category[]>('http://localhost:3001/category');
				setCategories(response.data);
			} catch (error: unknown) {
				const message = handleErrorMessage(error);
				logger.error(`Erro ao buscar categorias: ${message}`);
			} finally {
				setLoading(false);
			}
		}
		fetchCategories();
	}, []);

	return { categories, loading };
}
