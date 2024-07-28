import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeType = 'themeLight' | 'themeDark'

interface ISettingsState {
	isAutoplayLastSelectedStaion: boolean
	isShowTrackTitle: boolean
	theme: ThemeType
}

interface ISettingsActions {
	toggleIsAutoplayLastSelectedStaion: () => void
	setTheme: (newTheme: ThemeType) => void
	toggleTheme: () => void
	toggleIsShowTrackTitle: () => void
	resetAllSettings: () => void
}

const initialState: ISettingsState = {
	isAutoplayLastSelectedStaion: false,
	isShowTrackTitle: false,
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
			toggleIsShowTrackTitle: () =>
				set((state) => ({ isShowTrackTitle: !state.isShowTrackTitle })),
			resetAllSettings: () => {
				set({ ...initialState })
			},
		}),
		{
			name: 'settings',
		},
	),
)
