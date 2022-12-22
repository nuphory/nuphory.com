/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('/api/products');
	const data = await response.json();

	const products = await Promise.all(
		data.result.map(async (product) => {
			const response = await fetch(`/api/products/${product.id}`);
			const data = await response.json();

			// get data.result.sync_variants as a hashset where the id is the key
			// and the value is the variant object
			product.sync_variants = data.result.sync_variants.reduce((acc, variant) => {
				acc[variant.id] = variant;
				return acc;
			}, {});

			product.sync_variants = data.result.sync_variants;

			product.selectedVariant = product.sync_variants[1].id;
			product.selectVariant = (event) => {
				product.selectedVariant = event.target.value;
			};

			return product;
		})
	);

	return { products };
}

// export const ssr = false;