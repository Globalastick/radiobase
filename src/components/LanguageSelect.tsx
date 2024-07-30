import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/Button'
import './LanguageSelect.scss'

const languages = [
	{ code: 'en', name: 'English' },
	{ code: 'ru', name: 'Русский' },
]

export const LanguageSelect = () => {
	const { i18n } = useTranslation()

	const onClickLanguageChange = (event: React.MouseEvent<HTMLButtonElement>) => {
		i18n.changeLanguage(event.currentTarget.value)
	}

	return (
		<div className="lang-selector">
			{languages.map(({ code, name }) => (
				<Button
					key={code}
					value={code}
					onClick={onClickLanguageChange}
					color={i18next.language === code ? 'accent' : undefined}>
					{name}
				</Button>
			))}
		</div>
	)
}
