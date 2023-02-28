import { printfulApi } from '$src/lib/api/externalApis';
import type { Order } from '$src/lib/types/order';
import { retry } from 'wretch/middlewares';

const printfulOrdersApi = printfulApi
        .middlewares([retry({ resolveWithLatestResponse: true })])
        .url('/orders');

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }): Promise<Response> {
        const body: Order = await request.json();

        try {
                const res = printfulOrdersApi.post(body).res();

                const json = await (await res).json();

                console.debug('order creation', json);

                return new Response(JSON.stringify(json), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                });
        } catch (error) {
                console.error(error);
                return new Response(
                        JSON.stringify({
                                message: 'Could not create order',
                                details: error
                        }),
                        {
                                status: 500,
                                headers: { 'Content-Type': 'text/plain' }
                        }
                );
        }
}
