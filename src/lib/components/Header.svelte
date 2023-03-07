<script lang="ts">
        import CartButton from './CartButton.svelte';
        import ThemeToggle from './ThemeToggle.svelte';
        import { isElementInViewport } from '$lib/utils/DOMutils';
        import { afterUpdate, onMount } from 'svelte';
        import { browser } from '$app/environment';

        import { page } from '$app/stores';
        import { _siteName } from '$src/routes/+layout';

        let theme: string | null;
        let mounted: boolean = false;

        let pageTitleVisible: boolean = false;

        onMount(async () => {
                mounted = true;
                if (browser) {
                        theme = document.documentElement.getAttribute('data-theme');

                        checkVisibility('#page-title');

                        window.addEventListener('scroll', () => {
                                console.debug(
                                        'scroll',
                                        pageTitleVisible,
                                        isElementInViewport('#page-title')
                                );
                                checkVisibility('#page-title');
                        });
                }
        });

        async function checkVisibility(query: string) {
                pageTitleVisible = isElementInViewport(query);
        }
</script>

<header class="sticky z-10 top-0 {pageTitleVisible ? '' : 'clr-bg-primary'} text-center h-min">
        <nav class="max-w-5xl mx-auto">
                <ul class="mx-auto flex justify-between items-center max-w-5xl">
                        <li class="grow basis-0 m-4 text-left">
                                <ThemeToggle />
                        </li>
                        <li>
                                <div class="overflow-hidden">
                                        <h4
                                                class="
                                                        transition-[transform] duration-300 ease-out
                                                        m-0
                                                        {pageTitleVisible && mounted
                                                        ? 'translate-y-full'
                                                        : ''}
                                        "
                                        >
                                                {$page.route.id?.split('/').pop() || _siteName}
                                        </h4>
                                </div>
                        </li>
                        <li class="grow basis-0 m-4">
                                <CartButton />
                        </li>
                </ul>
                <span
                        role="separator"
                        data-scroll="0"
                        class="
                                transition-[width] duration-150 ease-out
                                {pageTitleVisible && mounted
                                ? 'opacity-0 w-0'
                                : 'opacity-100 w-full lg:w-96'}
                                block mx-auto
                                outline outline-[1.5px] outline-[var(--text-primary)]
                        "
                />
        </nav>
</header>
