import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IStation } from 'src/types/station.types'
import { StationCard } from './StationCard'

interface Props {
	station: IStation
}

export const StationCardSortable = ({ station }: Props) => {
	const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: station.stationuuid,
	})

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	}
	return (
		<StationCard
			ref={setNodeRef}
			station={station}
			isDragging={isDragging}
			style={style}
			{...attributes}
			{...listeners}
		/>
	)
}
