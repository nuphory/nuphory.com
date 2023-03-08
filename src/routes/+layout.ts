export const _siteName = 'nuphory';
export const _siteDescription =
        'nuphory is an artist that makes HYPERTRANCE and NEOY2K music and art. Check out all of her socials below!';
export const _tagLine = 'HYPERTRANCE & NEOY2K';

/** @type {impor('./$types').LayoutLoad} */
export async function load({ url: { pathname }}) {
        return { pathname };
}