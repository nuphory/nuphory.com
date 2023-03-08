<script lang="ts">
        import type { Product, SyncProduct } from '$lib/types/product';
        import wretch from 'wretch';
        import AbortAddon from 'wretch/addons/abort';

        const api = wretch('/api').content('application/json').addon(AbortAddon()).middlewares([]);

        // Components
        import ProductListItem from './ShopListItem.svelte';

        async function fetchProducts() {
                try {
                        const res = api.url('/products').get().res();

                        const json = await (await res).json();

                        // console.debug('products', json);

                        const sync_products = json.result as SyncProduct[];

                        const products = sync_products.map(async (sync_product: SyncProduct) => {
                                const res = api.url(`/products/${sync_product.id}`).get().res();

                                const json = await (await res).json();

                                // console.debug('product', json);

                                return json.result as Product;
                        });

                        return await Promise.all(products);
                } catch (error) {
                        return [];
                }
        }

        export let products: Product[] = [];
</script>

<ul id="products" class="flex flex-col justify-center items-center md:flex-row gap-8">
        {#await fetchProducts()}
                {#each Array(2) as obj, i}
                        <!-- <li>{i}</li> -->
                        <ProductListItem />
                {/each}
        {:then products}
                <!-- promise was fulfilled -->
                {#each products as product}
                        <!-- TODO filter ignored products in the server-side GET request -->
                        {#if !product.sync_product.is_ignored}
                                <ProductListItem {product} />
                        {/if}
                {/each}
        {/await}
</ul>
