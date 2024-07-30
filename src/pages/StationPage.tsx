import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { getStationById } from 'src/api/radiobrowser.api'
import { StationCard } from 'src/components/station-card'
import { LoadingBall } from 'src/components/ui/LoadingBall'
import { StationLogo } from 'src/components/ui/StationLogo'
import { PageNotFound } from 'src/pages/PageNotFound'
import { IStation } from 'src/types/station.types'
import './StationPage.scss'

export const StationPage = () => {
	const { stationId } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const [stationInfo, setStationInfo] = useState<IStation>()

	const { t } = useTranslation()

	useEffect(() => {
		stationId &&
			getStationById(stationId).then((stationInfo) => {
				stationInfo && setStationInfo(stationInfo[0])
				setIsLoading(false)
			})
	}, [])

	if (isLoading) {
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
