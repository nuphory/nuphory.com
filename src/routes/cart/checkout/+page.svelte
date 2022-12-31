<script lang="ts">
        // Imports
        import { _siteDescription, _siteName } from '$routes/+layout';
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

        // Types
        import type { Recipient } from '$lib/types/recipient';
        import type { Item } from '$lib/types/product';

        // Components
        import CheckoutForm from '$lib/components/store/cart/checkout/CheckoutForm.svelte';
        import SimpleCartList from '$lib/components/store/cart/checkout/SimpleCartList.svelte';
        import { onMount } from 'svelte';

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

                // fetch cost estimate
                const estimateResponse = await fetch('/api/orders/estimate-costs', {
                        body: JSON.stringify($currentOrder),
                        method: 'POST'
                });
                const estimateJson = await estimateResponse.json();

                if (estimateJson.code != 200) return;

                // console.debug(estimateJson.result);

                currentOrder.setRetailCosts({
                        shipping: estimateJson.result.costs.shipping,
                        tax: estimateJson.result.costs.tax
                });
                return actions.resolve();
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

                let checkoutResponse = await fetch('/api/checkout', {
                        method: 'POST',
                        body: JSON.stringify($currentOrder)
                });
                let checkoutJson = await checkoutResponse.json();
                orderId = checkoutJson.result.id;

                return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units,
                        application_context: {
                                shipping_preference: 'NO_SHIPPING'
                        }
                });
        }

        async function onApprove(data: OnApproveData, actions: OnApproveActions) {
                return actions.order?.capture().then(async () => {
                        try {
                                await fetch(`/api/checkout/confirm`, {
                                        method: 'POST',
                                        body: JSON.stringify({
                                                printful_order_id: orderId,
                                                paypal_order_id: data.orderID
                                        })
                                });

                                localStorage.setItem(
                                        `order.${$currentOrder.external_id}`,
                                        JSON.stringify($currentOrder)
                                );

                                currentOrder.clearItems();

                                window.location.href = `/cart/checkout/confirmation/${orderId}`;
                        } catch (e) {
                                window.alert(
                                        `Something went wrong while confirming your order, please contact us at nuphory@gmail.com.\n\n${e}`
                                );
                        }
                });
        }

        async function onCancel(data?: Record<string, unknown>, actions?: OnCancelledActions) {
                if (!orderId) return;
                await fetch(`/api/checkout/cancel`, {
                        method: 'DELETE',
                        body: JSON.stringify($currentOrder)
                });
        }

        async function onError(error: Record<string, unknown>) {
                if (orderId) {
                        await fetch(`/api/checkout/${orderId}/cancel`, {
                                method: 'DELETE'
                        });
                }
                console.error(error);
        }

        onMount(() => {
                // console.debug('checkout page mounted, subscribing to recipient changes');

                let lastRecipient: Recipient = _.cloneDeep(defaultOrder.recipient);

                currentOrder.subscribe((order) => {
                        if (_.isEqual(lastRecipient, order.recipient)) return;
                        lastRecipient = _.cloneDeep(order.recipient);

                        shipping_available = false;

                        // console.debug('recipient changed', order.recipient);

                        if (!currentOrder.isRecipientValid()) return;

                        const errElement = document.querySelector(
                                '#recipient-error'
                        ) as HTMLParagraphElement;

                        // console.debug('fetching shipping costs', order.recipient);

                        fetch('/api/orders/estimate-costs', {
                                body: JSON.stringify(order),
                                method: 'POST'
                        })
                                .then((response) => response.json())
                                .then((data) => {
                                        // console.debug('estimateJson', data);
                                        if (data.code != 200) {
                                                // console.debug(data);
                                                if (!browser) return;
                                                errElement.innerHTML = data.result;
                                                errElement.classList.remove('hidden');
                                                return;
                                        }
                                        shipping_available = true;
                                        errElement.innerHTML = '';
                                        errElement.classList.add('hidden');

                                        currentOrder.setRetailCosts({
                                                shipping: data.result.costs.shipping,
                                                tax: data.result.costs.tax
                                        });
                                        lastRecipient = _.cloneDeep(order.recipient);
                                });
                });
        });
</script>

<svelte:head>
        <title>checkout — {_siteName}</title>
        <meta name="title" content="checkout — {_siteName}" />

        <link rel="canonical" href="https://{_siteName}.com/cart/checkout" />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="checkout — {_siteName}" />
        <meta property="og:image" content="https://{_siteName}.com/assets/logo/png/summary.png" />
        <meta property="og:url" content="https://{_siteName}.com/cart/checkout" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="checkout — {_siteName}" />
        <meta name="twitter:description" content={_siteDescription} />
        <meta name="twitter:image" content="https://{_siteName}.com/assets/logo/png/summary.png" />
</svelte:head>

<div id="top" class="relative flex flex-1 flex-col justify-center items-center min-h-screen py-8">
        <section id="page-title" class="pointer-events-none">
                <h1 class="tracking-[0.125em]">checkout</h1>
        </section>
        <div class="content  flex flex-col flex-1 justify-center items-start lg:flex-row">
                <section
                        id="cart-list"
                        class=" my-0 w-80 relative flex flex-col justify-center items-center lg:order-2"
                >
                        <SimpleCartList />
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
</div>
