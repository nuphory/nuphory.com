import { PUBLIC_META_NAME } from "$env/static/public";

type Link = string | {
	url: string;
	text: string;
};

type Site = string | {
	web?: Link;
	twitter?: Link;
	github?: Link;
	instagram?: Link;
}

type Contributor = {
	name: string;
	role?: string | string[];
	site?: Site;
};



const contributors: Contributor[] = [
	{
		name: "nuphory",
		role: ["owner", "design", "concept"],
		site: {
			web: "https://nuphory.com/",
			twitter: "https://twitter.com/nuphory"
		}
	},
	{
		name: "mia.cx",
		role: ["product realization", "design", "user experience", "accessibility"],
		site: {
			web: "https://mia.cx/",
			twitter: {
				url: "https://twitter.com/miadotcx",
				text: "twitter"
			},
			github: "https://github.com/mia-cx"
		}
	},
	{
		name: "Djkáťo",
		role: ["feature development", "music player", "audio visualizer"],
		site: {
			web: "https://djkato.net/",
			twitter: "https://twitter.com/djkato_vfx"
		}
	}
];

export default function logAttribution() {
	/**
	 * website designed by patch: https://twitter.com/patchstep
	 */

	console.info(
		`%cWelcome to\n%c${PUBLIC_META_NAME}\n%c `,
		"font-family: sans-serif; font-size: 2rem; margin-left: 0.5rem; line-height: 2rem; color: #fffaf7;",
		"font-family: sans-serif; font-size: 6rem; line-height: 3rem; font-weight: bold; color: #fffaf7; overflow: visible",
		"font-family: sans-serif; font-size: 6rem; line-height: 2rem; color: #fffaf7;"
	);

	console.info(
		`%c${PUBLIC_META_NAME}%c.com%c was made by a bunch of wonderful folks! Check them out below:`,
		"font-family: sans-serif; font-size: 1rem; margin-left: 0.5rem; color: #fffaf7; font-weight: bold;",
		"font-family: sans-serif; font-size: 1rem; color: #fffaf7;",
		"font-family: sans-serif; font-size: 1rem; color: #fffaf7;"
	);

	contributors.forEach((contributor) => {
		const { name, role, site } = contributor;

		let siteString = "";

		if (typeof site === "object") {
			const siteEntries = Object.entries(site);

			siteEntries.forEach(([key, value]) => {
				if (typeof value === "object") {
					siteString += `    - ${value.text} - ${value.url}\n`;
				} else {
					siteString += `    - ${value}\n`;
				}
			});
		} else {
			siteString = `    - ${site}`;
		}

		const roleString = `    - ${Array.isArray(role) ? role.join("\n    - ") : role}`;

		console.info(
			`%c${name}\n%cresponsible for:\n${roleString}\n\n%c${site ? `find them at:\n${siteString}` : ''}`,
			"font-family: sans-serif; font-size: 2rem; line-height: 4rem; margin-left: 0.5rem; color: #fffaf7; font-weight: bold;",
			"font-family: sans-serif; font-size: 1rem; margin-left: 0.5rem; color: #fffaf7;",
			"font-family: sans-serif; font-size: 1rem; margin-left: 0.5rem; color: #fffaf7;",
		)

	});
}
