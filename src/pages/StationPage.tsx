import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { getStationsById } from 'src/api/radiobrowser.api'
import { StationCard } from 'src/components/station-card'
import { LoadingBall } from 'src/components/ui/LoadingBall'
import { StationLogo } from 'src/components/ui/StationLogo'
import { PageNotFound } from 'src/pages/PageNotFound'
import { useFavoriteStationsStore } from 'src/stores/favoriteStations.store'
import { useGetStationsStore } from 'src/stores/getStations.store'
import { IStation } from 'src/types/station.types'
import './StationPage.scss'

export const StationPage = () => {
	const { stationuuid } = useParams()
	const favoriteStations = useFavoriteStationsStore((state) => state.favoriteStations)
	const updateStation = useFavoriteStationsStore((state) => state.updateStation)
	const foundStations = useGetStationsStore((state) => state.stations)
	const [stationInfo, setStationInfo] = useState<IStation | undefined>(
		favoriteStations.find((station) => station.stationuuid === stationuuid) ||
			foundStations.find((station) => station.stationuuid === stationuuid),
	)
	const [isLoadingUpdatedInfo, setIsLoadingUpdatedInfo] = useState(true)

	const { t } = useTranslation()

	useEffect(() => {
		stationuuid &&
			getStationsById(stationuuid).then((stationsInfo) => {
				if (stationsInfo.length) {
					setStationInfo(stationsInfo[0])
					updateStation(stationsInfo[0])
				}
				setIsLoadingUpdatedInfo(false)
			})
	}, [])

	if (!stationInfo && isLoadingUpdatedInfo) {
		return <LoadingBall />
	}

	if (stationInfo) {
		return (
			<div className="station-page">
				<StationLogo
					src={stationInfo.favicon}
					isPause={false}
					size="large"
				/>
				<StationCard station={stationInfo} />
				{isLoadingUpdatedInfo && <LoadingBall />}
				<div className="station-page__full-info full-info">
					{Object.entries(stationInfo).map(([key, value]) => {
						return (
							<div
								key={key}
								className="full-info__item">
								<div className="full-info__title">
									{key.replaceAll('_', ' ').toUpperCase()}
								</div>
								<div>{value}</div>
							</div>
						)
					})}
				</div>
			</div>
		)
	}

	return (
		<PageNotFound
			show404Title={false}
			message={t('page-not-found.station-info-not-found')}
		/>
	)
}
