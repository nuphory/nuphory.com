import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import chalk from 'chalk';
import { createLogger } from 'vite';

const logger = createLogger('info', {
	prefix: `${chalk.bgBlack.gray(`[${chalk.greenBright('nuphory')}]`)}`,
});

export default defineConfig({
	plugins: [sveltekit()],
	customLogger: logger,
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
