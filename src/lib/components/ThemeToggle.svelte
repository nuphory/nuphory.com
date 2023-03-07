<script context="module">
        export const prerender = false;
</script>

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

<div class="relative flex items-center gap-2">
        <label
                for="theme-toggle"
                class="
                        z-10
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
                                absolute
                                left-1/2 top-1/2
                                translate-x-[-50%] translate-y-[-50%]
                                h-[2em] w-[2em]
                                overflow-clip
                                rounded-full
                                clr-bg-primary
                        "
                >
                        <div
                                class="
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
                                        transition-[background-color,left,top] duration-300 ease-out
                                        absolute
                                        h-[1.5em] w-[1.5em]
                                        rounded-full
                                        clr-bg-primary
                                "
                        />
                </figure>
        </label>

        <a
                href="/"
                class="
                        transition-[transform,opacity,max-width] duration-300 ease-out
                        
                        opacity-0 sm:opacity-100
                        -translate-x-full sm:translate-x-0
                        max-w-0 sm:max-w-full
                        overflow-clip 
                        max-h-6
                        text-base
                        font-bold
                        clr-text-primary
                        hover:scale-100 active:scale-95 hover:no-underline
                "
        >
                <ul
                        class="
                                
                                block
                                clr-text-primary
                                translate-y-0
                                {theme === 'dark' ? 'hover:translate-y-0 -translate-y-6' : ''}
                                {theme === 'light'
                                ? 'hover:-translate-y-[4.5em] -translate-y-12'
                                : ''}
                        "
                >
                        <li>nuphory</li>
                        <li>::darkmode</li>
                        <li>::lightmode</li>
                        <li>nuphory</li>
                </ul>
        </a>
</div>

<style lang="scss">

        label:hover {
                @apply scale-105;
                figure {
                        @apply scale-[85%];
                }

        }
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
