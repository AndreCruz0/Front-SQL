import { create } from "zustand";

type ModalType = "entrada" | "saida" | null;

interface ModalStore {
  modalState: ModalType;
  setModalState: (state: ModalType) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalState: null,
  setModalState: (state) => set({ modalState: state }),
}));
