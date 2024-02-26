import { persistentAtom } from "@nanostores/persistent";
import type { WritableAtom } from "nanostores";

const themeStore: WritableAtom<string> = persistentAtom('theme', 'light', {
	encode: JSON.stringify,
	decode: JSON.parse,
});

export function setTheme(theme?: string) {

	const current = themeStore.get();

	if (!theme) {
		theme = "system";
	}
}

export { themeStore as theme };
