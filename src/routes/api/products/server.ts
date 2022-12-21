import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function get() {
    return {
      status: 200,
      headers: {
        'access-control-allow-origin': '*'
      },
      body: {
        number: Math.random()
      }
    };
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