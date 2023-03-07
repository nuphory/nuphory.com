import { printfulApi } from '$src/lib/api/externalApis';

const printfulProductsApi = printfulApi.url('/store/products');

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }): Promise<Response> {
        try {
                const res = printfulProductsApi.url(`/${params.id}`).get().res();

                const json = await (await res).json();

                // console.debug('products', json);

                return new Response(JSON.stringify(json), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                });
        } catch (error) {
                console.error(error);
                return new Response(
                        JSON.stringify({
                                message: 'Could not fetch products',
                                details: error
                        }),
                        {
                                status: 500,
                                headers: { 'Content-Type': 'text/plain' }
                        }
                );
        }
}
