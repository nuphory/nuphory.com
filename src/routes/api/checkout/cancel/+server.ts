import { PRINTFUL_API_TOKEN } from '$env/static/private';
import { PAYPAL_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_PAYPAL_CLIENT_ID } from '$env/static/public';

import { base64encode } from '$lib/utils/base64';

const printful_endpoint = 'https://api.printful.com/orders';
const paypal_endpoint = 'https://api-m.paypal.com/v2/checkout/orders';

const printful_headers = {
        Authorization: `Bearer ${PRINTFUL_API_TOKEN}`,
        'Content-Type': 'application/json'
};
const paypal_headers = {
        Authorization: `Basic ${
                base64encode(`${PUBLIC_PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`)
                //         Buffer.from(
                //         `${PUBLIC_PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
                // ).toString('base64')
        }`,
        'Content-Type': 'application/json'
};

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
        const body: {
                id?: number;
                printful_order_id: number;
                paypal_order_id?: string;
        } = await request.json();

        return await cancelOrder(body.printful_order_id ?? body.id);
}

export async function cancelOrder(id: number): Promise<Response> {
        try {
                const response = await fetch(`${printful_endpoint}/${id}`, {
                        method: 'DELETE',
                        headers: printful_headers
                });
                const data = await response.json();
                console.info('order cancellation', data);
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
