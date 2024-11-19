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

	const renderContent = () => {
		if (isPause) {
			return <div className="station-logo__pause-icon"></div>
		}

		if (!logoSrc) {
			return <StationLogoPlaceholderSvg />
		}

		return (
			<img
				className="station-logo__image"
				src={logoSrc}
				alt="logo"
			/>
		)
	}

	return <div className={className}>{renderContent()}</div>
}
