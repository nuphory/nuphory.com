import { PUBLIC_PAYPAL_CLIENT_ID } from '$env/static/public';
import type { SyncVariant } from '$lib/api/product';
import type { Recipient } from '$lib/api/stores/recipient';
import { loadScript } from '@paypal/paypal-js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {

        const body: {
                external_id: string;
                shipping: string;
                recipient?: Recipient;
                items: SyncVariant[];
                retail_costs: {
                        currency: string;
                        subtotal: number;
                        discount: number;
                        shipping: number;
                        tax: number;
                };
                currency: string;
        } = {
                external_id: (Math.random() * 2 ** 64).toFixed(0).toString(),
                shipping: 'STANDARD',
                recipient: undefined,
                items: [],
                retail_costs: {
                        currency: 'EUR',
                        subtotal: 0,
                        discount: 0,
                        shipping: 0,
                        tax: 0
                },
                currency: 'EUR'
        };

        return { body: body };
}
