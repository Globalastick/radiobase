import { useFavoriteStationsStore } from 'src/stores/favoriteStations.store'
import { useSearchElementStore } from 'src/stores/searchElement.store'
import { PlusMinusButton } from './ui/PlusMinusButton'
import { StationsGridContainerSortable } from './ui/StationsGridContainerSortable'

export const FavoriteStationsList = () => {
	useFavoriteStationsStore
	const favoriteStations = useFavoriteStationsStore((state) => state.favoriteStations)
	const setFavoriteStations = useFavoriteStationsStore((state) => state.setFavoriteStations)
	const isOpen = useSearchElementStore((state) => state.showStationsSearchElement)
	const toggleOpen = useSearchElementStore((state) => state.toggleOpen)

	return (
		<StationsGridContainerSortable
			stations={favoriteStations}
			setStations={setFavoriteStations}
			name="Favorite stations"
			additionlChildren={
				<PlusMinusButton
					isMinus={isOpen}
					onClick={toggleOpen}
				/>
			}
		/>
	)
}
