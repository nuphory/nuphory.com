<script lang="ts">
        import CheckoutForm from '$lib/components/store/cart/checkout/CheckoutForm.svelte';
        import SimpleCartList from '$lib/components/store/cart/checkout/SimpleCartList.svelte';

        import { cart, cart as cartStore, type CartMap } from '$lib/api/stores/cart';
        import recipientStore, { type Recipient } from '$lib/api/stores/recipient';
        import { loadScript } from '@paypal/paypal-js';
        import { PUBLIC_PAYPAL_CLIENT_ID } from '$env/static/public';
        import { storedOrder, order } from '$lib/api/stores/order';

        cartStore.subscribe((value) => {
                $order.items = Array.from(value).map((cartItem) => {
                        const variant = cartItem[1].variant;
                        variant.quantity = cartItem[1].quantity;
                        return variant;
                });
                $order.retail_costs.subtotal = Array.from(value).reduce((acc, cartItem) => {
                        return acc + (parseFloat(cartItem[1].variant.retail_price) * cartItem[1].quantity);
                }, 0);
                $order.retail_costs.tax = $order.retail_costs.subtotal * 0.19;
        });

        recipientStore.subscribe(async (value) => {
                $order.recipient = value;

                if (
                        !$order.recipient.country_code ||
                        !$order.recipient.address1 ||
                        !$order.recipient.city ||
                        !$order.recipient.zip
                )
                        return;
                let response = await fetch('/api/shipping', {
                        body: JSON.stringify($order),
                        method: 'POST'
                });
                let data = await response.json();

                $order.retail_costs = {
                        currency: 'EUR',
                        shipping: data.result[0].rate,
                        discount: 0,
                        tax: $order.retail_costs.subtotal * 0.19,
                        subtotal: $order.retail_costs.subtotal
                };
        });

        loadScript({ 'client-id': PUBLIC_PAYPAL_CLIENT_ID, currency: 'EUR' })
                .then((paypal) => {
                        console.log('loaded the PayPal JS SDK script', paypal);
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
                                        $order.external_id = (Math.random() * 2 ** 64)
                                                .toFixed(0)
                                                .toString();
                                        let responseJson = await fetch('/api/checkout', {
                                                method: 'POST',
                                                body: JSON.stringify($order)
                                        });
                                        let response = await responseJson.json();
                                        orderId = response.result.id;

                                        return actions.order.create({
                                                intent: 'CAPTURE',
                                                purchase_units: [
                                                        {
                                                                amount: {
                                                                        currency_code: 'EUR',
                                                                        value: (
                                                                                parseFloat($order.retail_costs
                                                                                        .subtotal) *
                                                                                        1.19 +
                                                                                parseFloat($order.retail_costs
                                                                                        .shipping)
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
        <div class="content flex flex-col flex-1 justify-center items-start lg:flex-row">
                <section
                        id="cart-list"
                        class="w-80 relative flex flex-col justify-center items-center lg:order-2"
                >
                        <SimpleCartList
                                subtotal={$order.retail_costs.subtotal}
                                shipping={$order.retail_costs.shipping || 0}
                                currency={$order.retail_costs.currency}
                        />
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
