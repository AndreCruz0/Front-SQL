import type { ModalState } from '@/stores/modalstore';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function useCreateCategoryModal(
	setModalState: (state: ModalState) => void,
) {
	const [name, setName] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await axios.post('http://localhost:3001/categories/create', { name });
			toast.success('Categoria criada com sucesso!');
			setModalState(null);
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				const message = err.response?.data?.message || 'Erro padrão';
				setError(message);
				toast.error(message);
			}
			setError('Erro inesperado');
		}
	}

	return { name, setName, error, loading, onSubmit };
}
