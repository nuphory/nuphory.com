import SpotifyButton from '$lib/components/icons/SpotifyButton.svelte';
import SoundCloudButton from '$lib/components/icons/SoundCloudButton.svelte';
import YouTubeButton from '$lib/components/icons/YouTubeButton.svelte';

export default [
        {
                label: 'spotify',
                href: 'https://open.spotify.com/artist/1peAJRnCgGwBv46QXFJEbU',
                img: SpotifyButton
        },
        {
                label: 'soundcloud',
                href: 'https://soundcloud.com/nuphory',
                img: SoundCloudButton
        },
        {
                label: 'youtube',
                href: 'https://www.youtube.com/nuphory',
                img: YouTubeButton
        }
];
