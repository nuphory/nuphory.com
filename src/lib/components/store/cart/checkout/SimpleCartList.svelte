<script lang="ts">
        import currentOrder from '$lib/api/stores/order';
        import type { Item } from '$lib/types/product';
        import type { Order } from '$src/lib/types/order';
        import defaultOrder from '$src/lib/types/order';
        import _ from 'lodash';
        import SimpleCartListItem from './SimpleCartListItem.svelte';

        export let order: Order;

        if (!order) {
                currentOrder.subscribe((liveOrder) => {
                        order = liveOrder;
                });
        }
</script>

<ul
        id="cart"
        class=" m-4 mb-0 w-80 flex flex-col justify-center items-center rounded-[2em] border-[3px]"
>
        {#each order.items as item}
                <SimpleCartListItem {item} />
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
                                        {order.retail_costs.subtotal.toFixed(2)}
                                        {order.retail_costs.currency}
                                </p>
                        </div>

                        <div
                                class="flex flex-row flex-1 grow basis-1 justify-between items-start border-b clr-border"
                        >
                                <p class="">Shipping</p>
                                <!-- <p class="">—</p> -->
                                <p class="text-right sm:w-auto">
                                        {order.retail_costs.shipping.toFixed(2)}
                                        {order.retail_costs.currency}
                                </p>
                        </div>
                        {#if order.retail_costs.tax > 0}
                                <div
                                        class="flex flex-row flex-1 grow basis-1 justify-between items-start border-b clr-border"
                                >
                                        <p class="">TAX</p>
                                        <!-- <p class="">—</p> -->
                                        <p class="text-right sm:w-auto">
                                                {order.retail_costs.tax.toFixed(2)}
                                                {order.retail_costs.currency}
                                        </p>
                                </div>
                        {/if}
                        <div class="flex flex-row flex-1 grow basis-1 justify-between items-start">
                                <p class="">Total</p>
                                <!-- <p class="">—</p> -->
                                <p class="text-right sm:w-auto">
                                        {(
                                                order.retail_costs.subtotal +
                                                order.retail_costs.shipping +
                                                order.retail_costs.tax
                                        ).toFixed(2)}
                                        {order.retail_costs.currency}
                                </p>
                        </div>
                </div>
        </li>
</ul>
