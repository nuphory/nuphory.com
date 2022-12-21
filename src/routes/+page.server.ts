import { error } from '@sveltejs/kit';
import { PRINTFUL_API_TOKEN } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

    const endpoint = 'https://api.printful.com/store/products';

	const headers = {
		Authorization: `Bearer ${PRINTFUL_API_TOKEN}`,
		'Content-Type': 'application/json'
	};

    let products;

	try {
		const response = await fetch(endpoint, { headers });

		const data = await response.json();
        products = await data.result.map(async (product) => { 
            try {
                const response = await fetch(`${endpoint}/${product.id}`, { headers});

                const data = await response.json();

                console.log(data.result.sync_product);
                console.log(data.result.sync_variants);

                return data.result;
                
            } catch (error) {
                console.log(error);
            }
        });
        
        products = await Promise.all(products);

        console.log(products);

	} catch (error) {
		console.log(error);
	}

    return { products };
}

