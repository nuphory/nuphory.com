<script lang="ts">
        import currentOrder from '$lib/api/stores/order';
        import type { Item } from '$lib/types/product';
        import SimpleCartListItem from './SimpleCartListItem.svelte';

        let items: Item[] = $currentOrder.items;

        currentOrder.subscribe((order) => {
                items = order.items;
        });
</script>

<ul
        id="cart"
        class=" m-4 mb-0 w-80 flex flex-col justify-center items-center rounded-[2em] border-[3px]"
>
        {#each items as item}
                <SimpleCartListItem item={item} />
        {/each}
        <li
                class="w-full  flex flex-row basis-1 justify-between items-start px-4 m-4 gap-4 xs:items-start last:border-[0px] border-b clr-border"
        >
                <div class="flex flex-col w-full">
                        <div
                                class="flex flex-row flex-1 grow basis-1 justify-between items-start border-b clr-border"
                        >
                                <p class="">Subtotal</p>
                                <!-- <p class="">—</p> -->
                                <p class="text-right sm:w-auto">
                                        {$currentOrder.retail_costs.subtotal}
                                        {$currentOrder.retail_costs.currency}
                                </p>
                        </div>
                        <div
                                class="flex flex-row flex-1 grow basis-1 justify-between items-start border-b clr-border"
                        >
                                <p class="">VAT (19%)</p>
                                <!-- <p class="">—</p> -->
                                <p class="text-right sm:w-auto">
                                        {$currentOrder.retail_costs.tax}
                                        {$currentOrder.retail_costs.currency}
                                </p>
                        </div>
                        <div
                                class="flex flex-row flex-1 grow basis-1 justify-between items-start border-b clr-border"
                        >
                                <p class="">Shipping</p>
                                <!-- <p class="">—</p> -->
                                <p class="text-right sm:w-auto">
                                        {$currentOrder.retail_costs.shipping}
                                        {$currentOrder.retail_costs.currency}
                                </p>
                        </div>
                        <div class="flex flex-row flex-1 grow basis-1 justify-between items-start">
                                <p class="">Total</p>
                                <!-- <p class="">—</p> -->
                                <p class="text-right sm:w-auto">
                                        {(
                                                parseFloat($currentOrder.retail_costs.subtotal) +
                                                parseFloat($currentOrder.retail_costs.shipping) +
                                                parseFloat($currentOrder.retail_costs.tax)
                                        ).toFixed(2)}
                                        {$currentOrder.retail_costs.currency}
                                </p>
                        </div>
                </div>
        </li>
</ul>
