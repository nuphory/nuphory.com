import { error } from '@sveltejs/kit';

import { PRINTFUL_API_TOKEN } from '$env/static/private';
import { PAYPAL_CLIENT_SECRET } from '$env/static/private';
import type { Order } from '$lib/types/order';
import { PUBLIC_PAYPAL_CLIENT_ID } from '$env/static/public';

const printful_endpoint = 'https://api.printful.com/orders';
const paypal_endpoint = 'https://api-m.sandbox.paypal.com/v2/checkout/orders';

const printful_headers = {
        Authorization: `Bearer ${PRINTFUL_API_TOKEN}`,
        'Content-Type': 'application/json'
};
const paypal_headers = {
        Authorization: `Basic ${Buffer.from(
                `${PUBLIC_PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
        ).toString('base64')}`,
        'Content-Type': 'application/json'
};

// /** @type {import('./$types').RequestHandler} */
// export async function GET(req) {
//         return new Response('');
// }

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
        const body: {
                id?: number;
                printful_order_id: number;
                paypal_order_id?: string;
        } = await request.json();

        return await cancelOrder(body.printful_order_id);
}

export async function cancelOrder(id: number): Promise<Response> {
        try {
                const response = await fetch(`${printful_endpoint}/${id}/cancel`, {
                        method: 'DELETE',
                        headers: printful_headers
                });
                const data = await response.json();
                console.info('order confirmation', data);
                return new Response(JSON.stringify({ message: 'Order canceled', data }), {
                        status: 200
                });
        } catch (error) {
                console.error(error);
                return new Response(JSON.stringify({ message: 'Could not cancel order', error }), {
                        status: 500
                });
        }
}
