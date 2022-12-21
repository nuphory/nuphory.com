import { error } from '@sveltejs/kit';
import { PRINTFUL_API_TOKEN } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    return new Response(PRINTFUL_API_TOKEN);
  }