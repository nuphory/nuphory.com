<script lang="ts">
        import currentOrder from '$lib/api/stores/order';
        import type { Item } from '$lib/types/product';

        export let item: Item;
</script>

<li
        class="
                transition-colors duration-[var(--duration)] ease-out
                flex flex-row justify-between items-start flex-1 xs:items-start 
                m-4 gap-4 last:border-[0px] 
                border-b border-primary"
>
        <img
                src={item.files[1].preview_url}
                alt={item.name}
                class="aspect-square w-full max-w-[4em] rounded-2xl ring-primary ring-offset-1"
        />

        <div class="flex flex-1 flex-col justify-between gap-4">
                <p class="border-b border-primary">{item.name}</p>
                <div class="flex-1 flex flex-col justify-between items-start overflow-auto">
                        <div class="w-full flex flex-col overflow-auto">
                                <div class="flex flex-col justify-between items-start">
                                        <div class="flex flex-row justify-between w-full">
                                                <p class="text-left w-full">
                                                        {item.id}
                                                </p>
                                                <p class="text-right w-full">
                                                        {item.quantity}x
                                                </p>
                                        </div>
                                        <!-- <p class="">—</p> -->
                                        <p class="text-right w-full">
                                                {item.retail_price}
                                                {item.currency}
                                        </p>
                                </div>
                        </div>
                        <div
                                class="w-full flex flex-row justify-between items-start border-t border-primary"
                        >
                                <p>Subtotal</p>
                                <p class="text-right w-full">
                                        {(parseInt(item.retail_price) * item.quantity).toFixed(2)}
                                        {item.currency}
                                </p>
                        </div>
                </div>
        </div>
</li>
