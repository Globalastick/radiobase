import { Link } from 'react-router-dom'
import './PageNotFound.scss'

interface Props {
	show404Title?: boolean
	message?: string
}

export const PageNotFound = ({ show404Title = true, message = 'Page not found.' }: Props) => {
	return (
		<div className="page-not-found">
			{show404Title && <div className="page-not-found__title">404</div>}
			<div className="page-not-found__message">{message}</div>
			<Link to={'/'}> Go home</Link>
		</div>
	)
}
