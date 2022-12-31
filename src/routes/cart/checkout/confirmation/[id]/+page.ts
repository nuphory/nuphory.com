/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
        return { order_id: params.id };
}
