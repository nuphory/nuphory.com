import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { SyncVariant } from '../product';
import type { Recipient } from './recipient';

const defaultOrder: {
        external_id: string;
        shipping: string;
        recipient?: Recipient;
        items: SyncVariant[];
        retail_costs: {
                currency: string;
                subtotal: string;
                discount: string;
                shipping: string;
                tax: string;
        };
} = {
        external_id: '0',
        shipping: 'STANDARD',
        recipient: undefined,
        items: [],
        retail_costs: {
                currency: 'EUR',
                subtotal: '0.00',
                discount: '0.00',
                shipping: '0.00',
                tax: '0.00'
        }
};

let storedOrderString;
if (browser) {
        const storedOrder = localStorage.getItem('order');
        storedOrderString = storedOrder ? JSON.parse(storedOrder) : defaultOrder;
}
const storedOrder = createOrder(storedOrderString);
const order = createOrder(defaultOrder);

if (browser) {
        storedOrder.subscribe((order) => {
                localStorage.setItem('order', JSON.stringify(order));
        });
}

function createOrder(order: {
        external_id: string;
        shipping: string;
        recipient?: Recipient;
        items: SyncVariant[];
        retail_costs: {
                currency: string;
                subtotal: string;
                discount: string;
                shipping: string;
                tax: string;
        };
}) {
        return writable(order);
}

order.subscribe((order) => {
        console.log('order', order);
});

export { storedOrder, order };
