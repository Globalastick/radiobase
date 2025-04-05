import axios from 'axios'
import { IRadioBrowserQuaryParams } from 'src/types/radiobrowser.types'
import { IStation } from 'src/types/station.types'
import { defaultFavoriteStationIds } from './defaultStations'

let baseURL: string | undefined

export const LIMIT = 50

type ServerInfo = {
	ip: string
	name: string
}

const getBaseUrls = async (): Promise<string[]> => {
	const { data } = await axios<ServerInfo[]>('https://all.api.radio-browser.info/json/servers')
	const protocol = window.location.protocol === 'http:' ? 'http://' : 'https://'
	const baseUrls = data.map((server) => `${protocol}${server.name}/json`)
	return baseUrls
}

const getRandomBaseUrl = async () => {
	const baseUrls = await getBaseUrls()
	return baseUrls[Math.floor(Math.random() * baseUrls.length)]
}

const getBaseUrl = async () => {
	if (!baseURL) {
		baseURL = await getRandomBaseUrl()
		return baseURL
	}

	return baseURL
}

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
		baseURL: await getBaseUrl(),
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

export const getStationsById = async (uuids: string | string[]) => {
	return requestApi('/stations/byuuid', { uuids: uuids.toString() })
}

export const getInitialFavoriteStations = async () => {
	const data = await getStationsById(defaultFavoriteStationIds)

	return data.sort((a, b) => {
		return (
			defaultFavoriteStationIds.indexOf(a.stationuuid) -
			defaultFavoriteStationIds.indexOf(b.stationuuid)
		)
	})
}
