import { writable, type Writable } from 'svelte/store';
import _ from 'lodash';

import defaultOrder, { type Order } from '$lib/types/order';
import type { Item, SyncVariant } from '$lib/types/product';
import { browser } from '$app/environment';

type OrderStore = Writable<Order> & {
        lastState: Order;
        createId: () => string;
        getSubtotal: () => string;
        getItems: () => Item[];
        getItemCount: (variant?: SyncVariant | number) => number;
        addItem: (variant: SyncVariant) => void;
        subtractItem: (variant: SyncVariant | number) => void;
        setItemQuantity: (item: Item | SyncVariant | number, quantity: number) => void;
        removeItem: (variant: SyncVariant | number) => void;
        clearItems: () => void;
        setRecipient: (recipient: {
                name?: string;
                company?: string;
                address1?: string;
                address2?: string;
                city?: string;
                state_code?: string;
                state_name?: string;
                country_code?: string;
                country_name?: string;
                zip?: string;
                phone?: string;
                email?: string;
                tax_number?: string;
        }) => void;
        setRetailCosts: (costs: {
                currency?: string;
                subtotal?: string;
                discount?: string;
                shipping?: string;
                tax?: string;
        }) => void;
};

function createOrder(order: Order = defaultOrder): OrderStore {
        const { subscribe, set, update } = writable(order);

        const orderStore: OrderStore = {
                subscribe,
                update,
                set,

                lastState: _.cloneDeep(order),

                createId: () => {
                        const external_id = (Math.random() * 2 ** 64).toFixed(0).toString();
                        update((order) => ({ ...order, external_id }));
                        return (Math.random() * 2 ** 64)
                        .toFixed(0)
                        .toString();
                },

                /**
                 * get the subtotal of the order
                 * @returns subtotal of the the order
                 */
                getSubtotal: () => {
                        let subtotal = '0.00';

                        subscribe((order) => {
                                subtotal = order.retail_costs.subtotal;
                        })();

                        return subtotal;
                },

                /**
                 * get all items in the order
                 * @returns items
                 */
                getItems: () => {
                        let items: Item[] = [];
                        subscribe((order) => (items = order.items))();
                        return items;
                },

                /**
                 * get the amount / quantity of items in the order
                 * @param variant if undefined, returns total item count
                 * @returns item count
                 */
                getItemCount: (variant?: SyncVariant | number) => {
                        let items: Item[] = [];
                        subscribe((order) => (items = order.items))();

                        if (!variant)
                                return items.reduce((total, item) => total + item.quantity, 0);

                        let variantId: number;
                        if (typeof variant === 'number') variantId = variant;
                        else variantId = variant.id;

                        return items.find((item) => item.id === variantId)?.quantity ?? 0;
                },

                /**
                 * add an item to the order
                 * @param variant variant to add to cart
                 */
                addItem: (variant: SyncVariant) => {
                        let items: Item[] = [];

                        update((order) => {
                                items = order.items;

                                if (!items.find((item) => item.id === variant.id)) {
                                        items.push({ ...variant, quantity: 1 });
                                } else {
                                        items = items.map((item) => {
                                                if (item.id === variant.id) item.quantity++;
                                                return item;
                                        });
                                }

                                order.items = items;
                                return order;
                        });
                },

                /**
                 * subtract an item from the order
                 * @param variant variant to subtract 1 of from the cart, can be a variant object or a variant id
                 */
                subtractItem: (variant: SyncVariant | number) => {
                        let variantId: number;
                        if (typeof variant === 'number') variantId = variant;
                        else variantId = variant.id;

                        let items: Item[] = [];

                        update((order) => {
                                items = order.items;

                                items = items
                                        .map((item) => {
                                                if (item.id === variantId) {
                                                        if (item.quantity > 0) item.quantity--;
                                                }
                                                return item;
                                        })
                                        .filter((item) => item.quantity > 0);

                                order.items = items;
                                return order;
                        });
                },

                /**
                 * set the quantity of an item in the order
                 * @param item variant to set the quantity of, can be a variant object, Item object, or a variant id
                 * @param quantity quantity to set the item to
                 */
                setItemQuantity: (item: Item | SyncVariant | number, quantity: number) => {
                        let itemId: number;
                        if (typeof item === 'number') itemId = item;
                        else itemId = item.id;

                        let storedItems: Item[] = [];

                        update((order) => {
                                storedItems = order.items;

                                storedItems = storedItems
                                        .map((storedItem) => {
                                                if (storedItem.id === itemId) {
                                                        storedItem.quantity = quantity;
                                                }
                                                return storedItem;
                                        })
                                        .filter((storedItem) => storedItem.quantity > 0);

                                order.items = storedItems;
                                return order;
                        });
                },

                /**
                 * remove an item from the order
                 * @param variant variant to remove from the cart, can be a variant object or a variant id
                 */
                removeItem: (variant: SyncVariant | number) => {
                        let variantId: number;
                        if (typeof variant === 'number') variantId = variant;
                        else variantId = variant.id;

                        let items: Item[] = [];

                        update((order) => {
                                items = order.items;

                                items = items.filter((item) => item.id !== variantId);

                                order.items = items;
                                return order;
                        });
                },

                /**
                 * clear all the items from the order
                 */
                clearItems: () => {
                        update((order) => {
                                order.items = [];
                                return order;
                        });
                },

                /**
                 * set the recipient of the order
                 * @param recipient the recipient to set on the order
                 */
                setRecipient: (recipient: {
                        name?: string;
                        company?: string;
                        address1?: string;
                        address2?: string;
                        city?: string;
                        state_code?: string;
                        state_name?: string;
                        country_code?: string;
                        country_name?: string;
                        zip?: string;
                        phone?: string;
                        email?: string;
                        tax_number?: string;
                }) => {
                        update((order) => {
                                const newRecipient = { ...order.recipient, ...recipient };

                                order.recipient = newRecipient;
                                return order;
                        });
                },

                /**
                 * set the retail costs of the order
                 * @param retailCosts retail costs to set on the order
                 */
                setRetailCosts: (costs: {
                        currency?: string;
                        subtotal?: string;
                        discount?: string;
                        shipping?: string;
                        tax?: string;
                }) => {
                        update((order) => {
                                const retailCosts = { ...order.retail_costs, ...costs };

                                order.retail_costs = retailCosts;
                                return order;
                        });
                }
        };

        return orderStore;
}

let cachedOrder: Order = defaultOrder;
if (browser) {
        const cachedOrderString = localStorage.getItem('current_order');

        if (cachedOrderString) {
                cachedOrder = JSON.parse(cachedOrderString);

                console.debug('found cached order: ', cachedOrder);
        }
}

const currentOrder = createOrder(cachedOrder);

currentOrder.subscribe((order) => {
        if (_.isEqual(order, currentOrder.lastState)) return;

        console.debug('current order changed: ', currentOrder.lastState, order);

        // check whether the items were updated
        if (!_.isEqual(order.items, currentOrder.lastState.items)) {
                console.debug('items changed: ', currentOrder.lastState.items, order.items);

                const subtotal = order.items
                        .reduce((total, item) => {
                                return total + item.quantity * parseFloat(item.retail_price);
                        }, 0)
                        .toFixed(2);

                console.debug('new subtotal: ', subtotal);

                currentOrder.setRetailCosts({ subtotal });
        }

        if (browser) {
                localStorage.setItem('current_order', JSON.stringify(order));
        }

        currentOrder.lastState = _.cloneDeep(order);
});

export default currentOrder;
