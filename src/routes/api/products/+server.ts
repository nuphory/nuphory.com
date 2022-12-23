import { error } from '@sveltejs/kit';

import { PRINTFUL_API_TOKEN } from '$env/static/private';
import type { SyncProduct } from '$lib/api/product';

const endpoint = 'https://api.printful.com/store/products';

const headers = {
	Authorization: `Bearer ${PRINTFUL_API_TOKEN}`,
	'Content-Type': 'application/json'
};

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return new Response(JSON.stringify(await fetchProducts()), {
		headers: { 'Content-Type': 'application/json' }
	});
}

async function fetchProducts() {
	try {
		const response = await fetch(endpoint, { headers });
		const data = await response.json();

		data.result = data.result as SyncProduct;

		return data;
	} catch (error) {
		return error;
	}
}
