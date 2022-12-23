<script lang="ts">
        import type { Product } from '$lib/api/product';
        import ProductListItem from './ProductListItem.svelte';

        export let products: Product[] = [];
</script>

<ul id="products" class="flex flex-col justify-center items-center md:flex-row">
        {#each products as product}
                <ProductListItem {product} />
        {/each}
</ul>
