import type { CSSValueInput, UserConfig as UnoUserConfig } from "@unocss/core";
import presetAttributify from "@unocss/preset-attributify";
import presetIcons from "@unocss/preset-icons";
import presetUno, { type Theme } from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default {
	preflights: [
		{
			layer: "preflights",
			getCSS: (): string =>
				`
				:root {
					@apply font-sans;
				}

				:where(*, ::before, ::after)[background-color*="dark:"],
				:where(*, ::before, ::after)[bg*="dark:"],
				:where(*, ::before, ::after)[border*="dark:"],
				:where(*, ::before, ::after)[c*="dark:"],
				:where(*, ::before, ::after)[color*="dark:"] {
					transition:
						background-color 825ms ease,
						border-color 825ms ease,
						color 825ms ease
				}

				:where(a) {
					@apply c-blue visited:(c-purple dark:c-purple-6);
				}

				body {
					@apply m-0 h-vh overflow-x-hidden w-vw;
				}

				code,
				pre {
					@apply font-mono
				}

				details:not(:has(> summary)) {
					@apply c-red;
				}

				fieldset {
					@apply b-current rd-1;
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
				"--at-apply": '"inline-block size-min-8"',
			} satisfies CSSValueInput,
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
	],
	shortcuts: [
		[
			/^(?:size-?)?(w|width|h|height)-?(min|max)-?(.+)$/,
			([, rule, limit, value]) => `${limit}-${rule![0]}-${value}`,
		],
	],
	theme: {
		colors: {
			moonstone: {
				50: "#edf2f3",
				100: "#dbe5e7",
				200: "#b6cbce",
				300: "#91b1b6",
				400: "#6c969d",
				500: "#5f848a",
				600: "#445e63",
				700: "#364b4f",
				800: "#29393c",
				900: "#0e1314",
				950: "#070a0a",
				DEFAULT: "#6c969d",
			},
			raisinblack: {
				50: "#e3e3e4",
				100: "#c6c6c8",
				200: "#8c8c91",
				300: "#53535a",
				400: "#191923",
				500: "#16161f",
				600: "#101017",
				700: "#0d0d12",
				800: "#070709",
				900: "#040405",
				950: "#020203",
				DEFAULT: "#191923",
			},
			sandybrown: {
				50: "#fef3e9",
				100: "#fde7d3",
				200: "#facfa6",
				300: "#91b1b6",
				400: "#f49e4c",
				500: "#d68b43",
				600: "#996330",
				700: "#7a4f26",
				800: "#4d3218",
				900: "#27190c",
				950: "#140d06",
				DEFAULT: "#f49e4c",
			},
		},
		preflightBase: {
			"box-sizing": "border-box",
		} satisfies CSSValueInput,
	},
	transformers: [transformerDirectives(), transformerVariantGroup()],
} as UnoUserConfig<Theme>;
