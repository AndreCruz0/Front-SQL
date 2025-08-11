import { ToastContainer } from 'react-toastify';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import EntryModal from './layout/EntryModal';
import List from './layout/List';
import Nav from './layout/Nav';
import { useSelectedCategoryStore } from './stores/categorystoreselected';
import { useHiddenStore } from './stores/hiddenstore';
import { useModalStore } from './stores/modalstore';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
	const hidden = useHiddenStore((state) => state.hidden);
	const selectedCategory = useSelectedCategoryStore(
		(state) => state.selectedCategory,
	);

	const modalState = useModalStore((state) => state.modalState);
	const setModalState = useModalStore((state) => state.setModalState);

	return (
		<main className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
			<ToastContainer position="top-right" autoClose={3000} />

			<Card className="bg-gray-800 text-gray-100 shadow-lg rounded-xl mb-6 border border-gray-700">
				<CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
					<div className="text-xl sm:text-2xl font-bold">
						Painel de Gerenciamento
					</div>

					<div>
						<Button
							className="cursor-pointer whitespace-nowrap text-gray-100 font-semibold px-6 py-2 rounded-lg
                         bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
							onClick={() => setModalState('entrada')}
						>
							Gerenciar Entradas e Saídas
						</Button>
					</div>
				</CardContent>
			</Card>

			<Nav />

			{!hidden && selectedCategory?.id && <List />}

			{modalState === 'entrada' && <EntryModal />}
		</main>
	);
}
