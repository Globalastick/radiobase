import { useFavoriteStationsStore } from 'src/stores/favoriteStations.store'
import { useSearchElementStore } from 'src/stores/searchElement.store'
import { PlusMinusButton } from './ui/PlusMinusButton'
import { StationsGridContainer } from './ui/StationsGridContainer'

export const FavoriteStationsList = () => {
	useFavoriteStationsStore
	const { favoriteStations } = useFavoriteStationsStore((state) => state)
	const isOpen = useSearchElementStore((state) => state.showStationsSearchElement)
	const toggleOpen = useSearchElementStore((state) => state.toggleOpen)

	return (
		<StationsGridContainer
			stations={favoriteStations}
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
