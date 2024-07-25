module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
	],
	ignorePatterns: ['dist', '_metadata', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: [
		'react-refresh',
		'@typescript-eslint',
		'@typescript-eslint/eslint-plugin',
		'simple-import-sort',
	],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'no-console': ['error', { allow: ['clear', 'debug', 'warn', 'error'] }],
		'no-warning-comments': [
			'error',
			{ terms: ['todo', 'fixme', 'xxx', 'console', 'import'], location: 'start' },
		],
		'react-hooks/exhaustive-deps': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'simple-import-sort/imports': [
					'error',
					{
						groups: [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.', '^.+\\.s?css$']],
					},
				],
			},
		},
	],
}
