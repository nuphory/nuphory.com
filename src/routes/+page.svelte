<script lang="ts">
	// components
	// import LottiePlayer from '$lib/components/design/LottiePlayer.svelte';
	import Buttons from '$lib/components/social/Buttons.svelte';
	import Product from '$lib/components/store/Product.svelte';

	// constants
	import { _siteName, _siteDescription, _tagLine } from './+layout';

	// lottie animations
	import intro from '$lib/assets/lottie/intro.json';
	import headbang from '$lib/assets/lottie/headbang.json';
	import settle from '$lib/assets/lottie/settle.json';

	export let data;
	
</script>

<svelte:head>
	<title>{_siteName}</title>
	<meta name="title" content="{_siteName} — {_tagLine}" />
	<meta
		name="keywords"
		content="{_siteName}, {_siteName}music, {_siteName} music, volant, volantmusic, music, house, trance, hypertrance, neoy2k, progressive house"
	/>
	<meta name="description" content={_siteDescription} />

	<link rel="canonical" href="https://nuphory.com" />

	<meta name="robots" content="index, follow" />

	<meta property="og:title" content="{_siteName} — {_tagLine}" />
	<meta property="og:description" content={_siteDescription} />
	<meta property="og:image" content="https://{_siteName}.com/assets/logo/png/summary.png" />
	<meta property="og:url" content="https://{_siteName}.com" />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@{_siteName}" />
	<meta name="twitter:creator" content="@{_siteName}" />
	<meta name="twitter:title" content="{_siteName} — {_tagLine}" />
	<meta name="twitter:description" content={_siteDescription} />
	<meta name="twitter:image" content="https://{_siteName}.com/assets/logo/png/summary.png" />
</svelte:head>

<section id="cover">
	<section id="hero">
		<!-- <section id="logo">
			<fade-in id="logo-anim" duration="500ms" order="0">
				<LottiePlayer
					--player-width="{1080 * (320 * 1080 ** -1)}px"
					--player-height="{240 * (320 * 1080 ** -1)}px"
					fallback={intro}
					onmouseover={headbang}
					onmouseleave={settle}
				/>
			</fade-in>
		</section> -->

		<section id="title">
			<fade-in distance="10px" duration="500ms" order="-1">
				<h1><b>{_siteName}</b></h1>
			</fade-in>
		</section>

		<section id="shop">
			<ul id="products">
				{#each data.products as product}
					<Product {product} />
				{/each}
			</ul>
		</section>
	</section>
	<fade-in id="find-me" distance="10px" duration="500ms" order="15">
		<a href="#socials" id="find-me-link">
			<h4>find me</h4>
			<h4>v</h4>
		</a>
	</fade-in>
</section>

<section id="socials">
	<div id="buttons">
		<Buttons />
	</div>
</section>

<fade-in id="book-me" distance="10px" duration="500ms" order="15">
	<a href="#contact" id="book-me-link">
		<h4>book me</h4>
		<h4>v</h4>
	</a>
</fade-in>

<a href="#cover" id="back-to-top">
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<path fill="white" d="M12 0l-12 24h24z" />
	</svg>
</a>

<style>
	#cover,
	#hero,
	#socials {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px 0px;
	}

	#cover {
		position: relative;
		min-height: 100vh;
		justify-content: space-between;
	}
	#hero {
		margin: 0px auto;
	}

	#find-me,
	#book-me {
		text-align: center;
		padding: 16px 0px;
	}

	#find-me-link:hover {
		text-decoration: none;
	}

	#find-me h4,
	#book-me h4 {
		margin: 0px;
	}
	#find-me h4:nth-child(2),
	#book-me h4:nth-child(2) {
		margin-bottom: 16px;
	}

	#buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	#products {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
	}

	#back-to-top {
		width: 48px;
		height: 48px;

		position: fixed;
		z-index: 100;

		bottom: 1em;
		right: 1em;

		display: flex;
		align-items: center;
		justify-content: center;

		transition: all 0.2s ease-in-out;

		border-radius: 50%;
		border: 0.25em solid var(--foreground-color);

		background-color: var(--background-color);
	}

	#back-to-top:hover {
		border: 0.5em solid var(--foreground-color);
	}

	#back-to-top:hover svg {
		transform: scale(0.8) translateY(-12%);
	}

	#back-to-top:active {
		border: 0.125em solid var(--foreground-color);
	}

	svg {
		transition: all 0.2s ease-in-out;
		transform: translateY(-12%);
	}

	path {
		fill: var(--foreground-color);
	}

	/* screen size */
	@media (min-width: 768px) {
		#products {
			flex-direction: row;
		}
	}
</style>
