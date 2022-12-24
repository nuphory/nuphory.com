<script lang="ts">
        import { browser } from '$app/environment';
        import type { SyncVariant } from '$lib/api/product';
        import { cart as cartStore, type CartMap } from '$lib/api/stores/cart';
        import orderStore from '$lib/api/stores/order';
        import recipientStore, { type Recipient } from '$lib/api/stores/recipient';

        import SimpleCartListItem from './SimpleCartListItem.svelte';

        let subtotal = parseFloat($orderStore.retail_costs.subtotal);
        let shipping = parseFloat($orderStore.retail_costs.shipping);
        let tax = parseFloat($orderStore.retail_costs.tax);
        let currency = $orderStore.retail_costs.currency;

        let total = subtotal + shipping + tax;

        let cartItems = $orderStore.items.map((item) => {
                return {
                        variant: item,
                        quantity: item.quantity
                };
        });
        
</script>

<ul
        id="cart"
        class=" m-4 mb-0 w-80 flex flex-col justify-center items-center rounded-[2em] border-[3px]"
>
        {#each cartItems as item}
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
                                        {subtotal.toFixed(2)}
                                        {currency}
                                </p>
                        </div>
                        <div
                                class="flex flex-row flex-1 grow basis-1 justify-between items-start border-b clr-border"
                        >
                                <p class="">VAT (19%)</p>
                                <!-- <p class="">—</p> -->
                                <p class="text-right sm:w-auto">
                                        {tax.toFixed(2)}
                                        {currency}
                                </p>
                        </div>
                        <div
                                class="flex flex-row flex-1 grow basis-1 justify-between items-start border-b clr-border"
                        >
                                <p class="">Shipping</p>
                                <!-- <p class="">—</p> -->
                                <p class="text-right sm:w-auto">
                                        {shipping.toFixed(2)}
                                        {currency}
                                </p>
                        </div>
                        <div class="flex flex-row flex-1 grow basis-1 justify-between items-start">
                                <p class="">Total</p>
                                <!-- <p class="">—</p> -->
                                <p class="text-right sm:w-auto">
                                        {total.toFixed(2)}
                                        {currency}
                                </p>
                        </div>
                </div>
        </li>
</ul>

