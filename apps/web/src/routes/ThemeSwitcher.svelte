<script lang="ts">
	import { setTheme } from "$lib/stores/theme";

	import { delay, duration } from "$lib/utils/transitions";
	import { expoIn, expoOut } from "svelte/easing";
	import { fly, scale } from "svelte/transition";

	let theme = "light"

	function handleChange(event: Event) {
		theme = (event.target as HTMLSelectElement).value

		setTheme(theme)
	}

	function toggleTheme() {
		console.log("toggleTheme")
		theme = theme === "light" ? "dark" : "light"
	}

</script>
<!-- TODO -->

<div class="aspect-square">

	<select
		name="themes" id="themes" bind:value={theme}
		class="hidden"
		on:click={toggleTheme}
		on:change={handleChange}
	>
		<option value="light">Light</option>
		<option value="dark">Dark</option>
	</select>

	<label
		for="themes"
		class="
			relative block
			w-10 aspect-square
			[&>*]:hover:scale-90
			rounded-full
			border hover:border-[3px]
			cursor-pointer
			[&_*]:!duration-500
			smooth-color
			overflow-clip
		"
	>
		<figure class="absolute center w-full aspect-square rounded-full" >
			<ul id="rays">
				{#each new Array(8) as _, i}
					<li
						class="
							absolute center
							{theme === "light" ? "w-1 h-1 opacity-100" : "w-0 h-0 opacity-0"}
							smooth-color
						"
						style="transition-delay: {i * delay/2}ms"
					>
						<div
							class="absolute top-0 left-0 w-full h-full rounded-full bg-secondary"
							style="transform: rotate({i * 360 / 8}deg) translateX(0.75rem)"
						>
						</div>
					</li>
				{/each}
			</ul>
			<div
				id="sun"
				class="
					absolute center
					{theme === "light" ? "w-3" : "w-6"}
					aspect-square
					rounded-full
					bg-secondary
					smooth-layout
				"
			/>
			<div
				id="shadow"
				class="
					absolute top-1/2 left-1/2
					w-6 aspect-square
					rounded-full
					bg-primary

					smooth-layout smooth-pos
				"
				style="transform: translate(-50%, -50%) rotate(-30deg) translateX({theme === "light" ? "2rem": "0.75rem" });"
			/>

			<!-- {#each Array.from({ length: 8 }) as _, i}
				{#if theme === "light"}
					<div
						transition:scale={{ delay: i * delay, duration, start: 15 }}
						class="

							sunray

							absolute center

							{theme === "light" ? "w-[0.125rem]" : null} h-[0.125rem]

							smooth-layout

							after:content-['']
							after:absolute
							after:top-0 after:left-[0.625rem] after:w-full after:h-full after:bg-secondary after:rounded-full
						"
						style="--tw-rotate: {i * (360/8)}deg; transition-delay: {i * delay}ms;"
					/>
				{/if}
			{/each} -->

		</figure>
	</label>

</div>

<style lang="scss">
	figure {

	}
</style>
