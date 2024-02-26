<script lang="ts">
	// Imports
	import { delay, duration } from '$lib/utils/transitions';
	import { fly } from 'svelte/transition';

	// Components
	import HamburgerToggle from '$lib/components/HamburgerToggle.svelte';
	import { expoIn, expoOut } from 'svelte/easing';

	// Props
	let { intro = true, open, ...rest  } = $props();

	const navItems = [
		{ name: 'Socials', href: '/socials' },
		{ name: 'Products', href: '/products' },
		{ name: 'Contact', href: '/contact' }
	];

	let width: number = $state(0);
	let portrait: boolean = $state(true);

	type Dictionary<T> = {
		[index: string]: T;
	};
	let navElements: Dictionary<HTMLLIElement> = {};

	$effect(() => {
		portrait = width < 768;

		width >= 768 ? open = false : null;
	});
</script>

<svelte:window bind:innerWidth={width} />

<nav data-width={width} class="flex items-center {rest.class}">
		{#if portrait}
			<ul
				class="
					{open ? 'before:h-full before:bg-black' : 'before:h-0' }

					w-full p-8 py-8 pb-16

					absolute top-full left-1/2 -translate-x-1/2
					flex items-end flex-col gap-10 justify-center

					overflow-clip

					before:absolute before:top-0 before:left-0 before:content-[''] before:w-full before:smooth-layout before:smooth-color
				"
			>
				{#each navItems as item, i}
					{#if open}
						<li
							in:fly={{ y: -15, delay: delay * i, duration: duration, easing: expoOut}}
							out:fly={{
								y: -15, delay: -delay + navItems.length * delay - delay * i, duration: duration, easing: expoIn}}
							bind:this={navElements[item.name]}
						>
							<a href={item.href}>{item.name}</a>
						</li>
					{/if}
				{/each}
			</ul>
		{:else}
			<ul
				class="
					flex items-center gap-10
				"
			>
				{#each navItems as item, i}
					<li
						in:fly|global={{ y: -15, delay: 100 * i, duration}}
						bind:this={navElements[item.name]}
					>
						<a href={item.href}>{item.name}</a>
					</li>
				{/each}
			</ul>
		{/if}
	{#if portrait}
		<HamburgerToggle bind:open={open} />
	{/if}
</nav>
