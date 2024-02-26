/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px'
		},
		extend: {
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				yeysk: ['Yeysk', 'sans-serif']
			},

			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					sm: '2rem'
				}
			},

			rotate: {
				'135': '135deg',
				'225': '225deg',
				'270': '270deg',
				'315': '315deg'
			},

			colors: {
				light: {
					primary: '#fffaf7',
					secondary: '#272d3a'
				},

				dark: {
					primary: '#212121',
					secondary: '#fafafa'
				},

				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',

				information: 'var(--color-information)',
				success: 'var(--color-success)',
				warning: 'var(--color-warning)',
				error: 'var(--color-error)'
			},

			textColor: {
				primary: 'var(--color-secondary)',
				secondary: 'var(--color-primary)',
				link: 'var(--color-link)'
			},

			backgroundColor: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)'
			},

			borderColor: {
				primary: 'var(--color-border)',
				secondary: 'var(--color-primary)'
			},
			ringColor: {
				primary: 'var(--color-border)',
				secondary: 'var(--color-primary)'
			}
		}
	},
	plugins: []
};
