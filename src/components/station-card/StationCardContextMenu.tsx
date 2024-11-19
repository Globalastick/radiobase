import { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'src/components/ui/Button'
import { useFavoriteStationsStore } from 'src/stores/favoriteStations.store'
import { IStation } from 'src/types/station.types'
import './StationCardContextMenu.scss'

interface Props {
	station: IStation
}

export const StationCardContextMenu = ({ station }: Props) => {
	const [showContextMunu, setShowContenMenu] = useState<boolean>(false)

	const handleOnClickDetails = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
		setShowContenMenu((prev) => !prev)
	}

	return (
		<div
			className="details"
			onClick={handleOnClickDetails}>
			<span className="visually-hidden">Options</span>
			{showContextMunu && (
				<ContextMenu
					station={station}
					onMouseLeave={() => setShowContenMenu(false)}
				/>
			)}
		</div>
	)
}

interface IContextMenuProps {
	station: IStation
	onMouseLeave: () => void
}

const ContextMenu = ({ station, onMouseLeave }: IContextMenuProps) => {
	const appendStation = useFavoriteStationsStore((state) => state.appendStation)
	const removeStation = useFavoriteStationsStore((state) => state.removeStation)
	const menuRef = useRef<HTMLDivElement>(null)
	const [topOffset, setTopOffset] = useState(0)

	const { t } = useTranslation()

	const handleOnClickCopyStationLink = () => {
		const url = window.location.origin + `/station/${station.stationuuid}`
		navigator.clipboard.writeText(url)
	}

	useLayoutEffect(() => {
		if (menuRef.current) {
			const menuTop = menuRef.current.getBoundingClientRect().top
			const menuTopAndScreenBottomDistance = window.innerHeight - menuTop
			const menuHeight = menuRef.current.offsetHeight
			if (menuTopAndScreenBottomDistance < menuHeight) {
				setTopOffset(menuTopAndScreenBottomDistance - menuHeight)
			} else {
				setTopOffset(0)
			}
		}
	}, [])

	return (
		<div
			className="context-menu"
			style={{ top: `${topOffset}px` }}
			ref={menuRef}
			onMouseLeave={onMouseLeave}>
			<ul className="context-menu__inner">
				<li className="context-menu__item">
					<Button
						size="s"
						color="success"
						variant="text"
						onClick={() => appendStation(station)}>
						{t('context-menu.add-to-favorites')}
					</Button>
				</li>
				<li className="context-menu__item">
					<Button
						size="s"
						color="danger"
						variant="text"
						onClick={() => removeStation(station)}>
						{t('context-menu.remove-from-favorites')}
					</Button>
				</li>
				<li className="context-menu__item">
					<Button
						size="s"
						variant="text"
						onClick={handleOnClickCopyStationLink}>
						{t('context-menu.copy-link-on-station')}
					</Button>
				</li>
				<li className="context-menu__item">
					<Button
						size="s"
						variant="text"
						href={`/station/${station.stationuuid}`}>
						{t('context-menu.full-station-info')}
					</Button>
				</li>
			</ul>
		</div>
	)
}
