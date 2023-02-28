import { printfulApi } from '$src/lib/api/externalApis';
import { retry } from 'wretch/middlewares';

const printfulOrdersApi = printfulApi
        .middlewares([retry({ resolveWithLatestResponse: true })])
        .url('/orders');

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }): Promise<Response> {
        const body: {
                id?: number;
                printful_order_id: number;
                paypal_order_id?: string;
        } = await request.json();

        try {
                const res = printfulOrdersApi
                        .url(`/${body.printful_order_id ?? body.id}`)
                        .delete()
                        .res();

                const json = await (await res).json();

                console.debug('order cancellation', json);

                return new Response(JSON.stringify(json), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                });
        } catch (error) {
                console.error(error);
                return new Response(
                        JSON.stringify({
                                message: 'Could not cancel order',
                                details: error
                        }),
                        {
                                status: 500,
                                headers: { 'Content-Type': 'text/plain' }
                        }
                );
        }
}
