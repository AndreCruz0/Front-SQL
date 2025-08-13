import { create } from 'zustand';

interface HiddenStore {
	hidden: boolean | null;
	setHidden: (hidden: boolean) => void;
}

export const useHiddenStore = create<HiddenStore>((set) => ({
	hidden: true,
	setHidden: (hidden) => set({ hidden: hidden }),
}));
