import React, { useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useTranslation } from 'react-i18next'
import LikeIconSvg from 'src/assets/icons/like.svg?react'
import PlayIconSvg from 'src/assets/icons/play.svg?react'
import { Badge } from 'src/components/ui/Badge'
import { Button } from 'src/components/ui/Button'
import { IStation } from 'src/types/station.types'
import './StationCardTooltip.scss'

interface TooltipProps {
	station: IStation
	children: React.ReactNode
}

export const StationCardTooltip = ({ station, children }: TooltipProps) => {
	const tooltipRef = useRef<HTMLDivElement | null>(null)
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
	const [visible, setVisible] = useState(false)
	const [tooltipStyles, setTooltipStyles] = useState<IDisplayTooltipStyles>({
		top: { left: '0', bottom: '0', width: '200px', paddingBottom: '8px' },
		bottom: { left: '0', top: '0', width: '200px', paddingTop: '8px' },
	})

	const showTooltip = () => {
		if (!tooltipRef.current) return

		const id = setTimeout(() => {
			// When cursor moves fast, prevents creation of multiple tooltips
			const isTooltipHovered = tooltipRef.current?.matches(':hover')
			if (!isTooltipHovered) return

			const tooltipRect = tooltipRef.current?.getBoundingClientRect() as DOMRect
			const stationCardElement = tooltipRef.current?.parentElement
			const stationCardElementRect = stationCardElement?.getBoundingClientRect() as DOMRect
			const scrollOffset = window.scrollY || document.documentElement.scrollTop

			setTooltipStyles({
				top: {
					left: `${stationCardElementRect.x}px`,
					bottom: `${window.innerHeight - tooltipRect.top - scrollOffset}px`,
					width: `${stationCardElementRect.width}px`,
					paddingBottom: `${stationCardElementRect.bottom - tooltipRect.bottom}px`,
				},
				bottom: {
					left: `${stationCardElementRect.x}px`,
					top: `${tooltipRect.bottom + scrollOffset}px`,
					width: `${stationCardElementRect.width}px`,
					paddingTop: `${stationCardElementRect.bottom - tooltipRect.bottom}px`,
				},
			})

			setVisible(true)
		}, 300)
		setTimeoutId(id)
	}

	const hideTooltip = () => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		setVisible(false)
	}

	return (
		<div
			className="station-card-tooltip"
			ref={tooltipRef}
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}>
			{children}
			{visible &&
				ReactDOM.createPortal(
					<StationCardTooltipContent
						station={station}
						onMouseLeave={hideTooltip}
						tooltipStyles={tooltipStyles}
					/>,
					document.body,
				)}
		</div>
	)
}

interface IDisplayTop {
	bottom: string
	left: string
	width: string
	paddingBottom: string
}

interface IDisplayBottom {
	top: string
	left: string
	width: string
	paddingTop: string
}

interface IDisplayTooltipStyles {
	top: IDisplayTop
	bottom: IDisplayBottom
}

interface StationCardTooltipContentProps {
	station: IStation
	onMouseLeave: () => void
	tooltipStyles: IDisplayTooltipStyles
}

const StationCardTooltipContent = ({
	station,
	onMouseLeave,
	tooltipStyles,
}: StationCardTooltipContentProps) => {
	const tooltipContentRef = useRef<HTMLDivElement | null>(null)
	const [styles, setStyles] = useState<IDisplayTop | IDisplayBottom>(tooltipStyles.bottom)
	const [arrowDirection, setArrowDirection] = useState<'up' | 'down'>('up')

	const { t } = useTranslation()

	useLayoutEffect(() => {
		if (tooltipContentRef.current) {
			const tooltipRect = tooltipContentRef.current.getBoundingClientRect()
			const isTooltipOutOfView = tooltipRect.bottom > window.innerHeight
			if (isTooltipOutOfView) {
				setStyles(tooltipStyles.top)
				setArrowDirection('down')
			}
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (
				tooltipContentRef.current &&
				!tooltipContentRef.current.contains(event.target as Node)
			) {
				onMouseLeave()
			}
		}

		document.addEventListener('pointerdown', handleClickOutside)
		return () => {
			document.removeEventListener('pointerdown', handleClickOutside)
		}
	}, [])

	return (
		<div
			ref={tooltipContentRef}
			style={styles}
			className="station-tooltip"
			onClick={(event: React.MouseEvent) => {
				event.stopPropagation()
			}}
			onMouseLeave={onMouseLeave}>
			<div className="station-tooltip__inner">
				<div className="station-tooltip__item">
					<Badge
						color="invert"
						title={t('station-tooltip.number-of-votes-for-this-station')}>
						<LikeIconSvg /> <span>{station.votes}</span>
					</Badge>
					<Badge
						color="invert"
						title={t('station-tooltip.clicks-within-the-last-24-hours')}>
						<PlayIconSvg /> {station.clickcount}
					</Badge>
					<Badge
						color="invert"
						title={t('station-tooltip.codec-and-bitrate')}>
						{station.codec} {station.bitrate}
					</Badge>
				</div>
				{station.country && (
					<div className="station-tooltip__item">
						<Badge
							color="default"
							title={t('station-tooltip.country')}>
							{station.country}
						</Badge>
					</div>
				)}
				{station.tags && (
					<div className="station-tooltip__item">
						<Tags tags={station.tags} />
					</div>
				)}
				<div className="station-tooltip__item">
					<Button
						variant="contained"
						href={`/station/${station.stationuuid}`}
						size="s">
						{t('station-tooltip.full-station-info')}
					</Button>
				</div>
				<div
					className={`station-tooltip__arrow station-tooltip__arrow--${arrowDirection}`}></div>
			</div>
		</div>
	)
}

const Tags = ({ tags }: { tags: string }) => {
	function splitString(str: string) {
		if (str.includes(',')) {
			return str.split(',')
		} else {
			return str.split(' ')
		}
	}

	return (
		<>
			{splitString(tags).map((tag, index) => (
				<Badge key={tag + index}>{tag}</Badge>
			))}
		</>
	)
}
