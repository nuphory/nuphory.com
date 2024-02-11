import { persistentAtom } from '@nanostores/persistent';

export const volume = persistentAtom(
        'volume',
        { muted: false, volume: 0.5 },
        {
                encode: JSON.stringify,
                decode: JSON.parse
        }
);

export function changeVolume(newVolume?: number | undefined) {
        const currentVolume = volume.get();

        if (newVolume === undefined) {
                volume.set({ ...currentVolume, muted: !currentVolume.muted });
        } else {
                volume.set({ ...currentVolume, muted: false, volume: newVolume });
        }

        console.debug(`Volume changed from ${currentVolume} to ${newVolume}`);
}
