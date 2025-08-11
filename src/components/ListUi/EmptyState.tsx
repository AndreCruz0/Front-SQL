import { TableCell } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { useState } from 'react';

const shakeVariant = {
	initial: { x: 0 },
	animate: {
		x: [0, -8, 8, -8, 8, 0],
		transition: { duration: 0.5 },
	},
};

export function EmptyState() {
	const [shake, setShake] = useState(false);

	return (
		<motion.tr
			variants={shakeVariant}
			initial="initial"
			animate={shake ? 'animate' : 'initial'}
			onClick={() => {
				setShake(true);
				setTimeout(() => setShake(false), 600);
			}}
			className="cursor-pointer select-none bg-gray-900 hover:bg-gray-800 transition-colors"
		>
			<TableCell
				colSpan={4}
				className="text-center py-4 text-gray-300 font-medium"
			>
				Nenhum produto encontrado — clique aqui
			</TableCell>
		</motion.tr>
	);
}
