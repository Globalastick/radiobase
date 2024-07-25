import { create } from 'zustand'

interface IConfirmStore {
	isOpen: boolean
	title: string
	onConfirm: () => void
	open: (title: string, callback: () => void) => void
	onClose: () => void
}

export const useConfirmStore = create<IConfirmStore>((set) => ({
	isOpen: false,
	title: 'Confirm title',
	onConfirm: () => {
		// Callback placeholder
		console.error('There is no onConfirm function')
	},
	open: (title, onConfirm) => set({ isOpen: true, title, onConfirm }),
	onClose: () => set({ isOpen: false }),
}))
