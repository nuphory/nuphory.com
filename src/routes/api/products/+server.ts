/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const endpoint = 'https://api.printful.com/products';

	const headers = {
		Authorization: `Basic ${platform.env.PRINTFUL_API_KEY}`,
		'Content-Type': 'application/json'
	};

	// try

	// let response: Response;
}

// async function fetchProducts() {

//     // prinftul api endpoint
//     const endpoint = "https://api.printful.com/products";

//     const headers = {
//         "Authorization": `Basic ${PRINTFUL_API_KEY}`,
//         "Content-Type": "application/json",
//     }

//     try {
//         const response = await fetch(endpoint, {
//             headers,
//         });

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log(error);
//     }

// }
