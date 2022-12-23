<script lang="ts">
        import CheckoutForm from '$lib/components/store/cart/checkout/CheckoutForm.svelte';
        import SimpleCartList from '$lib/components/store/cart/checkout/SimpleCartList.svelte';

        import { loadScript } from '@paypal/paypal-js';

        // TODO paypal button

        // TODO placing orders on printful
        // - https://www.printful.com/docs/orders

        // TODO order confirmation page
        // - shows order details
        // - shows shipping details
        // - shows payment details
        // - shows order status
</script>

<div id="top" class="relative flex flex-1 flex-col justify-center items-center min-h-screen py-8">
        <section id="page-title" class="sticky top-0 z-10 pointer-events-none">
                <h1 class="tracking-[0.125em]">checkout</h1>
        </section>
        <div class="content flex flex-col flex-1 justify-center items-start lg:flex-row">
                <section
                        id="cart-list"
                        class="w-80 relative flex flex-col justify-center items-center lg:order-2"
                >
                        <SimpleCartList />
                </section>
                <section id="checkout-form" class="max-w-2xl lg:order-1">
                        <CheckoutForm />
                </section>
        </div>
</div>
