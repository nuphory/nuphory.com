// songlist

import { DB, Song, Artist, Ref, RefTo, Platforms } from '@euterpe.js/music-library';

import ringtone from '$lib/assets/music/nuphory ft. luna lenta & cookie - ringtone.mp3';
import adrift from '$lib/assets/music/nuphory - ADRIFT.mp3';

function format_url(url: string) {
        return new URL(url.startsWith('/') ? 'http://localhost:5173' + url : url);
}

export const db = new DB();

db.add([
        new Artist({
                name: 'nuphory',
                links: [
                        [
                                Platforms.Spotify,
                                new URL('https://open.spotify.com/artist/2K0uRwlc2VKeRoWS8Iuija')
                        ],
                        [Platforms.Bandcamp, new URL('https://nuphory.bandcamp.com')],
                        [Platforms.SoundCloud, new URL('https://soundcloud.com/nuphory')],
                        [Platforms.Youtube, new URL('https://youtube.com/@nuphory')],
                        [Platforms.Twitter, new URL('https://twitter.com/nuphory')],
                        [Platforms.Instagram, new URL('https://instagram.com/nuphory')],
                        [Platforms.Portfolio, new URL('https://nuphory.com')]
                ]
        }),
        new Artist({
                name: 'Luna Lenta',
                links: []
        }),
        new Artist({
                name: 'cookie',
                links: []
        })
]);

db.add([
        new Song({
                artists: [
                        new Ref(RefTo.Artists, 0),
                        new Ref(RefTo.Artists, 1),
                        new Ref(RefTo.Artists, 2)
                ],
                name: 'ringtone (ft. luna lenta & cookie)',
                url: format_url(ringtone)
        }),
        new Song({
                artists: [new Ref(RefTo.Artists, 0)],
                name: 'ADRIFT',
                url: format_url(adrift)
        })
]);
