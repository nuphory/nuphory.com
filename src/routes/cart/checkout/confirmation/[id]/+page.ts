/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
        return { order_id: params.id };
}
