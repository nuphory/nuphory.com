import wretch from 'wretch';
import { retry } from 'wretch/middlewares';

import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const api = wretch(PUBLIC_API_ENDPOINT).content('application/json').middlewares([retry()]);
