import { create } from 'zustand'

interface ISearchElementStore {
	showStationsSearchElement: boolean
	toggleOpen: () => void
}

export const useSearchElementStore = create<ISearchElementStore>((set) => ({
	showStationsSearchElement: false,
	toggleOpen: () =>
		set((state) => ({ showStationsSearchElement: !state.showStationsSearchElement })),
}))
