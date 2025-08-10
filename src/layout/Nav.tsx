import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useCategoriesStore } from '../stores/categorystore';
import { useSelectedCategoryStore } from '../stores/categorystoreselected';
import { useHiddenStore } from '../stores/hiddenstore';

interface Category {
	id: string | number;
	name: string;
}

export default function Nav() {
	const [loading, setLoading] = useState(false);
	const categories = useCategoriesStore((state) => state.categories);
	const setCategories = useCategoriesStore((state) => state.setCategories);
	const selectedCategory = useSelectedCategoryStore(
		(state) => state.selectedCategory,
	);
	const setSelectedCategory = useSelectedCategoryStore(
		(state) => state.setSelectedCategory,
	);
	const hidden = useHiddenStore((state) => state.hidden);
	const setHidden = useHiddenStore((state) => state.setHidden);

	useEffect(() => {
		async function fetchCategories() {
			setLoading(true);
			try {
				const response = await axios.get<Category[]>(
					'http://localhost:3001/category',
				);
				setCategories(response.data);
			} catch (error) {
				console.error('Erro ao buscar categorias:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchCategories();
	}, [setCategories]);

	if (loading) return <p>Carregando categorias...</p>;

	return (
		<nav className="flex gap-4">
			{categories.map((category) => (
				<Card key={category.id}>
					<CardContent>
						<Button
							className="cursor-pointer"
							onClick={() => {
								if (selectedCategory.id === category.id) {
									setHidden(true);
									setSelectedCategory({ id: '', name: '' });
								} else {
									setSelectedCategory(category);
									if (hidden) setHidden(false);
								}
							}}
						>
							{category.name}
						</Button>
					</CardContent>
				</Card>
			))}
		</nav>
	);
}
