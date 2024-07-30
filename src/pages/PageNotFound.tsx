import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './PageNotFound.scss'

interface Props {
	show404Title?: boolean
	message?: string
}

export const PageNotFound = ({ show404Title = true, message }: Props) => {
	const { t } = useTranslation()

	const renderMessage = message ? message : t('page-not-found.page-not-found')

	return (
		<div className="page-not-found">
			{show404Title && <div className="page-not-found__title">404</div>}
			<div className="page-not-found__message">{renderMessage}</div>
			<Link to={'/'}>{t('page-not-found.go-home')}</Link>
		</div>
	)
}
