// src/stores/categoryStore.ts
import { create } from "zustand";



interface HiddenStore {
  hidden: boolean | false;
  setHidden: (hidden: boolean) => void;
}

export const useHiddenStore = create<HiddenStore>((set) => ({
  hidden: false,
  setHidden: (hidden) => set({ hidden: hidden }),
}));
