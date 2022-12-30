<script lang="ts">
        import type { Product, SyncVariant } from '$lib/types/product';
        import currentOrder from '$lib/api/stores/order';

        export let product: Product;

        let selectedVariant: SyncVariant;
        function selectVariant(event) {
                document.querySelector('.cart-button')?.classList.remove('disabled');

                selectedVariant = product.sync_variants.find(
                        (variant: SyncVariant) => variant.id == event.target.value
                ) as SyncVariant;
        }

        function addItem(event) {
                console.log('addItem');
                if (!selectedVariant) return;
                console.log('addItem', selectedVariant);
                if (event.type != 'click') {
                        switch (event.key) {
                                case 'Enter':
                                        break;
                                default:
                                        return;
                        }
                }

                currentOrder.addItem(selectedVariant);
        }
</script>

<li
        class="flex flex-col justify-center items-center clr-regular m-4 p-4 rounded-[2em] border-[3px]"
>
        <!-- <a href="/shop/{product.id}"> -->
        <div class="showcase relative flex flex-col justify-center items-center">
                <img
                        src={product.sync_product.thumbnail_url}
                        alt={product.sync_product.name}
                        class="aspect-square w-full max-w-xs rounded-2xl border-[1px]"
                />
                <span
                        class="price absolute right-2 bottom-0 py-1 px-3 translate-y-1/3 badge border-[3px] clr-bg clr-inverse font-mono"
                >
                        {selectedVariant
                                ? selectedVariant.retail_price
                                : product.sync_variants[0].retail_price}
                        {selectedVariant
                                ? selectedVariant.currency
                                : product.sync_variants[0].currency}
                </span>
        </div>
        <h4>{product.sync_product.name}</h4>

        <div class="product-selection flex flex-row justify-center items-center gap-4">
                <select
                        class="badge border-[1px] clr-border clr-bg"
                        name="variant"
                        on:change={selectVariant}
                >
                        <option value="0" disabled selected>Select your size</option>
                        {#each product.sync_variants as variant}
                                <option value={variant.id}>{variant.name}</option>
                        {/each}
                </select>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <button
                        class="	cart-button badge aspect-square cursor-pointer  
				clr-bg clr-inverse 
				hover:scale-105 active:scale-95
				disabled"
                        on:click={addItem}
                        on:keydown={addItem}
                        tabindex="0"
                >
                        <img
                                width="18px"
                                height="18px"
                                alt="add to cart"
                                src="/assets/icons/cart-plus-solid.svg"
                        />
                </button>
        </div>
</li>
