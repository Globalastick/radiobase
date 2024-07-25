import axios from 'axios'
import { IRadioBrowserQuaryParams } from 'src/types/radiobrowser.types'
import { IStation } from 'src/types/station.types'
import { defaultFavoriteStationIds } from './defaultStations'

const baseURL =
	window.location.protocol === 'http:'
		? 'http://de1.api.radio-browser.info/json'
		: 'https://de1.api.radio-browser.info/json'

export const LIMIT = 50

const defaultParams: IRadioBrowserQuaryParams = {
	limit: LIMIT,
	offset: 0,
	hidebroken: true,
	order: 'votes',
	reverse: true,
}

const requestApi = async (url: string, params?: Partial<IRadioBrowserQuaryParams>) => {
	const { data } = await axios<IStation[]>({
		method: 'GET',
		baseURL: baseURL,
		url: url,
		params: { ...defaultParams, ...params },
	})
	return data
}

export const searchStation = async (searchString: string, offset: number = 0) => {
	return requestApi('/stations/search', { offset, name: searchString })
}

export const getTopVoted = async (offset: number = 0) => {
	return requestApi('/stations/topvote', { offset })
}

export const getTopClicked = async (offset: number = 0) => {
	return requestApi('/stations/topclick', { offset, order: 'clickcount' })
}

export const getStationById = async (stationId: string) => {
	return requestApi('/stations/byuuid', { uuids: stationId })
}

export const getInitialFavoriteStations = async () => {
	const data = await requestApi('/stations/byuuid', {
		uuids: defaultFavoriteStationIds.toString(),
	})

	return data.sort((a, b) => {
		return (
			defaultFavoriteStationIds.indexOf(a.stationuuid) -
			defaultFavoriteStationIds.indexOf(b.stationuuid)
		)
	})
}
