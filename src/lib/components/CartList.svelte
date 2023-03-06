<script lang="ts">
        import currentOrder from '$lib/api/stores/order';
        import type { Item } from '$lib/types/product';
        import CartListItem from './CartListItem.svelte';

        let items: Item[] = $currentOrder.items;

        currentOrder.subscribe((order) => {
                items = order.items;
        });
</script>

<ul id="cart" class="flex flex-col justify-center items-center rounded-">
        {#if items.length === 0}
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
        {#each items as item}
                <CartListItem {item} />
        {/each}
</ul>
