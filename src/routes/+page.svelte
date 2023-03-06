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

        export let data;

        let { products } = data;

        const scrollButton = async (event) => {
                const clicked = event.target.classList.contains('clicked');

                const href = clicked
                        ? event.target.getAttribute('data-return-href')
                        : event.target.getAttribute('href');

                const target = document.querySelector(href) as HTMLElement;

                if (event.target.classList.contains('clicked')) {
                        event.target.classList.remove('clicked');
                } else {
                        event.target.classList.add('clicked');
                }

                await target.scrollIntoView({
                        behavior: 'smooth'
                });
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
        <div id="logo" class="h-[10.2em] mx-auto">
                <LottiePlayer
                        --player-width="{360}px"
                        --player-height="{360}px"
                        onmouseover={headbop}
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

        <ProductList {products} />
</section>

<!-- <div id="top" class="relative flex flex-col justify-between items-center">
        <section id="hero" class="relative grow flex flex-col justify-center items-center">
                <div class="sticky top-0 flex flex-col justify-center items-center">
                        <section class="z-40">
                                <fade-in distance="10px" duration="500ms" order="-1">
                                        <h1 id="page-title"><b>{_siteName}</b></h1>
                                </fade-in>
                        </section>
                        <section
                                id="shop"
                                class="flex flex-col justify-center items-center relative"
                        >
                                <heading
                                        id="shop-title"
                                        class="flex flex-col justify-center items-center text-center max-w-xl"
                                >
                                        <h4>Merch</h4>
                                        <p>
                                                All profits from this limited time merch run will be
                                                used to fund future projects and create
                                                opportunities for myself and other artists in the
                                                scene.
                                        </p>
                                </heading>
                                <ProductList {products} />
                        </section>
                </div>
        </section>
        <fade-in id="find-me" distance="10px" duration="500ms" order="15" class="mb-4">
                <a
                        href="#find-me"
                        data-return-href="#top"
                        id="find-me-link"
                        class="m-0 text-center scroll-button pointer-events-auto"
                        on:click={scrollButton}
                >
                        <h4 class="m-0 pointer-events-none">find me</h4>
                </a>
        </fade-in>
</div>

<section id="socials">
        <div id="buttons" class="flex flex-col items-center justify-center">
                <Buttons />
        </div>
</section>

<fade-in id="book-me" distance="10px" duration="500ms" order="15" class="mb-4">
        <a
                href="#book-me"
                data-return-href="#socials"
                id="book-me-link"
                class=" text-center scroll-button pointer-events-auto"
                on:click={scrollButton}
        >
                <h4 class="m-0 pointer-events-none">book me</h4>
        </a>
</fade-in>

<a
        href="#top"
        id="back-to-top"
        class="fixed bottom-4 right-4 flex items-center justify-center aspect-square w-12 rounded-full border-[3px] clr-bg transition-all duration-300 ease-in-out hover:border-[6px] active:border-[1px]"
        on:click={scrollToTop}
>
        <svg
                class="translate-y-[-12%] transition-all duration-300 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
        >
                <path class="fill-[var(--color-text)]" fill="white" d="M12 0l-12 24h24z" />
        </svg>
</a> -->
<style>
        /* .scroll-button::after {
                content: '🡣';
        }
        .scroll-button::before {
                content: '';
        }

        .scroll-button:global(.clicked)::after {
                content: '';
        }
        .scroll-button:global(.clicked)::before {
                content: '🡡';
        }

        #back-to-top:hover svg {
                transform: scale(0.8) translateY(-12%);
        } */
</style>
