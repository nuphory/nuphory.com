import { error } from '@sveltejs/kit';

import { PRINTFUL_API_TOKEN } from '$env/static/private';
import { PAYPAL_CLIENT_SECRET } from '$env/static/private';
import type { Order } from '$lib/types/order';
import { PUBLIC_PAYPAL_CLIENT_ID } from '$env/static/public';
import { cancelOrder } from '../cancel/+server';

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
export async function POST({ request }) {
        const body: {
                paypal_order_id: string;
                printful_order_id: number;
        } = await request.json();

        try {
                const response = await fetch(`${paypal_endpoint}/${body.paypal_order_id}`, {
                        method: 'GET',
                        headers: paypal_headers
                });
                const data = await response.json();
                console.log('paypal order confirmation', data);

                if (data.status !== 'COMPLETED' && data.status !== 'APPROVED') {
                        return new Response(
                                JSON.stringify({
                                        message: 'Order not confirmed',
                                        details: 'Order payment has not yet been completed or approved'
                                }),
                                {
                                        status: 500
                                }
                        );
                }
                return await confirmOrder(body.printful_order_id);
        } catch {
                console.log(error);
                return new Response(JSON.stringify({ message: 'Could not confirm order', error }), {
                        status: 500
                });
        }
}
async function confirmOrder(id: number): Promise<Response> {
        const response = await fetch(`${printful_endpoint}/${id}/confirm`, {
                method: 'POST',
                headers: printful_headers
        });
        const data = await response.json();
        console.log('order confirmation', data);
        return data;
}
