<script lang="ts">
        // Imports
        import {
                loadScript,
                type CreateOrderActions,
                type CreateOrderData,
                type OnApproveActions,
                type OnApproveData,
                type OnCancelledActions,
                type OnInitActions,
                type Payer,
                type PayPalNamespace,
                type PurchaseUnit
        } from '@paypal/paypal-js';
        import { PUBLIC_PAYPAL_CLIENT_ID } from '$env/static/public';

        import currentOrder from '$lib/api/stores/order';

        // Components
        import CheckoutForm from '$lib/components/store/cart/checkout/CheckoutForm.svelte';
        import SimpleCartList from '$lib/components/store/cart/checkout/SimpleCartList.svelte';
        import type { Item } from '$lib/types/product';

        let orderId: string;

        loadScript({ 'client-id': PUBLIC_PAYPAL_CLIENT_ID, currency: 'EUR' })
                .then(createButton)
                .catch((error) => console.error('failed to load the PayPal JS SDK script', error));

        async function createButton(paypal: PayPalNamespace | null) {
                if (!paypal) return;

                console.debug('loaded the PayPal JS SDK script: ', paypal);

                paypal.Buttons({
                        style: {
                                layout: 'vertical',
                                tagline: false,
                                color: 'blue',

                                shape: 'pill',

                                label: 'paypal'
                        },
                        onInit,
                        createOrder,
                        onApprove,
                        onCancel,
                        onError
                });
        }

        async function onInit(data: Record<string, unknown>, actions: OnInitActions) {
                // TODO validate recipient form
                // currentOrder.subscribe((order) => {
                //         Object.values(order.recipient).every
                // })
                // actions.disable();
        }

        async function createOrder(
                data: CreateOrderData,
                actions: CreateOrderActions
        ): Promise<string> {
                let shippingResponse = await fetch('/api/shipping', {
                        method: 'POST',
                        body: JSON.stringify({
                                items: $currentOrder.items,
                                recipient: $currentOrder.recipient,
                                currency: $currentOrder.retail_costs.currency
                        })
                });
                let shippingJson = await shippingResponse.json();

                currentOrder.setRetailCosts({ shipping: shippingJson.result[0].rate });
                currentOrder.createId();

                // let checkoutResponse = await fetch('/api/checkout', {
                //         method: 'POST',
                //         body: JSON.stringify($currentOrder)
                // });
                // let checkoutJson = await checkoutResponse.json();

                // orderId = checkoutJson.result.id;

                const purchase_units: PurchaseUnit[] = [
                        {
                                amount: {
                                        breakdown: {
                                                item_total: {
                                                        currency_code: 'EUR',
                                                        value: $currentOrder.retail_costs.subtotal
                                                },
                                                shipping: {
                                                        currency_code: 'EUR',
                                                        value: $currentOrder.retail_costs.shipping
                                                },
                                                tax_total: {
                                                        currency_code: 'EUR',
                                                        value: $currentOrder.retail_costs.tax
                                                }
                                        },
                                        currency_code: 'EUR',
                                        value: (
                                                parseFloat($currentOrder.retail_costs.subtotal) +
                                                parseFloat($currentOrder.retail_costs.tax) +
                                                parseFloat($currentOrder.retail_costs.shipping)
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
                                                },
                                        };
                                        return purchaseItem;
                                }),
                        }
                ];

                const payer: Payer = {
                        // TODO payer info
                }

                return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units,
                        payer
                });
        }

        async function onApprove(data: OnApproveData, actions: OnApproveActions) {
                return actions.order?.capture().then(async () => {
                        await fetch(`api/checkout/${orderId}/confirm`, {
                                method: 'POST'
                        });

                        localStorage.setItem(
                                $currentOrder.external_id,
                                JSON.stringify($currentOrder)
                        );

                        currentOrder.clearItems();

                        window.location.href = `/cart/checkout/confirmation/${orderId}`;
                });
        }

        async function onCancel(data?: Record<string, unknown>, actions?: OnCancelledActions) {
                if (!orderId) return;
                await fetch(`api/checkout/${orderId}/cancel`, {
                        method: 'DELETE'
                });
        }

        async function onError(error: Record<string, unknown>) {
                if (orderId) {
                        await fetch(`api/checkout/${orderId}/cancel`, {
                                method: 'DELETE'
                        });
                }
                console.error(error);
        }

        // loadScript({ 'client-id': PUBLIC_PAYPAL_CLIENT_ID, currency: 'EUR' })
        //         .then((paypal) => {
        //                 console.debug('loaded the PayPal JS SDK script', paypal);
        //                 if (!paypal) return;

        //                 let orderId: string;

        //                 paypal.Buttons({
        //                         style: {
        //                                 layout: 'vertical',
        //                                 tagline: false,
        //                                 color: 'blue',

        //                                 shape: 'pill',

        //                                 label: 'paypal'
        //                         },
        //                         createOrder: async (data, actions) => {
        //                                 let checkoutResponse = await fetch('/api/checkout', {
        //                                         method: 'POST',
        //                                         body: JSON.stringify($order)
        //                                 });

        //                                 let checkoutData = await checkoutResponse.json();

        //                                 orderId = checkoutData.result.id;

        //                                 return actions.order.create({
        //                                         intent: 'CAPTURE',
        //                                         purchase_units: [
        //                                                 {
        //                                                         amount: {
        //                                                                 currency_code: 'EUR',
        //                                                                 value: (
        //                                                                         parseFloat(
        //                                                                                 $order
        //                                                                                         .retail_costs
        //                                                                                         .subtotal
        //                                                                         ) +
        //                                                                         parseFloat(
        //                                                                                 $order
        //                                                                                         .retail_costs
        //                                                                                         .tax
        //                                                                         ) +
        //                                                                         parseFloat(
        //                                                                                 $order
        //                                                                                         .retail_costs
        //                                                                                         .shipping
        //                                                                         )
        //                                                                 ).toFixed(2)
        //                                                         }
        //                                                 }
        //                                         ]
        //                                 });
        //                         },
        //                         onApprove: async (data, actions) => {
        //                                 return actions.order?.capture().then(async () => {
        //                                         await fetch(`/api/checkout/${orderId}/confirm`, {
        //                                                 method: 'DELETE'
        //                                         });

        //                                         $storedOrder = $order;
        //                                         cart.clear();

        //                                         window.location.href = `/cart/checkout/confirmation/${orderId}`;
        //                                 });
        //                         },
        //                         onCancel: async (data) => {
        //                                 await fetch(`/api/checkout/${orderId}/cancel`, {
        //                                         method: 'DELETE'
        //                                 });
        //                         }
        //                 }).render('#paypal-button-container');
        //         })
        //         .catch((error) => {});
</script>

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
                <div id="paypal-button-container" />
        </section>
</div>
