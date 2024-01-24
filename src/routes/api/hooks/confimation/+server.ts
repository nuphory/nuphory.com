/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
        const body: Order = await request.json();

        new Response();
}
