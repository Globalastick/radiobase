import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeType = 'themeLight' | 'themeDark'

interface ISettingsState {
	isAutoplayLastSelectedStaion: boolean
	theme: ThemeType
}

interface ISettingsActions {
	toggleIsAutoplayLastSelectedStaion: () => void
	setTheme: (newTheme: ThemeType) => void
	toggleTheme: () => void
	resetAllSettings: () => void
}

const initialState: ISettingsState = {
	isAutoplayLastSelectedStaion: false,
	theme: 'themeLight',
}

export const useSettingsStore = create<ISettingsState & ISettingsActions>()(
	persist(
		(set) => ({
			...initialState,
			toggleIsAutoplayLastSelectedStaion: () =>
				set((state) => ({
					isAutoplayLastSelectedStaion: !state.isAutoplayLastSelectedStaion,
				})),
			setTheme: (newTheme) => set(() => ({ theme: newTheme })),
			toggleTheme: () =>
				set((state) => ({
					theme: state.theme == 'themeLight' ? 'themeDark' : 'themeLight',
				})),
			resetAllSettings: () => {
				set({ ...initialState })
			},
		}),
		{
			name: 'settings',
		},
	),
)
