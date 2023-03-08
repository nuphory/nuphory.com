<script lang="ts">
        // Imports
        import currentOrder from '$lib/api/stores/order';
        // Types
        import type { Item } from '$lib/types/product';

        // Components
        import CartList from '$src/lib/components/CartList.svelte';
        import { _siteDescription, _siteName } from '../+layout';

        let items: Item[] = $currentOrder.items;

        currentOrder.subscribe((order) => {
                items = order.items;
        });
</script>

<svelte:head>
        <title>cart — {_siteName}</title>
        <meta name="title" content="cart — {_siteName}" />

        <link rel="canonical" href="https://{_siteName}.com/cart" />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="cart — {_siteName}" />
        <meta property="og:image" content="https://{_siteName}.com/assets/logo/png/summary.png" />
        <meta property="og:url" content="https://{_siteName}.com/cart" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="cart — {_siteName}" />
        <meta name="twitter:description" content={_siteDescription} />
        <meta name="twitter:image" content="https://{_siteName}.com/assets/logo/png/summary.png" />
</svelte:head>

<section id="page-title">
        <h1>cart</h1>
</section>
<div role="separator" class="clr-border" />

<section id="cart-list" class="relative flex-1 flex flex-col justify-between items-center mb-0">
        <div />
        <CartList />
        <section
                class="
                        transition-colors duration-[var(--duration)] ease-out
                        sticky md:relative bottom-0 w-full mb-0 bg-secondary md:bg-[#00000000]
                "
        >
                <span
                        role="separator"
                        data-scroll="0"
                        class="
                                transition-quick duration-[var(--duration)] ease-out
                                w-full lg:w-96
                                block mx-auto
                                ring-1 ring-primary
                        "
                />
                <a
                        href="/cart/checkout"
                        class:opacity-50={items.length === 0}
                        class=" 
                                transition-quick duration-[var(--duration)] ease-out
                                h-12 w-full max-w-xs
                                py-2 px-4 m-4
                                rounded-full

                                text-secondary bg-primary
                                font-yeysk
                        "
                >
                        checkout
                </a>
        </section>
</section>
