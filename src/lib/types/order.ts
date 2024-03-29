import type { Item } from '$lib/types/product';
import type { Recipient } from '$lib/types/recipient';

const defaultOrder: Order = {
        external_id: '0',
        shipping: 'STANDARD',
        recipient: {
                name: '',
                company: '',
                address1: '',
                address2: '',
                city: '',
                state_code: '',
                state_name: '',
                country_code: '',
                country_name: '',
                zip: '',
                phone: '',
                email: '',
                tax_number: ''
        },
        items: [],
        retail_costs: {
                currency: 'EUR',
                subtotal: 0,
                discount: 0,
                shipping: 0,
                tax: 0
        }
};

type Order = {
        external_id: string;
        shipping: string;
        recipient: Recipient;
        items: Item[];
        retail_costs: RetailCosts;
        gift?: Gift;
        packing_slip?: PackingSlip;
};

type RetailCosts = {
        currency: string;
        subtotal: number;
        discount: number;
        shipping: number;
        tax: number;
};

type Gift = {
        subject: string;
        message: string;
};

type PackingSlip = {
        email: string;
        phone: string;
        message: string;
        logo_url: string;
        store_name: string;
        custom_order_id: string;
};

export type { Order, RetailCosts, Gift, PackingSlip };

export default defaultOrder;
