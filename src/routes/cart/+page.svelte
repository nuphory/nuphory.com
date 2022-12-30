<script lang="ts">
        // Imports
        import { browser } from '$app/environment';
        import currentOrder from '$lib/api/stores/order';
        // Types
        import type { Item } from '$lib/types/product';
        
        // Components
        import CartList from '$lib/components/store/cart/CartList.svelte';

        let items: Item[] = $currentOrder.items;

        currentOrder.subscribe((order) => {
                items = order.items;
        });
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
        {#if items.length > 0}
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
