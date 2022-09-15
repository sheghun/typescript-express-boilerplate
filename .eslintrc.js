module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
	extends: [
		'google',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier',
	],
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': ['off'],
		'@typescript-eslint/no-explicit-any': ['off'],
		'new-cap': 'off',
		'require-jsdoc': 'off',
		'valid-jsdoc': 'off',
		'no-invalid-this': 'off',
	},
};
