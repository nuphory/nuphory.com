<script lang="ts">
        // constants
        import { _siteName, _siteDescription, _tagLine } from './+layout';

        // components
        import LottiePlayer from '$src/lib/components/LottiePlayer.svelte';
        import Buttons from '$src/lib/components/Buttons.svelte';
        import ProductList from '$src/lib/components/ProductList.svelte';

        // lottie animations
        // import intro from '$lib/assets/lottie/intro.json';
        // import headbang from '$lib/assets/lottie/headbang.json';
        // import settle from '$lib/assets/lottie/settle.json';
        import headbop from '$lib/assets/lottie/headbop.json';
        import NuphoryLogo from '$src/lib/components/icons/NuphoryLogo.svelte';

        // export let data;

        // let { products } = data;

        const scrollButton = async (event) => {
                event.preventDefault();

                const sender = event.target;

                if (sender.getAttribute('data-return-pos')) {
                        await window.scrollTo({
                                top: sender.getAttribute('data-return-pos'),
                                behavior: 'smooth'
                        });
                        sender.removeAttribute('data-return-pos');
                        sender.classList.remove('active');
                        return;
                }

                const target = document.querySelector(sender.getAttribute('href')) as HTMLElement;

                await target.scrollIntoView({
                        behavior: 'smooth'
                });
                sender.setAttribute('data-return-pos', window.scrollY);
                sender.classList.add('active');
        };

        const scrollToTop = async () => {
                await window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                });
        };
</script>

<svelte:head>
        <title>{_siteName}</title>
        <meta name="title" content="{_siteName} — {_tagLine}" />
        <meta
                name="keywords"
                content="{_siteName}, {_siteName}music, {_siteName} music, volant, volantmusic, music, house, trance, hypertrance, neoy2k, progressive house"
        />
        <meta name="description" content={_siteDescription} />

        <link rel="canonical" href="https://nuphory.com" />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="{_siteName} — {_tagLine}" />
        <meta property="og:description" content={_siteDescription} />
        <meta property="og:image" content="https://{_siteName}.com/assets/logo/png/summary.png" />
        <meta property="og:url" content="https://{_siteName}.com" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@{_siteName}" />
        <meta name="twitter:creator" content="@{_siteName}" />
        <meta name="twitter:title" content="{_siteName} — {_tagLine}" />
        <meta name="twitter:description" content={_siteDescription} />
        <meta name="twitter:image" content="https://{_siteName}.com/assets/logo/png/summary.png" />
</svelte:head>

<section id="hero" class="relative mx-auto">
        <div id="logo" class="h-[10.3em] mx-auto">
                <LottiePlayer
                        --player-width="{360}px"
                        --player-height="{360}px"
                        onmouseover={headbop}
                        Placeholder={NuphoryLogo}
                />
        </div>
        <header class="z-10">
                <h1 id="page-title"><b>{_siteName}</b></h1>
        </header>
</section>

<section id="shop">
        <div class="max-w-xl mx-auto">
                <h4>Merch</h4>

                <p>
                        All profits from this limited time merch run will be used to fund future
                        projects and create opportunities for myself and other artists in the scene.
                </p>
        </div>

        <ProductList />
</section>

<div id="find-me" class="mb-4">
        <a
                href="#find-me"
                id="find-me-link"
                class="m-0 text-center scroll-button clr-text-primary pointer-events-auto"
                on:click={scrollButton}
        >
                <h4 class="m-0 pointer-events-none">find me</h4>
        </a>
</div>

<section id="socials">
        <div id="buttons" class="flex flex-col items-center justify-center">
                <Buttons />
        </div>
</section>

<div id="book-me" class="mb-4">
        <a
                href="#book-me"
                id="book-me-link"
                class="m-0 text-center scroll-button clr-text-primary pointer-events-auto"
                on:click={scrollButton}
        >
                <h4 class="m-0 pointer-events-none">book me</h4>
        </a>
</div>

<style lang="scss">
        .scroll-button {
                transition: all 0.3s ease-out;

                color: var(--text-primary);

                &::after {
                        color: var(--text-primary);

                        content: '🡣';
                }
                &::before {
                        content: '';
                }

                &:global(.active) {
                        &::after {
                                content: '';
                        }
                        &::before {
                                color: var(--text-primary);

                                content: '🡡';
                        }
                }
        }

        // .scroll-button::after {
        //         content: '🡣';
        // }
        // .scroll-button::before {
        //         content: '';
        // }

        // .scroll-button:global(.active)::after {
        //         content: '';
        // }
        // .scroll-button:global(.active)::before {
        //         content: '🡡';
        // }

        /* #back-to-top:hover svg {
                transform: scale(0.8) translateY(-12%);
        } */
</style>
