import { get, writable, type Writable } from 'svelte/store';
import type Product from '../product';
import type { SyncVariant } from '../product';
import { browser } from '$app/environment';

let storedCart = new Map();

if (browser) {
        const storedCartString = localStorage.getItem('cart');
        storedCart = storedCartString ? new Map(JSON.parse(storedCartString)) : storedCart;
}

export const cart: Cart = createCart();

if (browser) {
        cart.subscribe((cart) => {
                localStorage.setItem('cart', JSON.stringify(Array.from(cart)));
        });
}

export interface Cart extends Writable<CartMap> {
        add: (item: CartItem) => void;
        subtract: (item: CartItem) => void;
        remove: (item: CartItem) => void;
        setQuantity: (item: CartItem, quantity: number) => void;
        clear: () => void;
        size: () => number;
        asArray: () => [number, CartItem][];
}

export type CartMap = Map<number, CartItem>;

export type CartItem = {
        variant: SyncVariant;
        product: Product;
        quantity: number;
};

function createCart() {
        const { subscribe, set, update }: Writable<CartMap> = writable(storedCart);

        const cart: Cart = {
                subscribe,
                set,
                update,
                add: (item: CartItem) => {
                        update((cart) => {
                                if (cart.has(item.variant.id)) {
                                        cart.get(item.variant.id)!.quantity += 1;
                                } else {
                                        cart.set(item.variant.id, item);
                                }

                                return cart;
                        });
                },
                subtract: (item: CartItem) => {
                        update((cart) => {
                                if (!cart.has(item.variant.id)) {
                                        return cart;
                                }

                                if (cart.get(item.variant.id)!.quantity > 1) {
                                        cart.get(item.variant.id)!.quantity -= 1;
                                } else {
                                        cart.delete(item.variant.id);
                                }

                                return cart;
                        });
                },
                remove: (item: CartItem) => {
                        update((cart) => {
                                cart.delete(item.variant.id);
                                return cart;
                        });
                },
                setQuantity: (item: CartItem, quantity: number) => {
                        update((cart) => {
                                if (quantity > 0) {
                                        item.quantity = quantity as number;
                                        cart.set(item.variant.id, item);
                                } else {
                                        cart.delete(item.variant.id);
                                }

                                return cart;
                        });
                },
                clear: () => {
                        set(new Map());
                },
                size: () => {
                        let acc = 0;

                        get(cart).forEach((item) => {
                                acc += item.quantity;
                        });

                        return acc;
                },
                asArray: () => {
                        const cart = get(cart) as CartMap;
                        const cartArray = Array.from(cart);
                        return cartArray;
                }
        };

        return cart;
}
