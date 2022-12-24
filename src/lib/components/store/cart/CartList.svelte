<script lang="ts">
        import { browser } from '$app/environment';
        import { cart as cartStore, type CartItem } from '$lib/api/stores/cart';
        import CartListItem from './CartListItem.svelte';

        let cartItems: [number, CartItem][] = [];

        if (browser) {
                cartStore.subscribe((cart) => {
                        cartItems = Array.from(cart);
                });
        }
</script>

<ul id="cart" class="flex flex-col justify-center items-center rounded-">
        {#if cartItems.length === 0}
                <li class="text-center text-gray-500">
                        <p>Nothing to see here...</p>
                        <br />
                        <p>
                                Why don't you join our <a
                                        class="hover:text-indigo-600"
                                        href="https://discord.gg/673AfPB">discord</a
                                >?
                        </p>
                </li>
        {/if}
        {#each cartItems as item}
                <CartListItem item={item[1]} />
        {/each}
</ul>
