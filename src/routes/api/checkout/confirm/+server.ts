import { paypalApi, printfulApi } from '$src/lib/api/externalApis';
import { type UntilFunction, retry } from 'wretch/middlewares';

const paypalOrdersApi = paypalApi.url('/v2/checkout/orders');
const printfulOrdersApi = printfulApi
        .middlewares([retry({ resolveWithLatestResponse: true })])
        .url('/orders');

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }): Promise<Response> {
        const body: {
                paypal_order_id: string;
                printful_order_id: number;
        } = await request.json();

        try {
                if (!(await isPaymentComplete(parseInt(body.paypal_order_id)))) {
                        return new Response(
                                JSON.stringify({
                                        message: 'Order not confirmed',
                                        details: 'Order payment has not yet been completed or approved'
                                }),
                                {
                                        status: 500
                                }
                        );
                }

                return confirmOrder(body.printful_order_id);
        } catch (error) {
                console.error(error);
                return new Response(
                        JSON.stringify({
                                message: 'Could not confirm order',
                                details: error
                        }),
                        {
                                status: 500,
                                headers: { 'Content-Type': 'text/plain' }
                        }
                );
        }
}

async function confirmOrder(id: number): Promise<Response> {
        const res = printfulOrdersApi.url(`/${id}/confirm`).post().res();

        const json = await (await res).json();

        // console.debug('order confirmation', json);

        return new Response(JSON.stringify(json), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
        });
}

async function isPaymentComplete(id: number): Promise<boolean> {
        const until: UntilFunction = (response) => {
                return (
                        response &&
                        response
                                .clone()
                                .json()
                                .then(
                                        (json) =>
                                                json.status === 'COMPLETED' ||
                                                json.status === 'APPROVED'
                                )
                );
        };

        return !!(await paypalOrdersApi
                .middlewares([
                        retry({
                                delayTimer: 60000,
                                maxAttempts: 5,
                                until
                        })
                ])
                .get(`/${id}`)
                .json());
}
