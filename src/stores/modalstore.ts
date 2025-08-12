import { create } from 'zustand';

export type ModalState =
	| 'entrada'
	| 'createCategory'
	| 'registerProduct'
	| null;

interface ModalStore {
	modalState: ModalState;
	setModalState: (state: ModalState) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
	modalState: null,
	setModalState: (state) => set({ modalState: state }),
}));
