import { create } from 'zustand';

// Exemplo do modalstore.ts (Zustand)
type ModalState = null | 'createCategory' | 'registerProduct' | 'entrada';

interface ModalStore {
  modalState: ModalState;
  setModalState: (state: ModalState) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalState: null,
  setModalState: (state) => set({ modalState: state }),
}));

