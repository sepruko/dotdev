import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import unocss from "@unocss/astro";
import type { AstroIntegration, AstroUserConfig } from "astro";
import { readFile } from "node:fs/promises";

// cspell:words mpa

/**
 * The Astro configuration for the `@sepruko/dotdev` project.
 */
export default {
	build: {
		assets: "resources/",
		inlineStylesheets: "never",
	},
	devToolbar: {
		enabled: true,
	},
	experimental: {
		clientPrerender: true,
		contentIntellisense: true,
	},
	i18n: {
		defaultLocale: "en-US",
		locales: ["en-US", "en"],
		fallback: {
			en: "en-US",
		},
		routing: {
			fallbackType: "rewrite",
		},
	},
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp",
			config: {
				limitInputPixels: false,
			},
		},
	},
	integrations: [
		dotdev(),
		mdx(),
		solid({ devtools: true, include: ["src/components/solid/**"] }),
		unocss(),
	],
	outDir: "build/",
	prefetch: true,
	redirects: {
		"/home": "/",
	},
	site: "https://sepruko.dev/",
	vite: {
		appType: "mpa",
	},
} as AstroUserConfig;

/**
 * The Astro integration for registering and auto-updating the `DotDev` global.
 */
function dotdev(): AstroIntegration {
	return {
		name: "@sepruko/dotdev/integration",
		hooks: {
			"astro:config:setup": async (options): Promise<void> => {
				const config = new URL("dotdev.config.json", options.config.root);

				options.addWatchFile(config);
				// biome-ignore lint/style/useNamingConvention: Match global.
				const DotDev = await readFile(config, { encoding: "utf-8", flag: "a+" });
				options.updateConfig({ vite: { define: { DotDev } } });
			},
		},
	};
}
