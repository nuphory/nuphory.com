<script lang="ts">
        import SimpleCartList from '$lib/components/store/cart/checkout/SimpleCartList.svelte';

        import { browser } from '$app/environment';
        import type { Order } from '$lib/types/order';
        import { _siteDescription, _siteName } from '../../../../+layout';

        export let data;

        let order: Order;

        if (browser) {
                const previousOrderString = localStorage.getItem(`order.${data.order_id}`);

                if (previousOrderString) {
                        order = JSON.parse(previousOrderString);
                        console.debug('found cached order: ', order);
                }
        }
</script>

<svelte:head>
        <title>order confirmation — {_siteName}</title>
        <meta name="title" content="order confirmation — {_siteName}" />

        <link rel="canonical" href="https://{_siteName}.com/cart/checkout/confirmation/{data.order_id}" />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="order confirmation — {_siteName}" />
        <meta property="og:image" content="https://{_siteName}.com/assets/logo/png/summary.png" />
        <meta property="og:url" content="https://{_siteName}.com/cart/checkout/confirmation/{data.order_id}" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="order confirmation — {_siteName}" />
        <meta name="twitter:description" content={_siteDescription} />
        <meta name="twitter:image" content="https://{_siteName}.com/assets/logo/png/summary.png" />
</svelte:head>

<div id="top" class="relative flex flex-1 flex-col justify-center items-center min-h-screen py-8">
        <section id="page-title" class="pointer-events-none">
                <h1 class="tracking-[0.125em]">confirmed</h1>
        </section>
        <div class="content flex flex-col flex-1 justify-center items-start">
                <p class="w-full text-center">{`ORDER ID: ${order.external_id}`}</p>
                <section
                        id="cart-list"
                        class="w-80 relative flex flex-col justify-center items-center lg:order-2"
                >
                        <SimpleCartList
                                items={order.items}
                        />
                        <section id="back-to-home" class="mb-0 flex justify-center items-center ">
                                <a
                                        id="checkout-button"
                                        class="w-80 badge py-1 px-4 clr-bg clr-text clr-inverse !rounded-full font-mono"
                                        href="/"><b>back to home</b></a
                                >
                        </section>
                </section>
                <!-- <section id="checkout-form" class="max-w-2xl lg:order-1">
                        <CheckoutForm />
                </section> -->
        </div>
</div>
