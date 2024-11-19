import { useState } from 'react'
import './Badge.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
	color?: 'default' | 'invert' | 'accent'
	children: React.ReactNode
}

export const Badge = ({ color = 'default', onClick, children, ...attributes }: Props) => {
	const [clicked, setClicked] = useState(false)

	const handleClick = () => {
		setClicked(true)
	}

	const className = `badge badge--${color} ${onClick && 'badge--clickable'} ${onClick && clicked && 'badge--accent'}`

	if (!children) {
		return null
	}

	return (
		<>
			<div
				className={className}
				onClick={handleClick}
				{...attributes}>
				{children}
			</div>
		</>
	)
}
