import { error } from '@sveltejs/kit';

import { PRINTFUL_API_TOKEN } from '$env/static/private';

const endpoint = 'https://api.printful.com/shipping/rates';

const headers = {
        Authorization: `Bearer ${PRINTFUL_API_TOKEN}`,
        'Content-Type': 'application/json'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
        const body = await request.json();

        return new Response(JSON.stringify(await fetchShipping(body)), {
                headers: { 'Content-Type': 'application/json' }
        });
}
async function fetchShipping(body: any) {
        try {
                const response = await fetch(endpoint, {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers
                });
                const data = await response.json();

                console.log(data);

                return data;
        } catch (error) {
                console.log(error);
        }
}
