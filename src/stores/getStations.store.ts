import { AxiosError } from 'axios'
import { getTopClicked, getTopVoted, LIMIT, searchStation } from 'src/api/radiobrowser.api'
import { IStation } from 'src/types/station.types'
import { create } from 'zustand'

type GetByType = 'name' | 'topvote' | 'topclick'

interface IUseGetStations {
	isLoading: boolean
	isError: boolean
	errorMessage: string
	stations: IStation[]
	nameForSearch: string
	offset: number
	getBy: GetByType
	isAvailableLoadMore: boolean
	updateStations: (newStations: IStation[]) => void
	getStations: () => void
	getStationsByName: (newName: string) => void
	getStationsByTopVote: () => void
	getStationsByTopClick: () => void
	getMoreStations: () => void
}

export const useGetStationsStore = create<IUseGetStations>((set, get) => ({
	isLoading: false,
	isError: false,
	errorMessage: '',
	stations: [],
	nameForSearch: '',
	offset: 0,
	getBy: 'topvote',
	isAvailableLoadMore: false,
	updateStations: (newStations) => {
		if (get().offset === 0) {
			set({ stations: newStations })
			if (newStations.length === 0) {
				set({ isError: true, errorMessage: 'No one station found' })
			}
		} else {
			set((state) => ({
				stations: [...state.stations, ...newStations],
			}))
		}
	},
	getStations: async () => {
		set({ isLoading: true, isError: false, errorMessage: '' })

		const queries: Record<GetByType, () => Promise<IStation[]>> = {
			name: () => searchStation(get().nameForSearch, get().offset),
			topvote: () => getTopVoted(get().offset),
			topclick: () => getTopClicked(get().offset),
		}

		const getByQuery = queries[get().getBy]

		getByQuery()
			.then((foundResult) => {
				if (foundResult.length < LIMIT) {
					set({ isAvailableLoadMore: false })
				} else {
					set({ isAvailableLoadMore: true })
				}

				get().updateStations(foundResult)
			})
			.catch((error: AxiosError) => {
				set({ isError: true, errorMessage: error.message })
			})
			.finally(() => {
				set({ isLoading: false })
			})
	},
	getStationsByName: (newName) => {
		set({ nameForSearch: newName, offset: 0, getBy: 'name' })
		get().getStations()
	},
	getStationsByTopVote: () => {
		set({ nameForSearch: '', offset: 0, getBy: 'topvote' })
		get().getStations()
	},
	getStationsByTopClick: () => {
		set({ nameForSearch: '', offset: 0, getBy: 'topclick' })
		get().getStations()
	},
	getMoreStations: () => {
		set((state) => ({ offset: state.offset + LIMIT }))
		get().getStations()
	},
}))
