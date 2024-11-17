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
					@apply font-mono;
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
	theme: {
		preflightBase: {
			"box-sizing": "border-box",
		} satisfies CSSValueInput,
	},
	transformers: [transformerDirectives(), transformerVariantGroup({ separators: [":"] })],
} as UnoUserConfig<Theme>;
