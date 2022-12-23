import { error } from '@sveltejs/kit';

import { PRINTFUL_API_TOKEN } from '$env/static/private';
import { PAYPAL_CLIENT_ID } from '$env/static/public';

import { loadScript } from '@paypal/paypal-js';

import type { CartItem } from '$lib/api/stores/cart';

const endpoint = 'https://api.printful.com/store/orders';

const headers = {
        Authorization: `Bearer ${PRINTFUL_API_TOKEN}`,
        'Content-Type': 'application/json'
};

/** @type {import('./$types').RequestHandler} */
export async function GET(req) {
        return new Response('');
}

/** @type {import('./$types').RequestHandler} */
export async function POST(req) {
        const { body } = req;

        const { cart, shipping } = JSON.parse(body);

        const order = await createOrder(cart, shipping);

        return new Response(JSON.stringify(order), {
                headers: { 'Content-Type': 'application/json' }
        });
}

export async function createOrder(cart: Map<number, CartItem>, shipping) {
        loadScript({ 'client-id': PAYPAL_CLIENT_ID })
                .then((paypal) => {
                        paypal?.Buttons({
                                style: {
                                        layout: 'horizontal',
                                        color: 'blue',
                                        shape: 'pill',
                                        label: 'paypal'
                                },
                                createOrder: (data, actions) => {},
                                onApprove: (data, actions) => {},
                                onError: (err) => {}
                        }).render('#paypal-button-container');

                        // start to use the PayPal JS SDK script
                })

                .catch((err) => {
                        console.error('failed to load the PayPal JS SDK script', err);
                });
}
