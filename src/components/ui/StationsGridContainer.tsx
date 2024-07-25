import { IStation } from 'src/types/station.types'
import { StationCard } from '../station-card'
import './StationsGridContainer.scss'

interface Props {
	stations: IStation[]
	name?: string
	additionlChildren?: JSX.Element | JSX.Element[]
}

export const StationsGridContainer = ({ stations, name, additionlChildren }: Props) => {
	return (
		<div className="stations-grid">
			{name && <h2 className="stations-grid__header">{name}</h2>}
			<div className="stations-grid__main">
				{stations.map((station) => (
					<StationCard
						key={station.stationuuid}
						station={station}
					/>
				))}
				{additionlChildren}
			</div>
		</div>
	)
}
