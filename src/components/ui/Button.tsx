import { Link } from 'react-router-dom'
import './Button.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'contained' | 'text'
	href?: string | null
	color?: 'accent' | 'danger' | 'success'
	children: React.ReactNode
}

export const Button = ({
	variant = 'contained',
	href = null,
	color,
	children,
	...attributes
}: Props) => {
	const className = `button button--${variant} ${color ? `button--${color}` : ''}`

	if (href) {
		return (
			<Link
				className={className}
				to={href}>
				{children}
			</Link>
		)
	}

	return (
		<button
			type="button"
			className={className}
			{...attributes}>
			{children}
		</button>
	)
}