import { writable } from "svelte/store";
import { cart } from "./cart";
import recipient from "./recipient";
import { browser } from "$app/environment";

let defaultOrder: {
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
        external_id: "0",
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
if (browser) {
        const storedOrder = localStorage.getItem('order');
        defaultOrder = storedOrder ? JSON.parse(storedOrder) : defaultOrder;
        console.log(defaultOrder);
}
const order = createOrder();
if (browser) {
        order.subscribe((order) => {
                localStorage.setItem('order', JSON.stringify(order));
                console.log("order changed", order);
        });
}
function createOrder() {
        return writable(defaultOrder);
}

order.subscribe((order) => {
        console.log("order", order);
});

export default order;