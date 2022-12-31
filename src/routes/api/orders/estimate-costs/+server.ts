import { error } from '@sveltejs/kit';

import { PRINTFUL_API_TOKEN } from '$env/static/private';
import type { Order } from '$src/lib/types/order';

const endpoint = 'https://api.printful.com/orders/estimate-costs';

const headers = {
        Authorization: `Bearer ${PRINTFUL_API_TOKEN}`,
        'Content-Type': 'application/json'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
        const body: Order = await request.json();

        return new Response(JSON.stringify(await fetchCosts(body)), {
                headers: { 'Content-Type': 'application/json' }
        });
}
async function fetchCosts(body: Order) {
        try {
                const response = await fetch(endpoint, {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers
                });
                const data = await response.json();

                console.debug(data);

                return data;
        } catch (error) {
                console.error(error);
        }
}
