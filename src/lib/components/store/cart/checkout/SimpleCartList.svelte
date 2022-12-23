<script lang="ts">
        import { browser } from '$app/environment';
        import { cart, type CartItem } from '$lib/api/stores/cart';
        import SimpleCartListItem from './SimpleCartListItem.svelte';

        let cartItems: [number, CartItem][] = [];

        if (browser) {
                cart.subscribe((cart) => {
                        cartItems = Array.from(cart);
                });
        }
</script>

<ul
        id="cart"
        class=" max-w-xs flex flex-col justify-center items-center rounded-[2em] border-[3px]"
>
        {#each cartItems as item}
                <SimpleCartListItem item={item[1]} />
        {/each}
        <li
                class="w-full  flex flex-row basis-1 justify-between items-start px-4 m-4 gap-4 xs:items-start last:border-[0px] border-b clr-border"
        >
                
                <div class="flex flex-row flex-1 grow basis-1 justify-between items-start">
                        <p class="">Total</p>
                        <p class="">—</p>
                        <p class="text-right sm:w-auto">
                                {cartItems
                                        .reduce((acc, item) => {
                                                return (
                                                        acc +
                                                        parseInt(item[1].variant.retail_price) *
                                                                item[1].quantity
                                                );
                                        }, 0)
                                        .toFixed(2)}
                                {cartItems[0]?.[1].variant.currency}
                        </p>
                </div>
        </li>
</ul>
