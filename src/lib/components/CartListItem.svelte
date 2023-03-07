<script lang="ts">
        import currentOrder from '$lib/api/stores/order';
        import type { Item } from '$lib/types/product';

        export let item: Item;

        function addItem(event) {
                event.preventDefault();
                if (event.type != 'click') {
                        switch (event.key) {
                                case 'Enter':
                                        break;
                                default:
                                        return;
                        }
                }
                currentOrder.addItem(item);
        }

        function subtractItem(event) {
                event.preventDefault();
                if (event.type != 'click') {
                        switch (event.key) {
                                case 'Enter':
                                        break;
                                default:
                                        return;
                        }
                }
                currentOrder.subtractItem(item);
        }

        function setQuantity(event) {
                if (!event.target.value) return;
                // if (event.target.value < 1) return;

                currentOrder.setItemQuantity(item, parseInt(event.target.value));
        }
</script>

<li
        class="flex flex-col basis-1 justify-between items-center m-4 p-4 rounded-[2em] outline outline-3 gap-4 sm:flex-row xs:items-start"
>
        <img
                src={item.files[1].preview_url}
                alt={item.name}
                class="aspect-square w-full max-w-xs rounded-2xl outline outline-[1px]"
        />

        <div class="flex flex-col max-h-80 h-full justify-between gap-4">
                <h5 class="border-b clr-border">{item.name}</h5>
                <div class="flex-1 flex flex-col justify-between items-start overflow-auto">
                        <div class="w-full flex flex-col overflow-auto">
                                {#each Array(item.quantity) as _, i}
                                        <div
                                                class="flex flex-col justify-between items-start sm:flex-row sm:items-center"
                                        >
                                                <p class="text-left w-full sm:w-auto">
                                                        {item.id}
                                                </p>
                                                <p class="hidden sm:inline-flex">—</p>
                                                <p class="text-right w-full sm:w-auto">
                                                        {item.retail_price}
                                                        {item.currency}
                                                </p>
                                        </div>
                                {/each}
                        </div>
                        <div
                                class="w-full flex flex-col justify-between items-start border-t clr-border sm:flex-row sm:items-center"
                        >
                                <p>Subtotal</p>
                                <p class="hidden sm:inline-flex">—</p>
                                <p class="text-right w-full sm:w-auto">
                                        {(parseFloat(item.retail_price) * item.quantity).toFixed(2)}
                                        {item.currency}
                                </p>
                        </div>
                </div>
                <div
                        class="flex flex-col justify-between items start sm:flex-row sm:items-center gap-4"
                >
                        <label for="quantity">Quantity: </label>
                        <div class="quantity-buttons flex flex-row justify-end gap-2">
                                <button
                                        class="badge aspect-square cursor-pointer clr-text-invert clr-bg-invert font-mono font-bold hover:scale-105"
                                        on:click={subtractItem}>-</button
                                >
                                <input
                                        class="badge w-full text-right clr-text-invert bg-[var(--background-invert)] font-mono sm:max-w-[5em] border-none outline-none"
                                        type="number"
                                        name="quantity"
                                        min="1;"
                                        value={item.quantity}
                                        on:input={setQuantity}
                                />
                                <button
                                        class="badge aspect-square cursor-pointer clr-text-invert clr-bg-invert font-mono font-bold hover:scale-105"
                                        on:click={addItem}>+</button
                                >
                        </div>
                </div>
        </div>
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
