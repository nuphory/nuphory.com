import { storedOrder, order } from '$lib/api/stores/order';

import recipientStore from '$lib/api/stores/recipient';
import { cart as cartStore } from '$lib/api/stores/cart';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
        cartStore.subscribe((value) => {
                order.update((order) => {
                        order.items = Array.from(value).map((cartItem) => {
                                const variant = cartItem[1].variant;
                                variant.quantity = cartItem[1].quantity;
                                return variant;
                        });
                        order.retail_costs.subtotal = Array.from(value)
                                .reduce((acc, cartItem) => {
                                        return (
                                                acc +
                                                parseFloat(cartItem[1].variant.retail_price) *
                                                        cartItem[1].quantity
                                        );
                                }, 0)
                                .toFixed(2);
                        order.retail_costs.tax = (
                                parseFloat(order.retail_costs.subtotal) * 0.19
                        ).toFixed(2);
                        return order;
                });
        });

        recipientStore.subscribe((value) => {
                let require_state: boolean;

                switch (value.country_code) {
                        case 'AU':
                        case 'BR':
                        case 'CA':
                        case 'JP':
                        case 'US':
                                require_state = true;
                                break;
                        default:
                                require_state = false;
                                break;
                }
                // welcome to Mt. Indentation
                // Stick to the Indentation slopes,
                // because the Outdentation slopes are much steeper than they look.

                order.update((orderValue) => {
                        orderValue.recipient = value;

                        if (require_state && !value.state_code) return;

                        fetch('/api/shipping', {
                                body: JSON.stringify(orderValue),
                                method: 'POST'
                        })
                                .then((response) => response.json())
                                .then((data) => {
                                        if (data.code == 200) {
                                                order.update((order) => {
                                                        order.retail_costs.shipping =
                                                                data.result.find(
                                                                        (rate) =>
                                                                                rate.id ===
                                                                                'STANDARD'
                                                                ).rate;

                                                        return order;
                                                });
                                        }
                                });
                        return orderValue;
                });
        });
}
