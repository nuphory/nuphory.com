<script lang="ts">
        import CheckoutForm from '$lib/components/store/cart/checkout/CheckoutForm.svelte';
        import SimpleCartList from '$lib/components/store/cart/checkout/SimpleCartList.svelte';

        import { cart } from '$lib/api/stores/cart';
        import { loadScript } from '@paypal/paypal-js';
        import { PUBLIC_PAYPAL_CLIENT_ID } from '$env/static/public';
        import { storedOrder, order } from '$lib/api/stores/order';

        // /** @type {import('./$types').PageData} */ export let data;

        loadScript({ 'client-id': PUBLIC_PAYPAL_CLIENT_ID, currency: 'EUR' })
                .then((paypal) => {
                        console.debug('loaded the PayPal JS SDK script', paypal);
                        if (!paypal) return;

                        let orderId: string;

                        paypal.Buttons({
                                style: {
                                        layout: 'vertical',
                                        tagline: false,
                                        color: 'blue',

                                        shape: 'pill',

                                        label: 'paypal'
                                },
                                createOrder: async (data, actions) => {
                                        let shippingResponse = await fetch('/api/shipping', {
                                                body: JSON.stringify($order),
                                                method: 'POST'
                                        });
                                        let shippingData = await shippingResponse.json();

                                        $order.retail_costs.shipping = shippingData.result[0].rate;

                                        $order.external_id = (Math.random() * 2 ** 64)
                                                .toFixed(0)
                                                .toString();

                                        let checkoutResponse = await fetch('/api/checkout', {
                                                method: 'POST',
                                                body: JSON.stringify($order)
                                        });

                                        let checkoutData = await checkoutResponse.json();

                                        orderId = checkoutData.result.id;

                                        return actions.order.create({
                                                intent: 'CAPTURE',
                                                purchase_units: [
                                                        {
                                                                amount: {
                                                                        currency_code: 'EUR',
                                                                        value: (
                                                                                parseFloat(
                                                                                        $order
                                                                                                .retail_costs
                                                                                                .subtotal
                                                                                ) +
                                                                                parseFloat(
                                                                                        $order
                                                                                                .retail_costs
                                                                                                .tax
                                                                                ) +
                                                                                parseFloat(
                                                                                        $order
                                                                                                .retail_costs
                                                                                                .shipping
                                                                                )
                                                                        ).toFixed(2)
                                                                }
                                                        }
                                                ]
                                        });
                                },
                                onApprove: async (data, actions) => {
                                        return actions.order?.capture().then(async () => {
                                                await fetch(`/api/checkout/${orderId}/confirm`, {
                                                        method: 'DELETE'
                                                });

                                                $storedOrder = $order;
                                                cart.clear();

                                                window.location.href = `/cart/checkout/confirmation/${orderId}`;
                                        });
                                },
                                onCancel: async (data) => {
                                        await fetch(`/api/checkout/${orderId}/cancel`, {
                                                method: 'DELETE'
                                        });
                                }
                        }).render('#paypal-button-container');
                })
                .catch((error) => {
                        console.error('failed to load the PayPal JS SDK script', error);
                });
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
