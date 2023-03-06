<script lang="ts">
        import { fade } from 'svelte/transition';
        import type { Product, SyncVariant } from '$lib/types/product';
        import currentOrder from '$lib/api/stores/order';
        import CartPlus from './icons/CartPlus.svelte';

        export let product: Product;

        let selectedVariant: SyncVariant;
        function selectVariant(event) {
                document.querySelector('.cart-button')?.classList.remove('disabled');

                selectedVariant = product.sync_variants.find(
                        (variant: SyncVariant) => variant.id == event.target.value
                ) as SyncVariant;
        }

        function addItem(event) {
                // console.debug('addItem');
                if (!selectedVariant) return;
                // console.debug('addItem', selectedVariant);
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

<li class="w-xs m-4 p-4 rounded-[2em] outline outline-[3px]">
        <!-- product listing -->

        <!-- product showcase -->
        <div class="relative">
                <!-- product image -->
                {#if product}
                        <img
                                in:fade={{ duration: 500 }}
                                src={product.sync_product?.thumbnail_url}
                                alt={product.sync_product?.name}
                                class="
                                        relative 
                                        aspect-square 
                                        w-80 max-w-xs 
                                        rounded-2xl outline outline-[1px] 
                                        bg-white
                                "
                        />
                {:else}
                        <div
                                in:fade={{ duration: 500 }}
                                class="
                                                relative 
                                                aspect-square 
                                                w-80 max-w-xs 
                                                rounded-2xl outline outline-[1px] 
                                                bg-white
                                        "
                        >
                                <h4
                                        class="absolute bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 text-neutral-200"
                                >
                                        Loading...
                                </h4>
                        </div>
                {/if}
                <!-- product price -->
                {#if product}
                        <span
                                in:fade={{ duration: 500 }}
                                class="
                                        absolute 
                                        right-2 bottom-0 
                                        translate-y-1/3 
                                        py-1 px-3 
                                        font-mono

                                        outline outline-[3px] outline-[var(--text-invert)]

                                        clr-bg-invert clr-text-invert
                                        badge
                                "
                        >
                                {selectedVariant
                                        ? selectedVariant.retail_price
                                        : product.sync_variants[0].retail_price}
                                {selectedVariant
                                        ? selectedVariant.currency
                                        : product.sync_variants[0].currency}
                        </span>
                {:else}
                        <span
                                in:fade={{ duration: 500 }}
                                class="
                                        absolute 
                                        right-2 bottom-0 
                                        translate-y-1/3 
                                        py-1 px-3 
                                        font-mono

                                        outline outline-[3px] outline-[var(--text-invert)]

                                        clr-bg-invert clr-text-invert
                                        badge
                                "
                        >
                                -.-- EUR
                        </span>
                {/if}
        </div>
        <!-- product name -->
        {#if product}
                <h4 in:fade={{ duration: 500 }} class="text-center">
                        {product.sync_product.name}
                </h4>
        {:else}
                <h4 in:fade={{ duration: 500 }} class="text-center">Loading...</h4>
        {/if}
        <!-- size selection -->

        <div class="flex flex-row justify-between items-center gap-4">
                <select
                        class="grow badge outline outline-[1px] clr-bg-invert clr-text-invert"
                        name="variant"
                        on:change={selectVariant}
                >
                        {#if product}
                                <option in:fade={{ duration: 500 }} value="0" disabled selected
                                        >Select your size</option
                                >
                                {#each product.sync_variants as variant}
                                        <option in:fade={{ duration: 500 }} value={variant.id}
                                                >{variant.name}</option
                                        >
                                {/each}
                        {:else}
                                <option in:fade={{ duration: 500 }} value="0" disabled selected
                                        >Loading sizes...</option
                                >
                        {/if}
                </select>
                <button
                        class="	cart-button badge aspect-square cursor-pointer  
				clr-bg-invert clr-text-invert 
				hover:scale-105 active:scale-95
				disabled"
                        on:click={addItem}
                        on:keydown={addItem}
                        tabindex="0"
                >
                        <CartPlus height="18px" />
                </button>
        </div>
</li>
