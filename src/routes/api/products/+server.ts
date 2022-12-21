import { PRINTFUL_API_TOKEN } from '$env/static/private';

import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return new Response(JSON.stringify(await fetchProducts()), { headers: { 'Content-Type': 'application/json' } });
}


async function fetchProducts() {

  // prinftul api endpoint
  const endpoint = "https://api.printful.com/store/products";

  const headers = {
      "Authorization": `Bearer ${PRINTFUL_API_TOKEN}`,
      "Content-Type": "application/json",
  }

  try {
      const response = await fetch(endpoint, {
          headers,
      });

      const data = await response.json();
      return data;
  } catch (error) {
      console.log(error);
  }
}