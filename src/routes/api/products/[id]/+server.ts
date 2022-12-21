import { PRINTFUL_API_TOKEN } from '$env/static/private';

const endpoint = 'https://api.printful.com/store/products';

const headers = {
	Authorization: `Bearer ${PRINTFUL_API_TOKEN}`,
	'Content-Type': 'application/json'
};

import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET(req: any) {
    const { params } = req;
    const { id } = params;

	return new Response(JSON.stringify(await fetchProduct(id)), {
		headers: { 'Content-Type': 'application/json' }
	});
}

async function fetchProduct(id: number) {
	try {
		const response = await fetch(`${endpoint}/${id}`, { headers });
		const data = await response.json();

		return data;
	} catch (error) {
		return error;
	}
}