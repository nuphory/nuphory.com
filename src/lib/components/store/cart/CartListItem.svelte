<script lang="ts">
        import { cart as cartStore, type CartItem } from '$lib/api/stores/cart';

        export let item: CartItem;

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
                cartStore.add(item);
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
                cartStore.subtract(item);
        }

        function setQuantity(event) {
                if (!event.target.value) return;
                if (event.target.value < 1) return;

                cartStore.setQuantity(item, parseInt(event.target.value));
        }
</script>

<li
        class="flex flex-col basis-1  justify-between items-center m-4 p-4 rounded-[2em] border-[3px] gap-4 sm:flex-row xs:items-start"
>
        <img
                src={item.variant.files[1].preview_url}
                alt={item.variant.name}
                class="aspect-square w-full max-w-xs rounded-2xl border-[1px]"
        />

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
                                        href=" "
                                        class="badge aspect-square cursor-pointer clr-text clr-bg clr-inverse font-mono"
                                        on:click={subtractItem}
                                        on:keydown={subtractItem}>-</a
                                >
                                <input
                                        class="badge w-full text-right clr-text clr-bg clr-inverse font-mono sm:max-w-[5em]"
                                        type="number"
                                        name="quantity"
                                        min="1;"
                                        value={item.quantity}
                                        on:input={setQuantity}
                                />
                                <a
                                        href=" "
                                        class="badge aspect-square cursor-pointer clr-text clr-bg clr-inverse font-mono"
                                        on:click={addItem}
                                        on:keydown={addItem}
                                        ><span class="pointer-events-none">+</span></a
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
