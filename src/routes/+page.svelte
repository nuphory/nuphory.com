<script lang="ts">
        // constants
        import { _siteName, _siteDescription, _tagLine } from './+layout';

        // components
        import Buttons from '$src/lib/components/Buttons.svelte';
        import ProductList from '$src/lib/components/ShopList.svelte';

        import NuphoryLogo from '$src/lib/components/icons/NuphoryLogo.svelte';
        import { goto } from '$app/navigation';

        async function scrollTo(event) {
                const sender = event.target;

                event.preventDefault();
                goto(sender.getAttribute('href'));

                (
                        document.querySelector(`${sender.getAttribute('href')}-btt`) as HTMLElement
                )?.setAttribute('data-return-pos', `${window.scrollY}`);
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
        class="
                relative 
                flex flex-col justify-between 
                min-h-[calc(100dvh-12rem)]
                mx-auto mt-0
        "
>
        <div />
        <div>
                <div
                        id="logo"
                        class="
                                transition-layout duration-[var(--duration)]

                                relative
                                aspect-square w-full max-w-[260px] sm:max-w-[360px]

                                mx-auto
                        "
                >
                        <NuphoryLogo
                                classList="
                                        transition-[stroke] duration-[var(--duration)] ease-out
                                        absolute z-0
                                        bottom-1/2 right-1/2
                                        translate-y-1/2 translate-x-1/2
                                        w-full 
                                        
                                        mx-auto
                                        stroke-primary
                                "
                        />
                </div>
                <header class="relative z-10 -mt-8">
                        <h1 id="page-title">{_siteName}</h1>
                </header>
        </div>
        <nav class="mx-auto">
                <h4
                        class="
                                transition-[transform,opacity,max-height] duration-[var(--duration)] ease-out
                                sm:opacity-0
                                
                                sm:max-w-0
                                sm:max-h-0
                                m-0 mt-8 mx-auto

                                flex justify-center items-end

                        "
                >
                        <a href="#socials" class="select-none text-primary" on:click={scrollTo}>
                                socials<br />
                                ▼
                        </a>
                </h4>

                <ul
                        class="
                                transition-[transform,opacity,max-height] duration-[var(--duration)] ease-out

                                opacity-0 sm:opacity-100
                                translate-y-12 sm:translate-y-0
                                
                                overflow-clip
                                max-w-0 sm:max-w-lg
                                max-h-0 sm:max-h-12
                                
                                flex justify-center items-end gap-16 
                        "
                >
                        <li>
                                <h4 class="m-0 text-xl">
                                        <a href="#socials" class="select-none" on:click={scrollTo}>
                                                socials
                                        </a>
                                </h4>
                        </li>
                        <li>
                                <h4 class="m-0 text-3xl">
                                        <a href="#merch" class="select-none" on:click={scrollTo}>
                                                merch
                                        </a>
                                </h4>
                        </li>
                        <li>
                                <h4 class="m-0 text-xl">
                                        <a href="#booking" class="select-none" on:click={scrollTo}>
                                                booking
                                        </a>
                                </h4>
                        </li>
                </ul>
        </nav>
</section>

<div role="separator" />

<section
        id="merch"
        class="
                flex flex-col justify-between
                min-h-[calc(100dvh-16rem)]
        "
>
        <h2 class="relative flex flex-col justify-between flex-1">
                <div class="flex-1" />
                <div class="block sticky bottom-0 pb-8">Merch</div>
                <div class="flex-1" />
        </h2>
        <div class="max-w-xl mx-auto space-y-4">
                <ProductList />

                <p class="mx-4">
                        All profits from this limited time merch run will be used to fund future
                        projects and create opportunities for myself and other artists in the scene.
                </p>
        </div>
        <div class="relative flex flex-col justify-between flex-1">
                <div class="flex-1" />
                <div class="inline-block sticky bottom-0 py-8">
                        <a
                                href="#top"
                                id="merch-btt"
                                class="group m-0 text-center scroll-button"
                                on:click={scrollBack}
                        >
                                <h4
                                        class="
                                                m-0 pointer-events-none 
                                                after:content-['_to_top']
                                                after:group-data-[return-pos]:content-[''] 
                                        "
                                >
                                        back
                                </h4>
                        </a>
                </div>
        </div>
</section>

<div role="separator" />

<section
        id="socials"
        class="
                flex flex-col justify-between
                min-h-[calc(100dvh-48rem)]
        "
>
        <h2 class="relative flex flex-col justify-between flex-1">
                <div class="flex-1" />
                <div class="block sticky bottom-0 pb-8">Socials</div>
                <div class="flex-1" />
        </h2>
        <div id="buttons" class="mx-auto flex flex-col gap-2 md:gap-1 items-center justify-center">
                <Buttons />
        </div>
        <div class="relative flex flex-col justify-between flex-1">
                <div class="flex-1" />
                <div class="inline-block sticky bottom-0 py-8">
                        <a
                                href="#top"
                                id="socials-btt"
                                class="group m-0 text-center scroll-button"
                                on:click={scrollBack}
                        >
                                <h4
                                        class="
                                                m-0 pointer-events-none 
                                                after:content-['_to_top']
                                                after:group-data-[return-pos]:content-[''] 
                                        "
                                >
                                        back
                                </h4>
                        </a>
                </div>
        </div>
</section>

<div role="separator" />

<div id="book-me" class="my-8">
        <span class="m-0 text-center scroll-button">
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
                                content: '▲';
                        }
                }

                &::after {
                        color: var(--text-primary);

                        content: '▼';
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
