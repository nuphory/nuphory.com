<script lang="ts">
        import CartButton from './CartButton.svelte';
        import ThemeToggle from './ThemeToggle.svelte';
        import { isElementInViewport } from '$lib/utils/DOMutils';
        import { onMount } from 'svelte';
        import { browser } from '$app/environment';

        import { page } from '$app/stores';
        import { _siteName } from '$src/routes/+layout';

        let isHeaderVisible: boolean = true;

        onMount(() => {
                if (browser) {
                        isHeaderVisible = isElementInViewport(
                                document.querySelector('#page-title') as HTMLElement
                        );

                        window.addEventListener('scroll', (event) => {
                                let pageTitle = document.querySelector(
                                        '#page-title'
                                ) as HTMLElement;

                                isHeaderVisible = isElementInViewport(pageTitle);
                                console.debug('scroll', isHeaderVisible);
                        });
                }
        });
</script>

<header class="sticky z-10 top-0 clr-bg-primary text-center h-min">
        <nav class="max-w-5xl mx-auto">
                <ul class="mx-auto flex justify-between items-center max-w-5xl">
                        <li class="grow basis-0 m-4 text-left">
                                <ThemeToggle />
                        </li>
                        <li>
                                <a
                                        href="#"
                                        class="
                                                overflow-hidden
                                                clr-text-primary 
                                                hover:no-underline hover:scale-105
                                        "
                                >
                                        <h4
                                                class="
                                                transition-all duration-300 
                                                m-0
                                                {isHeaderVisible ? 'translate-y-full' : ''}
                                        "
                                        >
                                                {$page.route.id?.split('/').pop() || _siteName}
                                        </h4></a
                                >
                        </li>
                        <li class="grow basis-0 m-4">
                                <CartButton />
                        </li>
                </ul>
                <div
                        role="separator"
                        data-scroll="0"
                        class="
                                transition-all duration-150 ease-out
                                {isHeaderVisible ? 'opacity-0 w-0' : 'opacity-100 w-full lg:w-96'}
                                block m-auto
                                outline outline-[1.5px] outline-[var(--text-primary)]
                        "
                />
        </nav>
</header>
