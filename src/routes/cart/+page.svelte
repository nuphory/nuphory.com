<script lang="ts">
        import { cart as cartStore, type CartMap } from '$lib/api/stores/cart';
        import CartList from '$lib/components/store/cart/CartList.svelte';
        import { order } from '$lib/api/stores/order';
        import { browser } from '$app/environment';

        let cart: CartMap;

        cartStore.subscribe((value) => {
                $order.items = Array.from(value).map((cartItem) => {
                        const variant = cartItem[1].variant;
                        variant.quantity = cartItem[1].quantity;
                        return variant;
                });
                $order.retail_costs.subtotal = Array.from(value)
                        .reduce((acc, cartItem) => {
                                return (
                                        acc +
                                        parseFloat(cartItem[1].variant.retail_price) *
                                                cartItem[1].quantity
                                );
                        }, 0)
                        .toFixed(2);
                $order.retail_costs.tax = (parseFloat($order.retail_costs.subtotal) * 0.19).toFixed(
                        2
                );
        });

        // TODO cart page
        // - shows items in cart and allows for editing
        // - shows subtotal
        // - shows shipping cost estimation (printful api)
        // - shows total
        // - shows checkout button
</script>

<div id="top" class="relative flex flex-1 flex-col justify-between items-center min-h-screen py-8">
        <section class="">
                <div id="page-title" class=""><h1>cart</h1></div>
        </section>
        <section
                id="cart-list"
                class="grow relative grow flex flex-col justify-center items-center"
        >
                <CartList />
        </section>
        {#if $cartStore.size > 0}
                <section id="checkout" class="flex justify-center items-center">
                        <a
                                id="checkout-button"
                                class="w-80 badge py-1 px-4 clr-bg clr-text clr-inverse !rounded-full font-mono"
                                href="/cart/checkout"><b>checkout</b></a
                        >
                </section>
        {:else}
                <section id="checkout" class="flex justify-center items-center">
                        <a
                                id="checkout-button"
                                class="w-80 badge py-1 px-4 clr-bg clr-text clr-inverse !rounded-full font-mono disabled"
                                href="/cart/checkout"><b>checkout</b></a
                        >
                </section>
        {/if}

        <section id="back-to-home" class="mb-0 flex justify-center items-center ">
                <a
                        id="checkout-button"
                        class="w-80 badge py-1 px-4 clr-bg clr-text clr-inverse !rounded-full font-mono"
                        href="/"><b>back to home</b></a
                >
        </section>
</div>

<style>
        .disabled {
                pointer-events: none;
                opacity: 0.5;
        }
</style>
