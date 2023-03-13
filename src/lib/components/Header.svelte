<script lang="ts">
        // Imports
        import site from '$lib/identity';
        import { afterUpdate, onMount } from 'svelte';
        import { browser } from '$app/environment';
        import { page } from '$app/stores';
        import { isElementInViewport } from '$lib/utils/DOMutils';
        
        // Components
        import CartButton from './CartButton.svelte';
        import ThemeToggle from './ThemeToggle.svelte';


        let theme: string | null;
        let mounted: boolean = false;

        let pageTitleVisible: boolean = false;

        onMount(async () => {
                mounted = true;
                if (browser) {
                        theme = document.documentElement.getAttribute('data-theme');

                        checkVisibility('#page-title');
                        window.addEventListener('scroll', () => {
                                checkVisibility('#page-title');
                        });
                }
        });

        async function checkVisibility(query: string) {
                pageTitleVisible = isElementInViewport(query);
        }
</script>

<header
        class:bg-secondary={!pageTitleVisible}
        class="
                transition-colors duration-[var(--duration)] ease-out
                text-primary
                sticky 
                z-10 top-0 h-min text-center
        "
>
        <nav class="max-w-5xl mx-auto">
                <ul class="flex justify-between items-center max-w-5xl mx-auto">
                        <li class="flex-1 m-4 text-left">
                                <ThemeToggle />
                        </li>
                        <li>
                                <div class="overflow-hidden">
                                        <h4
                                                class:translate-y-full={pageTitleVisible && mounted}
                                                class="transition-[transform] duration-[var(--duration)] ease-out m-0"
                                        >
                                                {$page?.route?.id?.split('/').pop() || site.name}
                                        </h4>
                                </div>
                        </li>
                        <li class="flex-1 m-4">
                                <CartButton />
                        </li>
                </ul>
                <span
                        role="separator"
                        data-scroll="0"
                        class="
                                transition-quick duration-[var(--duration)] ease-out

                                block 
                                mx-auto

                                {pageTitleVisible && mounted
                                ? 'w-0 opacity-0'
                                : 'w-full lg:w-96 opacity-100'}

                                ring-primary ring-[1.5px]
                        "
                />
        </nav>
</header>
