import { useEffect, useState } from 'react'
import StationLogoPlaceholderSvg from 'src/assets/icons/station-logo-placeholder.svg?react'
import './StationLogo.scss'

interface Props {
	src: string
	isPause: boolean
	size?: 'small' | 'medium' | 'large'
}

export const StationLogo = ({ src, isPause, size = 'medium' }: Props) => {
	const [logoSrc, setLogoSrc] = useState<string | null>(null)
	const className = `station-logo station-logo--${size}`

	useEffect(() => {
		const logoImg = new Image()
		logoImg.src = src
		logoImg.onload = () => setLogoSrc(src)
	}, [src])

	if (isPause) {
		return (
			<div className={className}>
				<div className="station-logo__pause-icon"></div>
			</div>
		)
	}

	if (!logoSrc) {
		return (
			<div className={className}>
				<StationLogoPlaceholderSvg />
			</div>
		)
	}

	return (
		<div className={className}>
			<img
				className="station-logo__image"
				src={logoSrc}
				alt="logo"
			/>
		</div>
	)
}
