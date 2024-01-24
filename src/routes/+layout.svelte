<script lang="ts">
        /* TODO
         * probably rewrite the way i currently display the products
         * right now there's 3 different components each handling item lists very similarly
         * i should mess about with svelte slots and see if i can make
         * a single component that can handle all of them
         */

        // Imports
        import site from '$lib/identity';

        // PageData
        /** @type {import('./$types').LayoutData} */
        export let data: { pathname: string };

        // Components
        import Footer from '$src/lib/components/Footer.svelte';
        import Header from '$src/lib/components/Header.svelte';

        // Typefaces
        import '@fontsource/montserrat/400.css';
        import '@fontsource/montserrat/400-italic.css';
        import '@fontsource/fira-code/400.css';
        import '@fontsource/fira-mono/400.css';

        // Styles
        // import '../app.css';
        import '$lib/styles/app.scss';
        import { onMount } from 'svelte';
        import { fly } from 'svelte/transition';
        import { browser } from '$app/environment';
        import { theme } from '$lib/api/stores/theme';

        let mounted: boolean = false;

        onMount(() => {
                mounted = true;
                theme.subscribe((theme) => {
                        const html = document.documentElement;

                        html.dataset.theme = theme;
                });
        });

        /**
         * website designed by patch: https://twitter.com/patchstep
         */
        console.info(
                `%c${site.name}%c\n\n\n${site.name}.com was made by %cPatch\n%chttps://twitter.com/patchstep`,
                "font-family: 'Yeysk'; font-size: 6em; font-weight: bold; text-stroke: 2px #272d3b; color: #fffaf7;",
                'font-size: 2em; color: #fffaf7;',
                'font-size: 2em; color: #fffaf7; font-weight: bold;',
                'font-size: 1em; color: #fffaf7; font-weight: bold;'
        );
</script>

<svelte:head>
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
        <link
                rel="icon"
                type="image/png"
                sizes="194x194"
                href="/assets/favicon/favicon-194x194.png"
        />
        <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="/assets/favicon/android-chrome-192x192.png"
        />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg" color="#272d3b" />
        <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="nuphory" />
        <meta name="application-name" content="nuphory" />
        <meta name="msapplication-TileColor" content="#272d3b" />
        <meta name="msapplication-TileImage" content="/assets/favicon/mstile-144x144.png" />
        <meta name="msapplication-config" content="/assets/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#fffaf7" />

        <meta property="og:site_name" content={site.name} />

        <meta
                name="keywords"
                content="{site.name}, {site.name}music, {site.name} music, volant, volantmusic, music, house, trance, hypertrance, neoy2k, progressive house"
        />
        <meta name="description" content={site.description} />

        <meta property="og:description" content={site.description} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@{site.name}" />
        <meta name="twitter:creator" content="@{site.name}" />
</svelte:head>

<div class="relative min-h-screen min-h-[100dvh]">
        <div class="z-10 flex flex-col min-h-screen h-auto">
                <Header />
                {#key data.pathname}
                        {#if mounted}
                                <main
                                        class="
                                                flex flex-col flex-1
                                                max-w-5xl w-full
                                                mx-auto
                                                text-center
                                        "
                                        in:fly={{
                                                x: -5,
                                                duration: 300,
                                                delay: 300
                                        }}
                                        out:fly={{ x: 5, duration: 300 }}
                                >
                                        <slot />
                                </main>
                        {/if}
                {/key}
        </div>
        <Footer />
        <!--<div class="relative -z-10 opacity-30">
                <div
                        class="fixed h-[36rem] w-[256rem] rounded-full ring-primary ring-3 top-0 left-1/2 translate-x-[15rem] -translate-y-[24rem] "
                />
                <div
                        class="fixed h-[64rem] w-[256rem] rounded-full ring-primary ring-3 bottom-0 right-1/2 -translate-x-[20rem] translate-y-[24rem] "
                />
                <div
                        class="fixed h-[32rem] w-[256rem] rounded-full ring-primary ring-3 bottom-0 right-1/2 -translate-x-[36rem] translate-y-[8rem] "
                />

                <div
                        class="fixed h-[32rem] w-[256rem] rounded-full ring-primary ring-3 bottom-0 right-1/2 -translate-x-[34rem] -translate-y-[32.2rem] "
                />
                <div
                        class="fixed h-[16rem] w-[256rem] rounded-full ring-primary ring-3 bottom-0 right-1/2 -translate-x-[42rem] -translate-y-[40.2rem] "
                />
                <div
                        class="fixed h-[256rem] w-[48rem] rounded-full ring-primary ring-3 top-0 right-1/2 -translate-x-[30rem] -translate-y-[188.3rem] "
                />
                <div
                        class="fixed h-[256rem] w-[24rem] rounded-full ring-primary ring-3 top-0 right-1/2 -translate-x-[42rem] -translate-y-[200.3rem] "
                />
                <div
                        class="fixed h-[32rem] w-[256rem] rounded-full ring-primary ring-3 bottom-0 left-1/2 translate-x-[24rem] -translate-y-[4rem] "
                />
                <div
                        class="fixed h-[16rem] w-[256rem] rounded-full ring-primary ring-3 bottom-0 left-1/2 translate-x-[32rem] -translate-y-[12rem] "
                />
                <div
                        class="fixed h-[256rem] w-[32rem] rounded-full ring-primary ring-3 bottom-0 left-1/2 translate-x-[25rem] -translate-y-[5rem] "
                />
                <div
                        class="fixed h-[256rem] w-[16rem] rounded-full ring-primary ring-3 bottom-0 left-1/2 translate-x-[33rem] -translate-y-[13rem] "
                />
        </div>-->
</div>

<style lang="scss">
        // :global() {
        //         :root {

        //         }
        //         * {
        //                 /* outline: 1px solid green; */
        //         }
        // }
</style>
