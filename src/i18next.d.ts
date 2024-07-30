import 'i18next'
import english from 'public/locales/en/translation.json'

declare module 'i18next' {
	// Extend CustomTypeOptions
	interface CustomTypeOptions {
		// custom namespace type, if you changed it
		defaultNS: 'english'
		// custom resources type
		resources: {
			english: typeof english
		}
		langs: ['en', 'ru']
	}
}
