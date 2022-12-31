import { error } from '@sveltejs/kit';

import { PRINTFUL_API_TOKEN } from '$env/static/private';
import type { Product } from '$lib/types/product';

const endpoint = 'https://api.printful.com/store/products';

const headers = {
        Authorization: `Bearer ${PRINTFUL_API_TOKEN}`,
        'Content-Type': 'application/json'
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
        return new Response(JSON.stringify(await fetchProduct(params.id)), {
                headers: { 'Content-Type': 'application/json' }
        });
}

async function fetchProduct(id: number) {
        try {
                const response = await fetch(`${endpoint}/${id}`, { headers });
                const data = await response.json();

                data.result = data.result as Product;

                return data;
        } catch (error) {
                console.error(error);
        }
}
