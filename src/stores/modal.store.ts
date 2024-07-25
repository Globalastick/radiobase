import { create } from 'zustand'

interface IModalStore {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	toggleModal: () => void
}

export const useModalStore = create<IModalStore>((set) => ({
	isOpen: false,
	setIsOpen: (isOpen) => set({ isOpen }),
	toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}))
