<script lang="ts">
	import { duration } from '$lib/utils/transitions';
	import { fly } from "svelte/transition";

	let { open, ...rest } = $props();
</script>
<div class="{rest.class as string}" in:fly={{x: 15, duration}}>
	<input type="checkbox" name="navburger" id="navburger" class="hidden" bind:checked={open}>
	<label
		for="navburger"

		class:-rotate-135={open}
		class="
			flex flex-col gap-2 justify-center

			cursor-pointer

			smooth-pos

			[&_*]:w-10 [&_*]:h-[0.125rem]
			[&_*]:smooth-color [&_*]:smooth-pos

			[&>*:nth-child(odd)]:bg-secondary

		"
	>
		<div class:opacity-0={open} />
		<div class="relative [&>*]:absolute [&>*]:bg-secondary">
			<div class:-rotate-90={open}/>
			<div class:rotate-0={open}/>
		</div>
		<div class:opacity-0={open} />
	</label>
</div>
