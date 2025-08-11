import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { AnimatePresence } from 'framer-motion';
import { EmptyState } from '../components/ListUi/EmptyState';
import { ProductRow } from '../components/ListUi/ProductRow';
import { ProductSkeleton } from '../components/ListUi/ProductSkeleton';
import { useProductBulkEdit } from '../hooks/useProductBulkEdit';
import { useSelectedCategoryStore } from '../stores/categorystoreselected';
import { useHiddenStore } from '../stores/hiddenstore';

export default function List() {
	const hidden = useHiddenStore((state) => state.hidden);
	const selectedCategory = useSelectedCategoryStore(
		(state) => state.selectedCategory,
	);
	const { products, handleChange, handleSubmit, loading } =
		useProductBulkEdit(selectedCategory);

	if (hidden) return null;

	return (
		<main className="overflow-auto mt-6">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				className="min-w-[320px]"
			>
				{loading ? (
					<ProductSkeleton />
				) : (
					<>
						<Table className="table-auto w-full border-collapse rounded-xl shadow-lg overflow-hidden">
							<TableCaption className="text-left text-gray-400 mb-2">
								Produtos da categoria <strong>{selectedCategory?.name}</strong>
							</TableCaption>

							{/* Cabeçalho desktop escondido no mobile */}
							<TableHeader>
								<TableRow className="bg-gray-800 hidden sm:table-row">
									<TableHead className="text-white">ID</TableHead>
									<TableHead className="text-white">Nome</TableHead>
									<TableHead className="text-white">Quantidade</TableHead>
									<TableHead className="flex items-center justify-end text-white sm:mr-15">Preço</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								<AnimatePresence mode="popLayout">
									{products.length > 0 ? (
										products.map((product, index) => (
											<ProductRow
												key={product.id}
												product={product}
												index={index}
												handleChange={handleChange}
											/>
										))
									) : (
										<EmptyState />
									)}
								</AnimatePresence>
							</TableBody>
						</Table>

						{products.length > 0 && (
							<div className="mt-4 flex justify-end">
								<Button
									type="submit"
									className="bg-gray-700 hover:bg-gray-600 text-gray-100 shadow-md"
								>
									Atualizar todos os produtos
								</Button>
							</div>
						)}
					</>
				)}
			</form>
		</main>
	);
}
