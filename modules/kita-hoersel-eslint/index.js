"use strict";

module.exports = {
	rules: {},
	overrides: [
		{
			files: ["*.astro"],
			parser: "astro-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
		},
		{
			files: ["*.tsx"],
			parser: "@typescript-eslint/parser",
			extends: [
				"eslint:recommended",
				"airbnb",
				"airbnb-typescript",
				"plugin:react/recommended",
				"plugin:@typescript-eslint/eslint-recommended",
				"plugin:@typescript-eslint/recommended",
				"plugin:jsx-a11y/recommended",
				"plugin:import/recommended",
				"plugin:import/typescript",
				"plugin:prettier/recommended",
			],
			settings: {
				react: { version: "detect" },
				"import/resolver": {
					node: {
						extensions: [".js", ".jsx", ".ts", ".tsx"],
					},
				},
				"import/parsers": {
					"@typescript-eslint/parser": [".ts", ".tsx"],
				},
			},
			parserOptions: {
				sourceType: "module",
				ecmaVersion: 11,
				ecmaFeatures: { jsx: true },
				project: "./tsconfig.json",
			},
			plugins: ["react", "@typescript-eslint", "jsx-a11y", "import"],
			rules: {
				"react/react-in-jsx-scope": "off",
			},
		},
		{
			files: ["*.ts"],
			parser: "@typescript-eslint/parser",
			extends: [
				"eslint:recommended",
				"airbnb-base",
				"airbnb-typescript/base",
				"plugin:@typescript-eslint/eslint-recommended",
				"plugin:@typescript-eslint/recommended",
				"plugin:import/recommended",
				"plugin:import/typescript",
				"plugin:prettier/recommended",
			],
			plugins: ["@typescript-eslint", "import"],
			settings: {
				"import/resolver": { typescript: {} },
				"import/parsers": {
					"@typescript-eslint/parser": [".ts", ".tsx"],
				},
			},
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				project: "./tsconfig.json",
			},
			rules: {
				"import/prefer-default-export": "off",
				"no-console": "off",
				"class-methods-use-this": "off",
			},
		},
	],
};
