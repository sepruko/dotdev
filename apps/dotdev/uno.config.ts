import type { CSSValueInput, UserConfig as UnoUserConfig } from "@unocss/core";
import presetAttributify from "@unocss/preset-attributify";
import presetIcons from "@unocss/preset-icons";
import presetUno, { type Theme } from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

// cspell:words un

export default {
	preflights: [
		{
			layer: "preflights",
			getCSS: (): string =>
				`
				:root {
					@apply font-mono;
				}

				:where(*, ::before, ::after)[b*="dark:"],
				:where(*, ::before, ::after)[b-color*="dark:"],
				:where(*, ::before, ::after)[background-color*="dark:"],
				:where(*, ::before, ::after)[bg*="dark:"],
				:where(*, ::before, ::after)[border*="dark:"],
				:where(*, ::before, ::after)[border-color*="dark:"],
				:where(*, ::before, ::after)[c*="dark:"],
				:where(*, ::before, ::after)[color*="dark:"] {
					@apply t-[background-color,border-color,color]-825-ease;
				}

				/*
				:where(a) {
					@apply c-blue visited:(c-purple-6 dark:c-purple);
				}
				*/

				body {
					@apply m-0 h-vh overflow-x-hidden w-vw;
				}

				code,
				pre {
					@apply font-mono;
				}

				fieldset {
					@apply b-current;
				}

				summary {
					@apply after:([details>&]:content-[(click&#32;to&#32;expand)] [details[open]>&]:content-[(click&#32;to&#32;collapse)] c-raisinblack-200 m-l-2 text-size-0.8em);
				}
				`
					.trim()
					.replace(/^\t{4}/gm, ""),
		},
	],
	presets: [
		presetAttributify({
			nonValuedAttribute: false,
			strict: true,
		}),
		presetIcons({
			collections: {
				tabler: async (): Promise<any> =>
					import("@iconify-json/tabler/icons.json").then(({ default: d }) => d),
			},
			extraProperties: {
				"--at-apply": "inline-block size-min-8",
			} satisfies CSSValueInput,
			processor: (css): void => {
				css["--un-icon"] = (css["--un-icon"] as string).replace(/--[a-z-]+='[^']*'/g, "");
			},
			prefix: "icon-",
		}),
		presetUno({
			attributifyPseudo: true,
			dark: "media",
		}),
		presetWebFonts({
			fonts: {
				sans: "Gantari:100,400,700,900",
				mono: "JetBrains Mono:100,400,700,900",
			},
		}),
	],
	rules: [
		[
			/^content-?\[(.+)\]$/,
			function* ([, content]): Generator<string | CSSValueInput> {
				if (content!.match(/^".*"$/)) {
					content = content!.slice(1, -1);
				}

				yield {
					content: `"${content!.replace(/"/g, '\\"').replace(/&#(\d+);/g, (_, c) => String.fromCharCode(+c))}"`,
				};
			},
		],
		[
			/^(?:t|trans|transition)-?\[([a-z-,]+)\](?:-(\d+))?(?:-([a-z]+))?$/,
			function* ([, props, duration = "1000", ease = "linear"]): Generator<
				string | CSSValueInput
			> {
				switch (ease) {
					case "ease":
					case "linear": {
						break;
					}
					default: {
						ease = `ease-${ease}`;
					}
				}

				yield {
					transition: props!
						.split(",")
						.map((p) => `${p} ${+duration / 1000}s ${ease}`)
						.join(","),
				};
			},
		],
	],
	safelist: [
		'[icon="tabler-brand-bluesky"]',
		'[icon="tabler-brand-discord"]',
		'[icon="tabler-brand-github"]',
		'[icon="tabler-brand-steam"]',
		'[select="auto"]',
		'[select="none"]',
		'[sr-only="~"]',
	],
	shortcuts: [
		[
			/^(?:size-?)?(w|width|h|height)-?(min|max)-?(.+)$/,
			([, rule, limit, value]) => `${limit}-${rule![0]}-${value}`,
		],
	],
	theme: {
		colors: {},
		preflightBase: {
			"box-sizing": "border-box",
		} satisfies CSSValueInput,
	},
	transformers: [transformerDirectives(), transformerVariantGroup()],
} as UnoUserConfig<Theme>;
