<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import ThemeSwitcher from "./ThemeSwitcher.svelte";
	import CartDrawer from "./CartDrawer.svelte";
	import Navigation from "./Navigation.svelte";

	let { ...rest } = $props();

	let headerEl: HTMLElement;

	let observer: IntersectionObserver;

	let showHeader = false;

	let open = $state(false);

	onMount(() => {
		observer = new IntersectionObserver(
			(entries, observer) => {
				showHeader = !entries[0].isIntersecting;
			},

			{
				rootMargin: `-${headerEl.clientHeight}px 0px 0px 0px`
			}
		)

		const pageTitle = document.querySelector("h1");

		pageTitle ? observer.observe(pageTitle) : null;
	});

	onDestroy(() => {
		observer ? observer.disconnect() : null;
	});
</script>
<header bind:this={headerEl} class:bg-primary={showHeader || open} class="sticky top-0 py-6 px-2 text-xl smooth-color {rest}">
	<div class="container flex justify-end items-center gap-3 md:justify-between">
		<CartDrawer class="md:order-1"/>
		<ThemeSwitcher />
		<Navigation bind:open={open} />
	</div>
</header>
