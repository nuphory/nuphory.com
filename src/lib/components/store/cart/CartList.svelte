<script lang="ts">
        import { browser } from '$app/environment';
        import { cart, type CartItem } from '$lib/api/stores/cart';
        import CartListItem from './CartListItem.svelte';

        let cartItems: [number, CartItem][] = [];

        if (browser) {
                cart.subscribe((cart) => {
                        cartItems = Array.from(cart);
                });
        }
</script>

<ul id="cart" class="flex flex-col justify-center items-center rounded-">
        {#each cartItems as item}
                <CartListItem item={item[1]} />
       {/each}
</ul>
