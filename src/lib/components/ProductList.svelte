<script lang="ts">
        import type { Product } from '$lib/types/product';
        import ProductListItem from './ProductListItem.svelte';

        export let products: Product[] = [];
</script>

<ul id="products" class="flex flex-col justify-center items-center md:flex-row">
        {#each products as product}
                <!-- TODO filter ignored products in the server-side GET request -->
                {#if !product.sync_product.is_ignored}
                        <ProductListItem {product} />
                {/if}
        {/each}
</ul>
