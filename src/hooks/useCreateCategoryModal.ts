import type { ModalState } from '@/stores/modalstore';
import { logger } from '@/utils/logger';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCategoriesStore } from '../stores/categorystore';

export function useCreateCategoryModal(
	setModalState: (state: ModalState) => void,
) {
	const [name, setName] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			await axios.post('http://localhost:3001/categories/create', { name });
			toast.success('Categoria criada com sucesso!');
			await fetchCategories();
			setModalState(null);
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				const message = err.response?.data?.message || 'Erro padrão';
				setError(message);
				logger.error(message);
			} else {
				setError('Erro inesperado');
				toast.error('Erro inesperado');
			}
		} finally {
			setLoading(false);
		}
	}

	return { name, setName, error, loading, onSubmit };
}
