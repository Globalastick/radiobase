import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IStation } from 'src/types/station.types'
import { StationCard } from './StationCard'
import './StationCardSortable.scss'

interface Props {
	station: IStation
}

export const StationCardSortable = ({ station }: Props) => {
	const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: station.stationuuid,
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? '100' : 'inherit',
	}
	return (
		<div
			className={`station-card-sortable ${isDragging ? 'dragging' : ''}`}
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}>
			<StationCard station={station} />
		</div>
	)
}
