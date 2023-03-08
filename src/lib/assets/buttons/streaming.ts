import SpotifyButton from '$src/lib/components/icons/SpotifyIcon.svelte';
import SoundCloudButton from '$src/lib/components/icons/SoundCloudIcon.svelte';
import YouTubeButton from '$src/lib/components/icons/YouTubeIcon.svelte';

export default [
        {
                label: 'spotify',
                href: 'https://open.spotify.com/artist/1peAJRnCgGwBv46QXFJEbU',
                Icon: SpotifyButton
        },
        {
                label: 'soundcloud',
                href: 'https://soundcloud.com/nuphory',
                Icon: SoundCloudButton
        },
        {
                label: 'youtube',
                href: 'https://www.youtube.com/nuphory',
                Icon: YouTubeButton
        }
];
