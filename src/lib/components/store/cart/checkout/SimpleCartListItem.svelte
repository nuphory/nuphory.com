<script lang="ts">
        import { cart, cart as cartStore, type CartItem } from '$lib/api/stores/cart';

        export let item: CartItem;
</script>

<li
        class="flex flex-row basis-1 justify-between items-start m-4 gap-4 xs:items-start last:border-[0px] border-b clr-border"
>
        <img
                src={item.variant.files[1].preview_url}
                class="aspect-square w-full max-w-[4em] rounded-2xl border-[1px]"
        />

        <div class="flex flex-1 flex-col justify-between gap-4">
                <p class="border-b">{item.variant.name}</p>
                <div class="flex-1 flex flex-col justify-between items-start overflow-auto">
                        <div class="w-full flex flex-col overflow-auto">
                                <div
                                        class="flex flex-row justify-between items-start sm:items-center"
                                >
                                        <p class="text-left w-full sm:w-auto">
                                                {item.variant.id}
                                        </p>
                                        <p class="">—</p>
                                        <p class="text-right w-full sm:w-auto">
                                                {item.quantity}x
                                                {item.variant.retail_price}
                                                {item.variant.currency}
                                        </p>
                                </div>
                        </div>
                        <div
                                class="w-full flex flex-row justify-between items-start border-t"
                        >
                                <p>Subtotal</p>
                                <p class="text-right w-full sm:w-auto">
                                        {(
                                                parseInt(item.variant.retail_price) * item.quantity
                                        ).toFixed(2)}
                                        {item.variant.currency}
                                </p>
                        </div>
                </div>
        </div>

        <!-- 
        <div class="flex flex-col max-h-80 h-full justify-between gap-4">
                <h5 class="border-b">{item.variant.name}</h5>
                <div class="flex-1 flex flex-col justify-between items-start overflow-auto">
                        <div class="w-full flex flex-col overflow-auto">
                                {#each Array(item.quantity) as _, i}
                                        <div
                                                class="flex flex-col justify-between items-start sm:flex-row sm:items-center"
                                        >
                                                <p class="text-left w-full sm:w-auto">
                                                        {item.variant.id}
                                                </p>
                                                <p class="hidden sm:inline-flex">—</p>
                                                <p class="text-right w-full sm:w-auto">
                                                        {item.variant.retail_price}
                                                        {item.variant.currency}
                                                </p>
                                        </div>
                                {/each}
                        </div>
                        <div
                                class="w-full flex flex-col justify-between items-start border-t sm:flex-row sm:items-center"
                        >
                                <p>Subtotal</p>
                                <p class="hidden sm:inline-flex">—</p>
                                <p class="text-right w-full sm:w-auto">
                                        {(
                                                parseInt(item.variant.retail_price) * item.quantity
                                        ).toFixed(2)}
                                        {item.variant.currency}
                                </p>
                        </div>
                </div>
                <div
                        class="flex flex-col justify-between items start sm:flex-row sm:items-center gap-2"
                >
                        <label for="quantity">Quantity: </label>
                        <div class="quantity-buttons flex flex-row justify-end gap-1">
                                <a
                                        href="#"
                                        class="badge aspect-square cursor-pointer clr-text clr-bg clr-inverse font-mono"
                                        on:click={subtractItem}
                                        on:keydown={subtractItem}>-</a
                                >
                                <input
                                        class="badge w-full text-right clr-text clr-bg clr-inverse font-mono sm:max-w-[5em]"
                                        type="number"
                                        name="quantity"
                                        value={item.quantity}
                                        on:input={setQuantity}
                                />
                                <a
                                        href="#"
                                        class="badge aspect-square cursor-pointer clr-text clr-bg clr-inverse font-mono"
                                        on:click={addItem}
                                        on:keydown={addItem}
                                        ><span class="pointer-events-none">+</span></a
                                >
                        </div>
                </div>
        </div> -->
</li>

<style>
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
                display: none;
        }

        input[type='number'] {
                -moz-appearance: textfield;
                /* Firefox */
        }
</style>
