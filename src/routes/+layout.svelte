<script lang="ts">
	import { _siteName, _tagLine } from './+layout';
	import { browser } from '$app/environment';

	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';

	import '../app.css';

	import '$lib/styles/colors.scss';
	import '$lib/styles/typography.scss';
	import '$lib/styles/layout.scss';

	import '$lib/styles/styles.scss';

	(async () => {
		if (!browser) return;

		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();

				document.querySelector(this.getAttribute('href')).scrollIntoView({
					behavior: 'smooth'
				});
			});
		});

		let collapsibles = document.querySelectorAll('.collapsible');
		collapsibles.forEach((collapsible) => {
			collapsible.addEventListener('click', () => {
				collapsible.classList.toggle('active');
				let content = collapsible.nextElementSibling as HTMLElement;
				if (!content) return;

				// toggle content maxheight
				if (content.style.maxHeight) {
					content.style.removeProperty('max-height');
				} else {
					content.style.maxHeight = content.scrollHeight + 'px';
				}
			});
		});

		const FadeElement = (await import('$lib/fade-in')).default;
		customElements.define('fade-in', FadeElement);
		FadeElement.fadeInAll(100);
	})();

	/**
	 * website designed by patch: https://twitter.com/patchstep
	 */
	console.log(
		`%c${_siteName}%c\n\n\n${_siteName}.com was made by %cPatch\n%chttps://twitter.com/patchstep`,
		"font-family: 'Yeysk'; font-size: 6em; font-weight: bold; text-stroke: 2px #272d3b; color: #fffaf7;",
		'font-size: 2em; color: #fffaf7;',
		'font-size: 2em; color: #fffaf7; font-weight: bold;',
		'font-size: 1em; color: #fffaf7; font-weight: bold;'
	);
	// TODO header component
	// TODO cart button
	// - has counter for number of items in cart
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="194x194" href="/assets/favicon/favicon-194x194.png" />
	<link
		rel="icon"
		type="image/png"
		sizes="192x192"
		href="/assets/favicon/android-chrome-192x192.png"
	/>
	<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
	<link rel="manifest" href="/assets/favicon/site.webmanifest" />
	<link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg" color="#272d3b" />
	<link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
	<meta name="apple-mobile-web-app-title" content="nuphory" />
	<meta name="application-name" content="nuphory" />
	<meta name="msapplication-TileColor" content="#272d3b" />
	<meta name="msapplication-TileImage" content="/assets/favicon/mstile-144x144.png" />
	<meta name="msapplication-config" content="/assets/favicon/browserconfig.xml" />
	<meta name="theme-color" content="#fffaf7" />

	<meta property="og:site_name" content={_siteName} />
</svelte:head>

<div class="flex flex-col justify-between min-h-screen">
	<!-- <header /> -->

	<header class="fixed z-50 flex justify-center top-0 w-screen">
		<Header />
	</header>

	<main class="relative flex flex-col items-center w-full max-w-5xl mx-auto my-0">
		<slot />
	</main>

	<footer
		class="flex flex-col justify-between items-center py-16 w-auto sm:py-12 clr-bg clr-inverse"
	>
		<Footer />
	</footer>
</div>
