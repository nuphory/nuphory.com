<script lang="ts">
        // TODO new themes
        import SimpleCartList from '$src/lib/components/SimpleCartList.svelte';
        import site from '$lib/identity';

        import { browser } from '$app/environment';
        import type { Order } from '$lib/types/order';

        export let data;

        let order: Order;

        if (browser) {
                const previousOrderString = localStorage.getItem(`order.${data.order_id}`);

                if (previousOrderString) {
                        order = JSON.parse(previousOrderString);
                        console.info('found cached order: ', order);
                        // console.debug('found cached order: ', order);
                }
        }
</script>

<svelte:head>
        <title>order confirmation — {site.name}</title>
        <meta name="title" content="order confirmation — {site.name}" />

        <link
                rel="canonical"
                href="https://{site.name}.com/cart/checkout/confirmation/{data.order_id}"
        />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="order confirmation — {site.name}" />
        <meta property="og:image" content="https://{site.name}.com/assets/logo/png/summary.png" />
        <meta
                property="og:url"
                content="https://{site.name}.com/cart/checkout/confirmation/{data.order_id}"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="order confirmation — {site.name}" />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content="https://{site.name}.com/assets/logo/png/summary.png" />
</svelte:head>

<div id="top" class="relative flex flex-1 flex-col justify-center items-center min-h-screen py-8">
        {#if order}
                <!-- content here -->
                <section id="page-title" class="pointer-events-none">
                        <h1 class="tracking-[0.125em]">order confirmed</h1>
                </section>
                <div class="content flex flex-col flex-1 justify-center items-center max-w-xl">
                        <p class="w-full text-center">{`ORDER ID: ${order.external_id}`}</p>
                        <p class="w-full text-center">
                                Please note this order ID down somewhere, as we don't have email
                                order confirmation working just yet.
                        </p>
                        <p class="w-full text-center">
                                If you have any questions, please contact us, including your order
                                ID at <a href="mailto:nuphory@gmail.com">nuphory@gmail.com</a>, or a
                                moderator on our
                                <a href="https://discord.gg/RF7t34QJmr">discord</a>.
                        </p>
                        <section
                                id="cart-list"
                                class="w-80 relative flex flex-col justify-center items-center lg:order-2"
                        >
                                <SimpleCartList {order} />
                                <section
                                        id="back-to-home"
                                        class="mb-0 flex justify-center items-center "
                                >
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
        {:else}
                <section id="page-title" class="pointer-events-none">
                        <h1 class="tracking-[0.125em]">order not found</h1>
                </section>
                <div class="content flex flex-col flex-1 justify-center items-center max-w-xl">
                        <p class="w-full text-center">
                                The order with id {data.order_id} was either not confirmed, or doesn't
                                exist.
                        </p>
                        <p class="w-full text-center">
                                If you believe this to be an error, please contact us, including
                                your order ID, at <a href="mailto:nuphory@gmail.com"
                                        >nuphory@gmail.com</a
                                >
                                or a moderator on our
                                <a href="https://discord.gg/RF7t34QJmr">discord</a>.
                        </p>
                        <section
                                id="cart-list"
                                class="w-80 relative flex flex-col justify-center items-center lg:order-2"
                        >
                                <section
                                        id="back-to-home"
                                        class="mb-0 flex justify-center items-center "
                                >
                                        <a
                                                id="checkout-button"
                                                class="w-80 badge py-1 px-4 clr-bg clr-text clr-inverse !rounded-full font-mono"
                                                href="/"><b>home</b></a
                                        >
                                </section>
                        </section>
                </div>
        {/if}
</div>
