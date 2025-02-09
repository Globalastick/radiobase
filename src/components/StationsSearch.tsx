import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { useGetStationsStore } from 'src/stores/getStations.store.ts'
import { useDebounce } from 'use-debounce'
import { Button } from './ui/Button.tsx'
import { LoadingBall } from './ui/LoadingBall.tsx'
import { StationsGridContainer } from './ui/StationsGridContainer.tsx'
import './StationsSearch.scss'

export const StationsSearch = () => {
	const [searchInputText, setSearchInputText] = useState('')
	const [debouncedSearchInputValue] = useDebounce(searchInputText, 500)
	const isLoading = useGetStationsStore((state) => state.isLoading)
	const isError = useGetStationsStore((state) => state.errorMessage)
	const errorMessage = useGetStationsStore((state) => state.errorMessage)
	const foundStations = useGetStationsStore((state) => state.stations)
	const isAvailableLoadMore = useGetStationsStore((state) => state.isAvailableLoadMore)
	const getStationsByName = useGetStationsStore((state) => state.getStationsByName)
	const getStationsByTopVote = useGetStationsStore((state) => state.getStationsByTopVote)
	const getStationsByTopClick = useGetStationsStore((state) => state.getStationsByTopClick)
	const getMoreStations = useGetStationsStore((state) => state.getMoreStations)

	const { t } = useTranslation()

	const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInputText(event.target.value)
	}

	const { ref: loadMoreRef, inView } = useInView()

	useEffect(() => {
		if (inView && !isLoading && isAvailableLoadMore) {
			getMoreStations()
		}
	}, [inView, isLoading, isAvailableLoadMore])

	useEffect(() => {
		if (debouncedSearchInputValue.trim().length > 0) {
			getStationsByName(debouncedSearchInputValue)
		}
	}, [debouncedSearchInputValue])

	const searchControlsRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		searchControlsRef?.current?.scrollIntoView()
	}, [])

	return (
		<div className="stations-search">
			<div
				className="stations-search__search-controls search-controls"
				ref={searchControlsRef}>
				<div className="search-controls__search-input-wrapper">
					<input
						className="search-controls__search-input"
						value={searchInputText}
						onChange={handleInputOnChange}
						type="text"
						placeholder={t('grid.found-stations.station-search')}
						autoFocus
					/>
				</div>
				<Button onClick={getStationsByTopVote}>{t('grid.found-stations.top-rated')}</Button>
				<Button onClick={getStationsByTopClick}>
					{t('grid.found-stations.top-clicked')}
				</Button>
			</div>
			<div className="stations-search__result">
				{isError && (
					<div className="stations-search__message">
						<p>{errorMessage}</p>
					</div>
				)}
				<StationsGridContainer
					stations={foundStations}
					name={
						foundStations.length ? t('grid.found-stations.found-stations') : undefined
					}
				/>
				<div
					ref={loadMoreRef}
					className="load-more">
					{isLoading && <LoadingBall />}
				</div>
			</div>
		</div>
	)
}
