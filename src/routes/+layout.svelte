<script lang="ts">
        /* TODO
         * probably rewrite the way i currently display the products
         * right now there's 3 different components each handling item lists very similarly
         * i should mess about with svelte slots and see if i can make
         * a single component that can handle all of them
         */

        // Imports
        import { _siteDescription, _siteName } from './+layout';

        // PageData
        /** @type {import('./$types').LayoutData} */
        export let data: { pathname: string };
        let { pathname } = data;

        // Components
        import Footer from '$src/lib/components/Footer.svelte';
        import Header from '$src/lib/components/Header.svelte';
        import PageTransition from '$src/lib/components/utils/PageTransition.svelte';

        // Typefaces
        import '@fontsource/montserrat/400.css';
        import '@fontsource/montserrat/400-italic.css';
        import '@fontsource/fira-code/400.css';
        import '@fontsource/fira-mono/400.css';

        // Styles
        // import '../app.css';
        import '$lib/styles/app.scss';

        import type { Wretch } from 'wretch/types';

        /**
         * website designed by patch: https://twitter.com/patchstep
         */
        console.info(
                `%c${_siteName}%c\n\n\n${_siteName}.com was made by %cPatch\n%chttps://twitter.com/patchstep`,
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

        <meta property="og:site_name" content={_siteName} />

        <meta
                name="keywords"
                content="{_siteName}, {_siteName}music, {_siteName} music, volant, volantmusic, music, house, trance, hypertrance, neoy2k, progressive house"
        />
        <meta name="description" content={_siteDescription} />

        <meta property="og:description" content={_siteDescription} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@{_siteName}" />
        <meta name="twitter:creator" content="@{_siteName}" />
</svelte:head>

<div class="relative min-h-screen min-h-[100dvh]">
        <div class="flex flex-col min-h-screen h-auto">
                <Header />

                <PageTransition
                        classList="
                                flex flex-col flex-1
                                max-w-5xl w-full
                                mx-auto
                                text-center
                        "
                        url={pathname}
                        duration={300}
                >
                        <slot />
                </PageTransition>
        </div>
        <Footer />
</div>

<style>
        :global(*) {
                /* outline: 1px solid green; */
        }
        :global(#page-title h1) {
                font-size: 2.25em;
        }
</style>
