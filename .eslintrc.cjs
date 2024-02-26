const config = require("@nuphory/config/eslint");

module.exports = {
	root: true,
	// This tells ESLint to load the config from the package `eslint-config-custom`
	...config,
};
