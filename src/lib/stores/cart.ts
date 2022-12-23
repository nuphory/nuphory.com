import { get, writable, type Writable } from 'svelte/store';
import type Product from '../api/products/product';
import type { SyncVariant } from '../api/products/product';

export interface Cart extends Writable<Map<number, CartItem>> {
	add: (item: CartItem) => void;
	subtract: (item: CartItem) => void;
	remove: (item: CartItem) => void;
	clear: () => void;
	size: () => number;
}

export type CartItem = {
	variant: SyncVariant;
	product: Product;
	quantity: number;
};

function createCart() {
	const { subscribe, set, update }: Writable<Map<number, CartItem>> = writable(new Map());

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
					console.log(`item with variant id ${item.variant.id} not in cart`);
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
		clear: () => {
			set(new Map());
		},
		size: () => {
			let acc = 0;

			get(cart).forEach((item) => {
				acc += item.quantity;
			});

			return acc;
		}
	};

	return cart;
}

export const cart = createCart();
