import type { SyncProduct } from "$lib/api/product";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('/api/products');
	const data = await response.json();

	const products = await Promise.all(
		data.result.map(async (product: SyncProduct) => {
			const response = await fetch(`/api/products/${product.id}`);
			const data = await response.json();

			return data.result;
		})
	);

	return { products };
}

// export const ssr = false;