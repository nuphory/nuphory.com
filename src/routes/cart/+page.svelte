<script lang="ts">
        import CartList from '$lib/components/store/cart/CartList.svelte';

        // TODO cart page
        // - shows items in cart and allows for editing
        // - shows subtotal
        // - shows shipping cost estimation (printful api)
        // - shows total
        // - shows checkout button
</script>

<div id="top" class="relative flex flex-1 flex-col justify-between items-center min-h-screen py-8">
        <section id="page-title" class="sticky top-0 z-40"><h1>cart</h1></section>
        <section id="cart-list" class="relative grow flex flex-col justify-center items-center">
                <CartList />
        </section>
        <section id="checkout" class="flex justify-center items-center">
                <a
                        id="checkout-button"
                        class="w-80 badge py-1 px-4 clr-bg clr-text clr-inverse !rounded-full font-mono"
                        href="/cart/checkout"><b>checkout</b></a
                >
        </section>
        <section id="back-to-home" class="mb-0 flex justify-center items-center ">
                <a
                        id="checkout-button"
                        class="w-80 badge py-1 px-4 clr-bg clr-text clr-inverse !rounded-full font-mono"
                        href="/"><b>back to home</b></a
                >
        </section>
</div>
