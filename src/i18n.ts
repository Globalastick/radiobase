import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18next
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		supportedLngs: ['en', 'ru'],
		fallbackLng: 'en',
		load: 'languageOnly',
		debug: false,
		react: {
			useSuspense: true,
		},
		backend: {
			loadPath: '/radiobase/locales/{{lng}}/translation.json',
		},
	})

export default i18next
