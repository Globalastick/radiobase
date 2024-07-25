import { StationLogo } from 'src/components/ui/StationLogo'
import { useAudioPlayerStore } from 'src/stores/audioPlayer.store'
import { IStation } from 'src/types/station.types'
import { StationCardContextMenu } from './StationCardContextMenu'
import './StationCard.scss'

interface Props {
	station: IStation
}

export const StationCard = ({ station }: Props) => {
	const audioPlayerState = useAudioPlayerStore((state) => state.audioPlayerState)
	const updateCurrentStationState = useAudioPlayerStore(
		(state) => state.updateCurrentStationState,
	)
	const currentStation = useAudioPlayerStore((state) => state.currentStation)
	const isStationSelected = station.stationuuid === currentStation?.stationuuid
	const isPause = isStationSelected && audioPlayerState == 'pause'

	const handleOnClickStationCard = () => {
		updateCurrentStationState(station)
	}

	return (
		<div
			className={`station-card ${isStationSelected ? audioPlayerState : ''}`}
			onClick={handleOnClickStationCard}>
			<StationLogo
				src={station.favicon}
				isPause={isPause}
			/>
			<div className="station-card__name">{station.name}</div>
			<StationCardContextMenu station={station} />
		</div>
	)
}
