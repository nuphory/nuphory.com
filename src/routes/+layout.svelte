<script lang="ts">
        // Imports
        import { _siteDescription, _siteName } from './+layout';
        import { browser } from '$app/environment';

        // PageData
        /** @type {import('./$types').LayoutData} */
        export let data: { pathname: string };

        // Components
        import Footer from '$src/lib/components/Footer.svelte';
        import Header from '$src/lib/components/Header.svelte';
        import PageTransition from '$src/lib/components/PageTransition.svelte';

        // Typefaces
        import '@fontsource/montserrat/400.css';
        import '@fontsource/montserrat/400-italic.css';
        import '@fontsource/fira-code/400.css';
        import '@fontsource/fira-mono/400.css';

        // Styles
        // import '../app.css';
        import '$lib/styles/app.scss';

        // import '$lib/styles/colors.scss';
        import '$lib/styles/typography.scss';
        import '$lib/styles/layout.scss';

        import '$lib/styles/styles.scss';

        (async () => {
                if (!browser) return;

                // TODO page title smoothly resizes on scroll, look into @scroll-linked css
                // window.addEventListener('scroll', () => {
                // 	var r = document.querySelector('h') as HTMLElement;
                // 	console.debug(r.style.getPropertyValue('--scroll-y'));

                // 	r.style.setProperty('--scroll-y', window.scrollY / 16 + 'em');

                // });

                // Smooth scrolling
                document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                        anchor.addEventListener('click', function (e) {
                                e.preventDefault();

                                document.querySelector(
                                        anchor.getAttribute('href') ?? '#top'
                                )?.scrollIntoView({
                                        behavior: 'smooth'
                                });
                        });
                });

                // Collapsible
                let collapsibles = document.querySelectorAll('.collapsible');
                collapsibles.forEach((collapsible) => {
                        collapsible.addEventListener('click', () => {
                                collapsible.classList.toggle('active');
                                let content = collapsible.nextElementSibling as HTMLElement;
                                if (!content) return;

                                // toggle content maxheight
                                if (content.style.maxHeight) {
                                        content.style.removeProperty('max-height');
                                } else {
                                        content.style.maxHeight = content.scrollHeight + 'px';
                                }
                        });
                });

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
        })();
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

<div class="relative flex flex-col justify-between min-h-screen min-h-[100dvh]">
        <Header />

        <!-- <OnMount> -->
        <PageTransition url={data.pathname} duration={500}>
                <main id="content" class="mx-auto text-center max-w-5xl">
                        <slot />
                </main>
        </PageTransition>
        <!-- </OnMount> -->

        <!-- <main class="relative flex flex-col items-center w-full max-w-5xl mx-auto my-0">
                <slot />
        </main> -->
</div>
<Footer />

<style>
        :global(*) {
                /* outline: 1px solid green; */
        }
        :global(#page-title h1) {
                font-size: 2.25em;
        }
</style>
