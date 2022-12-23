import { cart } from '$lib/stores/cart';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return new Response(JSON.stringify(await getCart()), {
		headers: { 'Content-Type': 'application/json' }
	});
}

async function getCart() {
    return get(cart);
}