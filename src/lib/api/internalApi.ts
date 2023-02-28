import wretch from 'wretch';
import AbortAddon from 'wretch/addons/abort';
import { retry, dedupe } from 'wretch/middlewares';

import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const api = wretch(PUBLIC_API_ENDPOINT)
        .content('application/json')
        .addon(AbortAddon())
        .middlewares([]);
