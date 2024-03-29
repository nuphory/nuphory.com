<script lang="ts">
        // Imports
        import site from '$lib/identity';
        import _ from 'lodash';

        import {
                loadScript,
                type CreateOrderActions,
                type CreateOrderData,
                type OnApproveActions,
                type OnApproveData,
                type OnCancelledActions,
                type OnClickActions,
                type PayPalNamespace,
                type PurchaseUnit
        } from '@paypal/paypal-js';
        import { PUBLIC_PAYPAL_CLIENT_ID } from '$env/static/public';

        import { browser } from '$app/environment';
        import currentOrder from '$lib/api/stores/order';
        import defaultOrder from '$lib/types/order';
        import wretch, { type Wretch } from 'wretch';
        import AbortAddon from 'wretch/addons/abort';

        // Types
        import type { Recipient } from '$lib/types/recipient';
        import type { Item } from '$lib/types/product';

        // Components
        import CheckoutForm from '$src/lib/components/CheckoutForm.svelte';
        import SimpleCartList from '$src/lib/components/SimpleCartList.svelte';
        import { onMount } from 'svelte';

        import { page } from '$app/stores';

        const api = wretch($page.url.origin + '/api')
                .content('application/json')
                .addon(AbortAddon())
                .middlewares([]);

        let orderId: string;
        let shipping_available = false;

        loadScript({ 'client-id': PUBLIC_PAYPAL_CLIENT_ID, currency: 'EUR' })
                .then(createButton)
                .catch((error) => console.error('failed to load the PayPal JS SDK script', error));

        async function createButton(paypal: PayPalNamespace | null) {
                if (!paypal) return;

                // console.debug('loaded the PayPal JS SDK script: ', paypal);

                const buttonContainer = document.querySelector(
                        '#paypal-button-container'
                ) as HTMLDivElement;

                const paypalButton = paypal.Buttons({
                        style: {
                                layout: 'vertical',
                                tagline: false,
                                color: 'blue',

                                shape: 'pill',

                                label: 'paypal'
                        },
                        onClick,
                        createOrder,
                        onApprove,
                        onCancel,
                        onError
                });
                paypalButton.render('#paypal-button-container');

                currentOrder.subscribe(() => {
                        buttonContainer.classList.add('hidden');

                        if (currentOrder.isRecipientValid() && shipping_available) {
                                buttonContainer.classList.remove('hidden');
                        }
                });
        }

        async function onClick(data: Record<string, unknown>, actions: OnClickActions) {
                if (!currentOrder.isRecipientValid() && shipping_available) return actions.reject();

                api.url('/orders/estimate-costs')
                        .post($currentOrder)
                        .json((json) => {
                                currentOrder.setRetailCosts({
                                        shipping: json.result.costs.shipping,
                                        tax: json.result.costs.tax
                                });

                                currentOrder.createId();

                                return actions.resolve();
                        })
                        .catch((error) => {
                                console.error('Could not fetch shipping costs. ', error);
                                window.alert(
                                        'Could not fetch shipping costs. Please try again later.\n\nView the console for more details.'
                                );
                                return actions.reject();
                        });
        }

        async function createOrder(
                data: CreateOrderData,
                actions: CreateOrderActions
        ): Promise<string> {
                const purchase_units: PurchaseUnit[] = [
                        {
                                amount: {
                                        breakdown: {
                                                item_total: {
                                                        currency_code: 'EUR',
                                                        value: $currentOrder.retail_costs.subtotal.toFixed(
                                                                2
                                                        )
                                                },
                                                shipping: {
                                                        currency_code: 'EUR',
                                                        value: $currentOrder.retail_costs.shipping.toFixed(
                                                                2
                                                        )
                                                },
                                                tax_total: {
                                                        currency_code: 'EUR',
                                                        value: $currentOrder.retail_costs.tax.toFixed(
                                                                2
                                                        )
                                                }
                                        },
                                        currency_code: 'EUR',
                                        value: (
                                                $currentOrder.retail_costs.subtotal +
                                                $currentOrder.retail_costs.tax +
                                                $currentOrder.retail_costs.shipping
                                        ).toFixed(2)
                                },
                                custom_id: $currentOrder.external_id,
                                items: $currentOrder.items.map((item: Item) => {
                                        let purchaseItem = {
                                                name: item.name,
                                                quantity: item.quantity.toString(),
                                                unit_amount: {
                                                        currency_code: 'EUR',
                                                        value: item.retail_price
                                                }
                                        };
                                        return purchaseItem;
                                })
                        }
                ];

                const res = await api.url('/checkout').post($currentOrder).res();

                const json = await res.json();

                orderId = json.result.id;
                return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units,
                        application_context: {
                                shipping_preference: 'NO_SHIPPING'
                        }
                });
        }

        async function onApprove(data: OnApproveData, actions: OnApproveActions) {
                actions.order?.capture().then(async () => {
                        try {
                                const res = api
                                        .url('/checkout/confirm')
                                        .post({
                                                printful_order_id: orderId,
                                                paypal_order_id: data.orderID
                                        })
                                        .res();

                                const json = await (await res).json();

                                localStorage.setItem(
                                        `order.${$currentOrder.external_id}`,
                                        JSON.stringify($currentOrder)
                                );

                                currentOrder.clearItems();

                                window.location.href = `/store/order/${$currentOrder.external_id}`;
                        } catch (error) {
                                console.error('Could not confirm order. ', error);
                                window.alert(
                                        'Something went wrong while confirming your order, please contact us at nuphory@gmail.com.\n\nView the console for more details.'
                                );
                        }
                });
        }

        async function onCancel(data?: Record<string, unknown>, actions?: OnCancelledActions) {
                if (!orderId) return;
                try {
                        const res = api
                                .url('/checkout/cancel')
                                .json({ printful_order_id: orderId })
                                .delete()
                                .res();

                        const json = await (await res).json();

                        localStorage.setItem(
                                `order.${$currentOrder.external_id}`,
                                JSON.stringify({ ...$currentOrder, status: 'cancelled' })
                        );
                        currentOrder.createId();
                        window.alert('Order cancelled, returned to checkout.');
                } catch (err) {
                        console.error('Could not cancel order. ', err);
                        window.alert(
                                'Something went wrong while cancelling your order, please contact us at nuphory@gmail.com.\n\nView the console for more details.'
                        );
                }
        }

        async function onError(error: Record<string, unknown>) {
                if (!orderId) return;

                try {
                        const res = api
                                .url('/checkout/cancel')
                                .json({ printful_order_id: orderId })
                                .delete()
                                .res();

                        const json = await (await res).json();

                        localStorage.setItem(
                                `order.${$currentOrder.external_id}`,
                                JSON.stringify({ ...$currentOrder, status: 'failed', error })
                        );
                        currentOrder.createId();
                        window.alert(
                                `Order failed, returned to checkout.\n\n Check the console for more info.`
                        );
                        console.error(error);
                } catch (err) {
                        console.error('Could not cancel order. ', err);
                        window.alert(
                                'Something went wrong while cancelling your order, please contact us at nuphory@gmail.com.\n\nView the console for more details.'
                        );
                }
        }

        onMount(() => {
                // console.debug('checkout page mounted, subscribing to recipient changes');

                let lastRecipient: Recipient = _.cloneDeep(defaultOrder.recipient);

                let estimateAbortController: AbortController | null = null;
                let estimateWretch: Wretch;

                currentOrder.subscribe((order) => {
                        if (_.isEqual(lastRecipient, order.recipient)) return;
                        estimateAbortController?.abort(
                                'recipient changed, aborting previous request'
                        );
                        lastRecipient = _.cloneDeep(order.recipient);

                        shipping_available = false;

                        // console.debug('recipient changed', order.recipient);

                        if (!currentOrder.isRecipientValid()) return;

                        const errElement = document.querySelector(
                                '#recipient-error'
                        ) as HTMLParagraphElement;

                        // console.debug('fetching shipping costs', order.recipient);

                        api.url('/orders/estimate-costs')
                                .post(order)
                                .json((json) => {
                                        shipping_available = true;
                                        errElement.innerHTML = '';
                                        errElement.classList.add('hidden');
                                        currentOrder.setRetailCosts({
                                                shipping: json.result.costs.shipping,
                                                tax: json.result.costs.tax
                                        });
                                        lastRecipient = _.cloneDeep(order.recipient);
                                })
                                .catch((err) => {
                                        if (!browser) return;
                                        errElement.innerHTML =
                                                JSON.parse(err.message).details.result ?? '';
                                        errElement.classList.remove('hidden');
                                        console.error(JSON.parse(err.message));
                                });
                });
        });
