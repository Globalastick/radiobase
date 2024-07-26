import {
	closestCenter,
	DndContext,
	DragEndEvent,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { IStation } from 'src/types/station.types'
import { StationsGridContainer } from './StationsGridContainer'

interface Props {
	stations: IStation[]
	setStations: (stations: IStation[]) => void
	name?: string
	additionlChildren?: JSX.Element | JSX.Element[]
}

export const StationsGridContainerSortable = ({
	stations,
	setStations,
	name,
	additionlChildren,
}: Props) => {
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			delay: 150,
			tolerance: 5,
		},
	})
	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 150,
			tolerance: 5,
		},
	})
	const sensors = useSensors(mouseSensor, touchSensor)

	const uids = stations.map((station) => ({ id: station.stationuuid }))
	const getStationPos = (id: string) =>
		stations.findIndex((station) => station.stationuuid === id)
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (active.id === over?.id) return

		const originalPos = getStationPos(active.id as string)
		const newPos = getStationPos(over?.id as string)
		const sortedStations = arrayMove<IStation>(stations, originalPos, newPos)
		setStations(sortedStations)
	}

	return (
		<>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}>
				<SortableContext
					items={uids}
					strategy={rectSortingStrategy}>
					<StationsGridContainer
						stations={stations}
						name={name}
						isSortable
						additionlChildren={additionlChildren}
					/>
				</SortableContext>
			</DndContext>
		</>
	)
}
