import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import unocss from "@unocss/astro";
import type { AstroIntegration } from "astro";
import type { AstroUserConfig } from "astro/config";
import { readFile } from "node:fs/promises";

// cspell:words mpa

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
		contentCollectionCache: true,
		contentIntellisense: true,
		contentLayer: true,
		directRenderScript: true,
		globalRoutePriority: true,
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
