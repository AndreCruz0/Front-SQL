import {
	modalTransition,
	modalVariants,
	overlayVariants,
} from '@/animations/modalAnimations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { useCreateCategoryModal } from '@/hooks/useCreateCategoryModal';
import { useModalStore } from '@/stores/modalstore';
import { AnimatePresence, motion } from 'framer-motion';

export default function CreateCategoryModal() {
	const setModalState = useModalStore((state) => state.setModalState);
	const { name, setName, error, loading, onSubmit } =
		useCreateCategoryModal(setModalState);

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-sm"
				variants={overlayVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<motion.div
					variants={modalVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					transition={modalTransition}
				>
					<Card className="max-w-md w-screen shadow-2xl border border-gray-700 bg-gray-800 text-gray-100">
						<CardContent>
							<h2 className="text-lg font-bold mb-4 text-gray-200">
								Criar Categoria
							</h2>

							{error && (
								<div className="mb-2 p-2 bg-red-900 text-red-300 rounded shadow">
									{error}
								</div>
							)}

							<form onSubmit={onSubmit} className="space-y-4">
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Nome da categoria"
									required
									className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
								/>

								<div className="flex justify-end space-x-2">
									<Button
										type="button"
										className="bg-red-800 hover:bg-red-700 text-gray-100"
										onClick={() => setModalState(null)}
										disabled={loading}
									>
										Cancelar
									</Button>
									<Button
										type="submit"
										className="bg-gray-700 hover:bg-gray-600 text-gray-100"
										disabled={loading}
									>
										Criar
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
