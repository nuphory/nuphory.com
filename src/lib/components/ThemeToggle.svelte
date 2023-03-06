<script lang="ts">
        import { browser } from '$app/environment';
        import { onMount } from 'svelte';

        let theme: string | null;

        onMount(() => {
                if (!browser) return;
                theme = document.documentElement.getAttribute('data-theme');
        });

        function toggleTheme(event: Event) {
                const html = document.documentElement;

                const checkbox = event.target as HTMLInputElement;

                html.setAttribute('data-theme', checkbox.checked ? 'light' : 'dark');
                theme = document.documentElement.getAttribute('data-theme');
        }
</script>

<div class="flex items-center gap-2">
        <label
                for="theme-toggle"
                class="
                        transition-all duration-300 ease-out
                        relative
                        inline-block
                        cursor-pointer
                        aspect-square w-[2.5em]
                        rounded-full
                        hover:scale-105
                        clr-bg-invert clr-text-invert
                "
        >
                <input
                        id="theme-toggle"
                        type="checkbox"
                        class="opacity-0 w-0 h-0"
                        on:click={toggleTheme}
                />
                <figure
                        class="
                                transition-all duration-300 ease-out
                                absolute
                                left-1/2 top-1/2
                                translate-x-[-50%] translate-y-[-50%]
                                h-[2em] w-[2em]
                                hover:scale-[85%]
                                overflow-clip
                                rounded-full
                                clr-bg-primary
                        "
                >
                        <div
                                class="
                                        transition-all duration-300 ease-out
                                        absolute
                                        right-1/2 bottom-1/2
                                        translate-x-1/2 translate-y-1/2
                                        h-[1.5em] w-[1.5em]
                                        rounded-full
                                        clr-bg-invert
                                "
                        />

                        <div
                                class="
                                        transition-all duration-300 ease-out
                                        absolute
                                        right-1/2 bottom-1/2
                                        translate-x-1/2 translate-y-1/2
                                        h-[1.5em] w-[1.5em]
                                        rounded-full
                                        clr-bg-invert opacity-30
                                "
                        />

                        <div
                                class="
                                        transition-all duration-300 ease-out
                                        absolute
                                        h-[1.5em] w-[1.5em]
                                        rounded-full
                                        clr-bg-primary
                                "
                        />
                </figure>
        </label>
        {#if theme}
                <p class="hidden sm:inline">::{theme}mode</p>
        {/if}
</div>

<style lang="scss">
        :global([data-theme='dark']) {
                figure {
                        > div:last-child {
                                @apply left-[35%] top-[-5%];
                        }
                }
        }
        :global([data-theme='light']) {
                figure {
                        > div:first-child {
                                @apply scale-75;
                        }
                        > div:last-child {
                                @apply left-full top-[-25%];
                        }
                }
        }
</style>
