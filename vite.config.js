import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit({
      customElements: true
    })
  ]
};

export default config;
