<script lang="ts">
        import CheckoutForm from '$lib/components/store/cart/checkout/CheckoutForm.svelte';
        import SimpleCartList from '$lib/components/store/cart/checkout/SimpleCartList.svelte';

        // TODO cart page
        // - shows simplified Cart list
        // - shows subtotal
        // - shows shipping cost estimation (printful api)
        // - shows total

        // TODO checkout form
        // - name
        // - email
        // - address
        // - country
        // - state
        // - zip
        // - phone
        // - shipping method
        // - payment method
        // - submit button
        // - cancel button

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
        <section id="cart-list" class=" w-80 relative flex flex-col justify-center items-center">
                <SimpleCartList />
        </section>

        <section id="back-to-cart" class="mt-0 flex justify-center items-center">
                <a
                        id="checkout-button"
                        class="w-80 badge py-1 px-4 clr-bg clr-text clr-inverse !rounded-full font-mono"
                        href="/cart"><b>back to cart</b></a
                >
        </section>

        <section id="checkout-form">
                <CheckoutForm />
        </section>
</div>
