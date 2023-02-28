import { printfulApi } from '$src/lib/api/externalApis';
import type { Order } from '$src/lib/types/order';
import { retry } from 'wretch/middlewares';
import { WretchError } from 'wretch/resolver';

const printfulOrdersApi = printfulApi
        .middlewares([retry({ maxAttempts: 1, resolveWithLatestResponse: true })])
        .url('/orders');

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }): Promise<Response> {
        const body: Order = await request.json();

        try {
                const res = await printfulOrdersApi.url(`/estimate-costs`).post(body).res();

                const json = await res.json();

                console.debug('cost estimation', json);

                return new Response(JSON.stringify(json), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                });
        } catch (error) {
                if (error instanceof WretchError) {
                        console.error(error.message);

                        return new Response(
                                JSON.stringify({
                                        message: 'Could not estimate costs for order',
                                        details: JSON.parse(error.message)
                                }),
                                {
                                        status: 500,
                                        headers: { 'Content-Type': 'text/plain' }
                                }
                        );
                } else {
                        console.error(error);
                        return new Response(
                                JSON.stringify({
                                        message: 'Could not estimate costs for order',
                                        details: error
                                }),
                                {
                                        status: 500,
                                        headers: { 'Content-Type': 'text/plain' }
                                }
                        );
                }
        }
}
