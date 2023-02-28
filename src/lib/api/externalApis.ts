import wretch from 'wretch';
// import AbortAddon from 'wretch/addons/abort';
import { retry } from 'wretch/middlewares';

import { base64encode } from '$lib/utils/base64';

import { PRINTFUL_API_TOKEN, PAYPAL_CLIENT_SECRET } from '$env/static/private';
import {
        PUBLIC_PAYPAL_CLIENT_ID,
        PUBLIC_PRINTFUL_API_ENDPOINT,
        PUBLIC_PAYPAL_API_ENDPOINT,
        PUBLIC_API_ENDPOINT
} from '$env/static/public';

export const paypalApi = wretch(PUBLIC_PAYPAL_API_ENDPOINT)
        .auth(`Basic ${base64encode(`${PUBLIC_PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`)}`)
        .content('application/json')
        .middlewares([retry({ resolveWithLatestResponse: true })]);

export const printfulApi = wretch(PUBLIC_PRINTFUL_API_ENDPOINT)
        .auth(`Bearer ${PRINTFUL_API_TOKEN}`)
        .content('application/json');
// .middlewares([retry({ resolveWithLatestResponse: true })]);
// TODO add retry middleware where necessary

export const api = wretch(PUBLIC_API_ENDPOINT).content('application/json').middlewares([retry()]);
