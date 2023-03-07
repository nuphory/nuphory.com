<script lang="ts">
        // constants
        import { _siteName, _siteDescription, _tagLine } from './+layout';

        // components
        import LottiePlayer from '$src/lib/components/utils/LottiePlayer.svelte';
        import Buttons from '$src/lib/components/Buttons.svelte';
        import ProductList from '$src/lib/components/ShopList.svelte';

        import NuphoryLogo from '$src/lib/components/icons/NuphoryLogo.svelte';
        import { goto } from '$app/navigation';

        async function scrollTo(event) {
                const sender = event.target;
                const target = document.querySelector(
                        `${sender.getAttribute('href')}-btt`
                ) as HTMLElement;

                if (!target) return;
                event.preventDefault();
                goto(sender.getAttribute('href'));

                target.setAttribute('data-return-pos', `${window.scrollY}`);
        }

        async function scrollBack(event) {
                const sender = event.target;

                event.preventDefault();
                await goto('/');

                if (sender.getAttribute('data-return-pos')) {
                        window.scrollTo({
                                top: sender.getAttribute('data-return-pos'),
                                behavior: 'smooth'
                        });
                        sender.removeAttribute('data-return-pos');
                        return;
                }
                window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                });
        }
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

<section
        id="hero"
        class="relative flex flex-col justify-between mx-auto min-h-[calc(100dvh-32rem)]"
>
        <div />
        <div>
                <div id="logo" class="relative aspect-square w-full max-w-[360px] mx-auto">
                        <NuphoryLogo
                                classList="
                                        absolute
                                        bottom-1/2 right-1/2
                                        translate-y-1/2 translate-x-1/2
                                        aspect-square w-full max-w-[360px]
                                        mx-auto
                                "
                        />
                </div>
                <header class="mt-[-6.5em]">
                        <h1 id="page-title"><b>{_siteName}</b></h1>
                </header>
        </div>
        <nav class="mx-auto">
                <h4
                        class="
                                transition-[transform,opacity,max-height] duration-300 ease-out
                                sm:opacity-0
                                
                                sm:max-w-0
                                sm:max-h-0
                                m-0 mx-auto

                                flex justify-center items-end

                        "
                >
                        <a href="#socials" class="select-none clr-text-primary" on:click={scrollTo}>
                                socials<br />
                                ⮟
                        </a>
                </h4>

                <ul
                        class="
                                transition-[transform,opacity,max-height] duration-300 ease-out

                                opacity-0 sm:opacity-100
                                translate-y-12 sm:translate-y-0
                                
                                overflow-clip
                                max-w-0 sm:max-w-md
                                max-h-0 sm:max-h-12
                                
                                flex justify-center items-end gap-8 
                        "
                >
                        <li>
                                <h4 class="m-0">
                                        <a
                                                href="#socials"
                                                class="select-none clr-text-primary"
                                                on:click={scrollTo}
                                        >
                                                socials
                                        </a>
                                </h4>
                        </li>
                        <li>
                                <h4 class="m-0 text-3xl">
                                        <a
                                                href="#merch"
                                                class="select-none clr-text-primary"
                                                on:click={scrollTo}
                                        >
                                                merch
                                        </a>
                                </h4>
                        </li>
                        <li>
                                <h4 class="m-0">
                                        <a
                                                href="#booking"
                                                class="select-none clr-text-primary"
                                                on:click={scrollTo}
                                        >
                                                booking
                                        </a>
                                </h4>
                        </li>
                </ul>
        </nav>
</section>

<div role="separator" class="clr-border"/>

<section id="merch" class="space-y-12">
        <h3 id="merch-btt" class="leading-4 m-0 mb-16">Merch</h3>
        <ProductList />
        <div class="max-w-xl mx-auto">
                <p>
                        All profits from this limited time merch run will be used to fund future
                        projects and create opportunities for myself and other artists in the scene.
                </p>
        </div>
</section>
<div role="separator" class="clr-border" />

<section id="socials" class="space-y-12">
        <div class="mb-4">
                <a
                        href="#top"
                        id="socials-btt"
                        class="m-0 text-center scroll-button clr-text-primary "
                        on:click={scrollBack}
                >
                        <h4 class="m-0 pointer-events-none">back to top</h4>
                </a>
        </div>
        <div id="buttons" class="flex flex-col gap-2 md:gap-1 items-center justify-center">
                <Buttons />
        </div>
</section>

<div id="book-me" class="mb-4">
        <span class="m-0 text-center scroll-button clr-text-primary ">
                <h4 class="m-0 pointer-events-none">book me</h4>
        </span>
</div>

<style lang="scss">
        .scroll-button {
                transition: all 0.3s ease-out;

                color: var(--text-primary);

                &[id$='-btt'] {
                        &::after {
                                content: '';
                        }
                        &::before {
                                content: '⮝';
                        }
                }

                &::after {
                        color: var(--text-primary);

                        content: '⮟';
                }
                &::before {
                        content: '';
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
