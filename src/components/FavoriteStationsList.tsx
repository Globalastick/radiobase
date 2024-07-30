import { useTranslation } from 'react-i18next'
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

	const { t } = useTranslation()

	return (
		<StationsGridContainerSortable
			stations={favoriteStations}
			setStations={setFavoriteStations}
			name={t('grid.favorite-stations')}
			additionlChildren={
				<PlusMinusButton
					isMinus={isOpen}
					onClick={toggleOpen}
				/>
			}
		/>
	)
}
