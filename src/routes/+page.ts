// import { api } from '$lib/api/internalApi';

// import type { Product, SyncProduct } from '$lib/types/product';

// /** @type {import('./$types').PageLoad} */
// export async function load() {
//         try {
//                 const res = api.url('/products').get().res();

//                 const json = await (await res).json();

//                 // console.debug('products', json);

//                 const sync_products = json.result as SyncProduct[];

//                 const products = sync_products.map(async (sync_product: SyncProduct) => {
//                         const res = api.url(`/products/${sync_product.id}`).get().res();

//                         const json = await (await res).json();

//                         // console.debug('product', json);

//                         return json.result as Product;
//                 });

//                 return { products: await Promise.all(products) };
//         } catch (error) {
//                 console.error(error);
//         }
// }
