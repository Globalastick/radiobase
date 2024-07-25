import { FavoriteStationsList } from 'src/components/FavoriteStationsList'
import { StationsSearch } from 'src/components/StationsSearch'
import { useSearchElementStore } from 'src/stores/searchElement.store'

export const MainPage = () => {
	const showStationsSearchElement = useSearchElementStore(
		(state) => state.showStationsSearchElement,
	)

	return (
		<>
			<FavoriteStationsList />
			{showStationsSearchElement && <StationsSearch />}
		</>
	)
}
