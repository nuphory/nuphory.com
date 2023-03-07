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
<div role="separator" />

<section id="cart-list" class="flex-1 flex flex-col justify-between items-center">
        <a
                href="/cart/checkout"
                class:hidden={items.length === 1}
                class="         
                                w-full max-w-xs
                                {items.length === 0 ? 'max-h-0 py-0' : 'sm:max-h-0 sm:py-0'}
                                py-2 px-4
                                rounded-full
                                
                                clr-text-invert clr-bg-invert
                                font-mono
                        "
        >
                checkout
        </a>
        <CartList />
        <a
                href="/cart/checkout"
                class:opacity-50={items.length === 0}
                class="
                                w-full max-w-xs
                                py-2 px-4
                                rounded-full
                                
                                clr-text-invert clr-bg-invert
                                font-mono
                        "
        >
                checkout
        </a>
</section>

<!-- 
<div id="top" class="relative flex flex-1 flex-col justify-between items-center min-h-screen py-8">
        <section class="">
                <div id="page-title" class=""><h1>cart</h1></div>
        </section>
        <section
                id="cart-list"
                class="grow relative grow flex flex-col justify-center items-center"
        >
                <CartList />
        </section>
        {#if items.length > 0}
                <section id="checkout" class="flex justify-center items-center">
                        <a
                                id="checkout-button"
                                class="w-80 py-2 px-4 clr-text-invert clr-bg-invert rounded-full font-mono"
                                href="/cart/checkout"><b>checkout</b></a
                        >
                </section>
        {:else}
                <section id="checkout" class="flex justify-center items-center">
                        <a
                                id="checkout-button"
                                class="w-80 py-2 px-4 clr-text-invert clr-bg-invert rounded-full font-mono disabled"
                                href="/cart/checkout"><b>checkout</b></a
                        >
                </section>
        {/if}
</div> -->
