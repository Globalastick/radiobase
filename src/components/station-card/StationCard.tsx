import { forwardRef, HTMLAttributes } from 'react'
import { StationLogo } from 'src/components/ui/StationLogo'
import { useAudioPlayerStore } from 'src/stores/audioPlayer.store'
import { IStation } from 'src/types/station.types'
import { StationCardContextMenu } from './StationCardContextMenu'
import './StationCard.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
	station: IStation
	isDragging?: boolean
}

export const StationCard = forwardRef<HTMLDivElement, Props>(
	({ station, isDragging, style, ...props }, ref) => {
		const audioPlayerState = useAudioPlayerStore((state) => state.audioPlayerState)
		const updateCurrentStationState = useAudioPlayerStore(
			(state) => state.updateCurrentStationState,
		)
		const currentStation = useAudioPlayerStore((state) => state.currentStation)
		const trackTitle = useAudioPlayerStore((state) => state.trackTitle)
		const isStationSelected = station.stationuuid === currentStation?.stationuuid
		const isPause = isStationSelected && audioPlayerState == 'pause'

		const handleOnClickStationCard = () => {
			updateCurrentStationState(station)
		}

		return (
			<div
				className={`station-card ${isStationSelected ? audioPlayerState : ''} ${isDragging ? 'dragging' : ''}`}
				onClick={handleOnClickStationCard}
				ref={ref}
				style={style}
				{...props}>
				<StationLogo
					src={station.favicon}
					isPause={isPause}
				/>
				<div className="station-card__info">
					<div className="station-card__name">{station.name}</div>
					{isStationSelected && (
						<div className="station-card__track-title">{trackTitle}</div>
					)}
				</div>
				<StationCardContextMenu station={station} />
			</div>
		)
	},
)
