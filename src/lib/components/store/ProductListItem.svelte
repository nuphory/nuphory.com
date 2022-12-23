<script lang="ts">
        import { cart } from '$lib/api/stores/cart';
        import type { CartItem } from '$lib/api/stores/cart';
        import type Product from '$lib/api/product';
        import type { SyncVariant } from '$lib/api/product';

        export let product: Product;

        let selectedVariant: SyncVariant;
        let selectVariant = (event) => {
                document.querySelector('.cart-button')?.classList.remove('disabled');

                selectedVariant = product.sync_variants.find(
                        (variant: SyncVariant) => variant.id == event.target.value
                )!;
        };

        let addToCart = (event) => {
                if (event.type != 'click') {
                        switch (event.key) {
                                case 'Enter':
                                        break;
                                default:
                                        return;
                        }
                }

                if (!selectedVariant) return;
                const item: CartItem = {
                        variant: selectedVariant,
                        product: product as Product,
                        quantity: 1
                };
                cart.add(item);
        };
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
                        on:click={addToCart}
                        on:keydown={addToCart}
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
