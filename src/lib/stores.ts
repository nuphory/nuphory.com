import { writable, type Writable} from "svelte/store";
import type Product from "./api/products/Product";

function createCart() {
    const { subscribe, set, update }: Writable<unknown[]> = writable([]);

    return {
        subscribe,
        add: (item: unknown) => update((cart) => [...cart, item]),
        remove: (item: unknown) => update((cart) => cart.filter((i) => i !== item)),
        clear: () => set([]),
    };
}

export const cart = createCart();
