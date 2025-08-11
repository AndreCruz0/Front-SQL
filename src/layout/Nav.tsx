import {
	selectTransitionVariants,
	skeletonVariants,
} from '@/animations/uiAnimations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
			} catch (error: any) {
				toast.error(`Erro ao buscar categorias: ${error.message || error}`);
			} finally {
				setLoading(false);
			}
		}
		fetchCategories();
	}, [setCategories]);

	if (loading) {
		return (
			<nav className="flex gap-4 my-4">
				{[...Array(3)].map((_, i) => (
					<motion.div
						key={i}
						className="w-32 h-10 bg-gray-700 rounded-xl"
						variants={skeletonVariants}
						initial="loading"
						animate="loading"
					/>
				))}
			</nav>
		);
	}

	return (
		<nav className="flex flex-wrap gap-4 my-4">
			<AnimatePresence mode="wait">
				{categories.map((category) => (
					<motion.div
						key={category.id}
						layout
						variants={selectTransitionVariants}
						initial="initial"
						animate="animate"
						exit="exit"
					>
						<Card className="flex-shrink-0 shadow-md rounded-xl border border-gray-700 bg-gray-800">
							<CardContent>
								<Button
									className={`cursor-pointer whitespace-nowrap text-gray-100 font-semibold px-6 py-2 rounded-lg 
                    ${
											selectedCategory.id === category.id
												? 'bg-gray-700 border border-gray-600'
												: 'bg-gray-800 hover:bg-gray-700'
										}`}
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
					</motion.div>
				))}
			</AnimatePresence>
		</nav>
	);
}
