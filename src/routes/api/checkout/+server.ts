import { error } from '@sveltejs/kit';

import { PRINTFUL_API_TOKEN } from '$env/static/private';

const endpoint = 'https://api.printful.com/orders';

const headers = {
        Authorization: `Bearer ${PRINTFUL_API_TOKEN}`,
        'Content-Type': 'application/json'
};

// /** @type {import('./$types').RequestHandler} */
// export async function GET(req) {
//         return new Response('');
// }

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
        const body = await request.json();

        console.log(body);

        // return new Response(JSON.stringify({understandable: "have a nice day"}));
        return new Response(JSON.stringify(await createOrder(body)), {
                headers: { 'Content-Type': 'application/json' }
        });
}
async function createOrder(body: any) {
        try {
                body.items = [body.items[0]];

                const response = await fetch(endpoint, {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers
                });
                const data = await response.json();
                console.log("order creation", data);
                return data;
        } catch (error) {
                console.log(error);
        }
}
