<script lang="ts">
	import { duration } from '$lib/utils/transitions';
	import { fly } from "svelte/transition";

	let { open, ...rest } = $props();
</script>
<div class="{rest.class as string}" in:fly={{x: 15, duration}}>
	<input type="checkbox" name="navburger" id="navburger" class="hidden" bind:checked={open}>
	<label
		for="navburger"
		class="
			relative block w-10

			[&_*]:smooth-color [&_*]:smooth-pos [&_*]:!duration-500 !duration-500

			{open ? "h-10 rounded-3xl border " : "h-6 border-[0.125rem]"}

			rounded-none
			border-primary

			smooth-pos
			smooth-decor
			cursor-pointer

			[&>*]:absolute [&>*]:left-1/2 [&>*]:top-1/2 [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/2
			[&>*]:border-y-[0.065rem] [&>*]:border-y-primary [&>*]:bg-secondary

			{open ? "[&>*]:w-6" : "[&>*]:w-10"}

			after:content-[''] after:block after:absolute after:center after:bg-primary after:w-11
			after:smooth-layout after:smooth-color after:!duration-500
			{open ? ' after:h-0' : 'after:h-full'}
		"
	>
		<div class:-rotate-225={open} class="z-10"/>
		<div class:-rotate-135={open} class="z-10"/>
	</label>
</div>
