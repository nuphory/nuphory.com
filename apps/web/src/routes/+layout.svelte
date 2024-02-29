<script lang="ts">
	import logAttribution from '$lib/attribution';
	// Environment
	import { PUBLIC_META_DESCRIPTION, PUBLIC_META_KEYWORDS, PUBLIC_META_NAME } from '$env/static/public';

	// Components
	import "iconify-icon";
	import Footer from './Footer.svelte';
	import Header from './(header)/Header.svelte';
	import Favicon from './metadata/Favicon.svelte';

	// Global Styles
	import '$lib/styles/app.scss';

	// Assets
	import "@fontsource/montserrat";
	import { onMount } from 'svelte';

	onMount(() => {
		logAttribution();
	});
</script>

<svelte:head>
	<!-- Global Metadata -->
	<meta name="theme-color" content="#fffaf7" />

	<meta name="apple-mobile-web-app-title" content="nuphory" />
	<meta name="application-name" content="nuphory" />
	<meta name="msapplication-TileColor" content="#272d3b" />

	<meta name="msapplication-TileImage" content="/assets/favicon/mstile-144x144.png" />
	<meta name="msapplication-config" content="/assets/favicon/browserconfig.xml" />

	<Favicon />

	<!-- Metadata -->
	<title>nuphory</title>
	<meta name="keywords" content={PUBLIC_META_KEYWORDS} />
	<meta name="description" content={PUBLIC_META_DESCRIPTION} />

	<!-- Open Graph / Facebook -->
	<meta name="og:site_name" content={PUBLIC_META_NAME} />
	<meta name="og:description" content={PUBLIC_META_DESCRIPTION} />
	<meta name="og:type" content="website" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@{PUBLIC_META_NAME}" />
	<meta name="twitter:creator" content="@{PUBLIC_META_NAME}" />
</svelte:head>

<Header />
<slot />
<Footer />
