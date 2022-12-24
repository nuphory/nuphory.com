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
export async function DELETE({ params }) {
        // return new Response("ok");
        return new Response(JSON.stringify(await cancelOrder(params.id)), {
                headers: { 'Content-Type': 'application/json' }
        });

}
async function cancelOrder(id: string) {
        try {
                const response = await fetch(`${endpoint}/${id}`, {
                        method: 'DELETE',
                        headers
                });
                const data = await response.json();
                console.log("order cancellation", data);
                return data;
        } catch (error) {
                console.log(error);
        }
}