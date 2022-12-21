<script lang="ts">
	import { _siteName, _tagLine } from './+layout';
	import { browser } from '$app/environment';

	import './styles.css';
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

<div class="app">
	<!-- <header /> -->

	<main>
		<slot />
	</main>

	<footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
