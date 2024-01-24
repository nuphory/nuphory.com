// store/users.ts
import { persistentAtom } from '@nanostores/persistent';
import type { WritableAtom } from 'nanostores';

export const theme: WritableAtom<'light' | 'dark'> = persistentAtom('theme', 'light', {
        encode: JSON.stringify,
        decode: JSON.parse
});

export function changeTheme(newTheme?: 'light' | 'dark' | undefined) {
        const currentTheme = theme.get();

        if (newTheme === undefined) {
                newTheme = currentTheme === 'light' ? 'dark' : 'light';
        }

        theme.set(newTheme);

        console.debug(`Theme changed from ${currentTheme} to ${newTheme}`);
}
