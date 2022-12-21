import { PRINTFUL_API_TOKEN } from '$env/static/private';

const endpoint = 'https://api.printful.com/store/products';

const headers = {
	Authorization: `Bearer ${PRINTFUL_API_TOKEN}`,
	'Content-Type': 'application/json'
};

import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET(req) {
	return new Response(JSON.stringify(await fetchProducts(req)), {
		headers: { 'Content-Type': 'application/json' }
	});
}

async function fetchProducts(req) {
	try {
		const response = await fetch(endpoint, { headers });
		const data = await response.json();

        return data;

        // this gets all variants for each product as well, unnecessary and bad for optimization.
		return await Promise.all(data.result.map(async (product) => {
            const response = await req.fetch(`/api/products/${product.id}`);
            const data = await response.json();

            return data;
        }));
	} catch (error) {
		return error;
	}
}