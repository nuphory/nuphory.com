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
export async function POST({ params }) {
        // return new Response("ok");
        return new Response(JSON.stringify(await confirmOrder(params.id)), {
                headers: { 'Content-Type': 'application/json' }
        });

}
async function confirmOrder(id: string) {
        try {
                const response = await fetch(`${endpoint}/${id}/confirm`, {
                        method: 'POST',
                        headers
                });
                const data = await response.json();
                console.log("order confirmation", data);
                return data;
        } catch (error) {
                console.log(error);
        }
}