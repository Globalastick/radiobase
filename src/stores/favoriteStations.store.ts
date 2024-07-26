import { getInitialFavoriteStations } from 'src/api/radiobrowser.api'
import { IStation } from 'src/types/station.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IFavoriteStationsState {
	isInitialized: boolean
	favoriteStations: IStation[]
	appendStation: (station: IStation) => void
	removeStation: (station: IStation) => void
	setFavoriteStations: (stations: IStation[]) => void
	resetFavoriteStations: () => void
}

const initialState = {
	isInitialized: false,
	favoriteStations: [],
}

export const useFavoriteStationsStore = create<IFavoriteStationsState>()(
	persist(
		(set, get) => ({
			...initialState,
			appendStation: (station) => {
				const isStationExists = get().favoriteStations.some(
					(s) => s.stationuuid === station.stationuuid,
				)
				if (isStationExists) {
					return
				} else {
					set((state) => ({ favoriteStations: [...state.favoriteStations, station] }))
				}
			},
			removeStation: (station) => {
				set((state) => ({
					favoriteStations: state.favoriteStations.filter(
						(s) => s.stationuuid !== station.stationuuid,
					),
				}))
			},
			setFavoriteStations: (stations) => set({ favoriteStations: stations }),
			resetFavoriteStations: async () => {
				const initialFavoriteStations = await getInitialFavoriteStations()
				set({ favoriteStations: initialFavoriteStations, isInitialized: true })
			},
		}),
		{ name: 'favorite-stations' },
	),
)

if (
	!useFavoriteStationsStore.getState().isInitialized &&
	useFavoriteStationsStore.getState().favoriteStations.length === 0
) {
	useFavoriteStationsStore.getState().resetFavoriteStations()
}
