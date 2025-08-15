import { handleErrorMessage } from '@/utils/errorUtils';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import {
	type Product,
	updateProductsBulk,
} from '../services/updateProduct.service';
import { logger } from '@/utils/logger';
export function useProductBulkEdit(selectedCategory: {
	id?: number | string;
	name?: string;
}) {
	const [products, setProducts] = useState<Product[]>([]);
	const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	const originalMap = useMemo(() => {
		const map: Record<string | number, Product> = {};
		originalProducts.forEach((p) => {
			map[p.id] = p;
		});
		return map;
	}, [originalProducts]);

	const fetchProducts = useCallback(async () => {
		if (!selectedCategory?.id) {
			setProducts([]);
			setOriginalProducts([]);
			return;
		}
		try {
			setLoading(true);
			const response = await axios.get<Product[]>(
				`http://localhost:3001/products/category/${selectedCategory.id}`,
			);
			setProducts(response.data);
			setOriginalProducts(response.data);
		} catch (error: unknown) {
			toast.error(`Erro ao buscar produtos`)
			logger.error(error, 'Erro ao buscar produtos');
		} finally {
			setLoading(false);
		}
	}, [selectedCategory]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	function handleChange(index: number, field: keyof Product, value: string) {
		setProducts((prev) => {
			const productsCopy = [...prev];
			productsCopy[index] = {
				...productsCopy[index],
				[field]: field === 'name' ? value : Number(value),
			};
			return productsCopy;
		});
	}

	function isEdited(product: Product) {
		const original = originalMap[product.id];

		return (
			product.name !== original.name ||
			product.qty !== original.qty ||
			product.price !== original.price
		);
	}

	async function handleSubmit() {
		try {
			const editedProducts = products.filter(isEdited);

			if (editedProducts.length === 0) {
				toast.info('Nenhum produto foi alterado');
				return;
			}

			const invalidProduct = editedProducts.find(
				(p) => p.name.trim().length < 3,
			);
			if (invalidProduct) {
				toast.error('O nome do produto deve ter pelo menos 3 caracteres');
				return;
			}

			const res = await updateProductsBulk(editedProducts);
			toast.success(res.message);
			await fetchProducts();
		} catch (error: unknown) {
			toast.error('Erro ao atualizar produtos');
			logger.error(error, 'Erro ao atualizar produtos');
		}
	}

	return {
		products,
		loading,
		handleChange,
		handleSubmit,
		refetch: fetchProducts,
	};
}
