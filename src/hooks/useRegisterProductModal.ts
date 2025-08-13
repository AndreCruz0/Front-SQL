import type { ModalState } from '@/stores/modalstore';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
interface Category {
	id: number;
	name: string;
}

export function useRegisterProductModal(
	setModalState: (state: ModalState) => void,
) {
	const [name, setName] = useState('');
	const [categoryId, setCategoryId] = useState<number | null>(null);
	const [price, setPrice] = useState<number | ''>('');
	const [qty, setQty] = useState<number | ''>('');
	const [categories, setCategories] = useState<Category[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect( () => {
		async function sexo(){
			const response = await axios.get('http://localhost:3001/categories/list')
			setCategories(response.data)
		}
			
			sexo()
	}, []);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);

		if (!categoryId) {
			const msg = 'Selecione uma categoria';
			setError(msg);
			toast.error(msg);
			return;
		}
		if (!name || !price || qty !== 0 && !qty) {
			const msg = 'Preencha todos os campos';
			setError(msg);
			toast.error(msg);
			return;
		}

		setLoading(true);
		try {
			await axios.post('http://localhost:3001/products/register', {
				name,
				category_id: categoryId,
				price,
				qty,
			});
			toast.success('Produto cadastrado com sucesso!');
			setModalState(null);
			
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				const message = err.response?.data?.message || 'Erro padrão';
				setError(message);
			}
			setError('Erro inesperado');
		}
	}

	return {
		name,
		setName,
		categoryId,
		setCategoryId,
		price,
		setPrice,
		qty,
		setQty,
		categories,
		error,
		loading,
		onSubmit,
	};
}
