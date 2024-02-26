const config = {
	arrowParens: "always",
	bracketSameLine: true,
	bracketSpacing: true,
	htmlWhitespaceSensitivity: "css",
	plugins: [
		// "@prettier/plugin-xml",
		// "prettier-plugin-glsl",
		"prettier-plugin-properties",
		"prettier-plugin-toml",
		// "prettier-plugin-svelte",
		// "prettier-plugin-tailwindcss",
	],
	semi: true,
	singleAttributePerLine: true,
	singleQuote: true,
	svelteStrictMode: true,
	trailingComma: "es5",
	vueIndentScriptAndStyle: true,
	xmlSortAttributesByKey: true,
	escapeNonLatin1: true,
	// overrides: [
	// 	{
	// 		files: ["*.frag"],
	// 		options: {
	// 			parser: "glsl-parser",
	// 		},
	// 	},
	// ],
};

export default config;
