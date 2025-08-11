import { selectTransitionVariants } from '@/animations/uiAnimations';
import { TableCell } from '@/components/ui/table';
import { motion } from 'framer-motion';

interface Product {
	id: string | number;
	name: string;
	qty: number | string;
	price: number | string;
}

interface ProductRowProps {
	product: Product;
	index: number;
	handleChange: (index: number, field: keyof Product, value: string) => void;
}

export function ProductRow({ product, index, handleChange }: ProductRowProps) {
	const { id = '', name = '', qty = 0, price = 0 } = product || {};

	const formattedId =
		typeof id === 'number'
			? `#${id.toString().padStart(4, '0')}`
			: typeof id === 'string'
				? `#${id}`
				: '';

	return (
		<motion.tr
			key={id}
			layout
			variants={selectTransitionVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className="
				hover:bg-gray-800 transition-colors
				block sm:table-row mb-4 sm:mb-0
				border border-gray-700 rounded-lg sm:rounded-none
				p-4 sm:p-0
			"
		>
			<TableCell
				className="
					font-semibold text-gray-200 block sm:table-cell sm:px-3 mb-4 sm:mb-0
					border-b border-gray-700 sm:border-b-0 sm:border-r
				"
				data-label="ID"
			>
				<span className="text-gray-400 hidden sm:inline">ID: </span>
				{formattedId}
			</TableCell>
			<TableCell
				className="
					block sm:table-cell sm:px-3 mb-4 sm:mb-0
					border-b border-gray-700 sm:border-b-0 sm:border-r
				"
				data-label="Nome"
			>
				<label
					htmlFor={`name-${id}`}
					className="block text-gray-400 text-xs mb-1 sm:hidden"
				>
					Nome
				</label>
				<input
					id={`name-${id}`}
					className="w-full max-w-[200px] px-2 py-1 border border-gray-600 rounded-md
						focus:outline-none focus:ring-2 focus:ring-gray-500
						bg-gray-900 text-gray-100"
					name={`name-${id}`}
					value={name}
					onChange={(e) => handleChange(index, 'name', e.target.value)}
					required
				/>
			</TableCell>

			<TableCell
				className="
					block sm:table-cell sm:px-3 mb-4 sm:mb-0
					border-b border-gray-700 sm:border-b-0 sm:border-r
				"
				data-label="Quantidade"
			>
				<label
					htmlFor={`qty-${id}`}
					className="block text-gray-400 text-xs mb-1 sm:hidden"
				>
					Quantidade
				</label>
				<input
					id={`qty-${id}`}
					className="w-full max-w-[100px] px-2 py-1 border border-gray-600 rounded-md
						focus:outline-none focus:ring-2 focus:ring-gray-500
						bg-gray-900 text-gray-100"
					name={`qty-${id}`}
					type="number"
					min={0}
					value={qty}
					onChange={(e) => handleChange(index, 'qty', e.target.value)}
					required
				/>
			</TableCell>

			<TableCell
				className="
					sm:text-right block sm:table-cell sm:px-3 mb-4  sm:mb-0
				"
				data-label="Preço"
			>
				<label
					htmlFor={`price-${id}`}
					className="block text-gray-400 text-xs mb-1 sm:hidden sm:text-right "
				>
					Preço
				</label>
				<input
					id={`price-${id}`}
					className="w-full max-w-[100px] px-2 py-1 border border-gray-600 rounded-md
						focus:outline-none focus:ring-2 focus:ring-gray-500
						bg-gray-900 text-gray-100 "
					name={`price-${id}`}
					type="number"
					step="0.01"
					min={0}
					value={price}
					onChange={(e) => handleChange(index, 'price', e.target.value)}
					required
				/>
			</TableCell>
		</motion.tr>
	);
}
