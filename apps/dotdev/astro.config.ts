import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import unocss from "@unocss/astro";
import type { AstroUserConfig } from "astro/config";

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
		define: {},
	},
} as AstroUserConfig;