</script>

<svelte:head>
        <title>checkout — {site.name}</title>
        <meta name="title" content="checkout — {site.name}" />

        <link rel="canonical" href="https://{site.name}.com/cart/checkout" />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="checkout — {site.name}" />
        <meta property="og:image" content="https://{site.name}.com/assets/logo/png/summary.png" />
        <meta property="og:url" content="https://{site.name}.com/cart/checkout" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="checkout — {site.name}" />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content="https://{site.name}.com/assets/logo/png/summary.png" />
</svelte:head>

<section id="page-title">
        <h1 class="tracking-[0.125em]">checkout</h1>
</section>
<div role="separator" />

<div
        id="checkout-content"
        class="relative flex-1 flex flex-col justify-center items-center lg:flex-row lg:items-start"
>
        <section id="cart-list" class="flex flex-col justify-center items-center lg:order-2">
                <SimpleCartList order={$currentOrder} />
                <a
                        href="/cart"
                        class=" 
                                transition-quick duration-[var(--duration)] ease-out
                                h-12 w-full max-w-xs
                                py-2 px-4 m-4
                                rounded-full
                                
                                bg-primary text-secondary
                                font-yeysk
                        "
                >
                        back to cart
                </a>
        </section>
        <div role="separator" class="lg:hidden" />
        <section id="checkout-form" class="max-w-2xl lg:order-1">
                <CheckoutForm />
        </section>
</div>
<div role="separator" />
<section id="complete-order" class="flex justify-center">
        <div
                id="paypal-button-container"
                class="
                        transition-quick duration-[var(--duration)] ease-out
                        w-full max-w-xs m-4 p-8 pb-4 
                        rounded-3xl
                        ring-primary ring-3
                        bg-[white]
                "
        />
</section>

<!-- <div id="top" class="relative flex flex-1 flex-col justify-center items-center min-h-screen py-8">
        <section id="page-title" class="pointer-events-none">
                <h1 class="tracking-[0.125em]">checkout</h1>
        </section>
        <div class="content  flex flex-col flex-1 justify-center items-start lg:flex-row">
                <section
                        id="cart-list"
                        class=" my-0 w-80 relative flex flex-col justify-center items-center lg:order-2"
                >
                        <SimpleCartList order={$currentOrder} />
                        <section id="back-to-cart" class="mb-0 flex justify-center items-center ">
                                <a
                                        id="checkout-button"
                                        class="w-80 badge py-1 px-4 clr-bg clr-text clr-inverse !rounded-full font-mono"
                                        href="/cart"><b>back to cart</b></a
                                >
                        </section>
                </section>
                <section id="checkout-form" class="max-w-2xl lg:order-1">
                        <CheckoutForm />
                </section>
        </div>
        <section id="#complete-order">
                <div id="paypal-button-container" class="" />
        </section>
</div> -->
