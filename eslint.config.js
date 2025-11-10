import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default defineConfig([
	globalIgnores(['dist', '_metadata']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [js.configs.recommended, tseslint.configs.recommended],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'no-console': ['error', { allow: ['clear', 'debug', 'warn', 'error'] }],
			'no-warning-comments': [
				'error',
				{ terms: ['todo', 'fixme', 'xxx', 'console', 'import'], location: 'start' },
			],
			'react-hooks/exhaustive-deps': 'off',
			'simple-import-sort/exports': 'error',
			'simple-import-sort/imports': [
				'error',
				{
					groups: [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.', '^.+\\.s?css$']],
				},
			],
		},
	},
])
