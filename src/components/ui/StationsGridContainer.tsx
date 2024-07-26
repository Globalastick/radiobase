import { IStation } from 'src/types/station.types'
import { StationCard, StationCardSortable } from '../station-card'
import './StationsGridContainer.scss'

interface Props {
	stations: IStation[]
	name?: string
	isSortable?: boolean
	additionlChildren?: JSX.Element | JSX.Element[]
}

export const StationsGridContainer = ({ stations, name, isSortable, additionlChildren }: Props) => {
	const Card = isSortable ? StationCardSortable : StationCard
	return (
		<div className="stations-grid">
			{name && <h2 className="stations-grid__header">{name}</h2>}
			<div className="stations-grid__main">
				{stations.map((station) => (
					<Card
						key={station.stationuuid}
						station={station}
					/>
				))}
				{additionlChildren}
			</div>
		</div>
	)
}
