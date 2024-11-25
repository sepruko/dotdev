import type { CSSValueInput, Preset as UnoPreset, UserConfig as UnoUserConfig } from "@unocss/core";
import presetAttributify from "@unocss/preset-attributify";
import presetIcons from "@unocss/preset-icons";
import presetUno, { type Theme } from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import { readFileSync } from "node:fs";

// cspell:words Fns ltrb un

export default {
	// Somehow UnoCSS or one of the transformers is incorrectly parsing the
	// source and finding this in there.
	blocklist: ["w-min-16-t="],
	preflights: [
		{
			layer: "preflights",
			getCSS: (): string =>
				`
				:root {
					@apply font-mono;
					--caret-color: theme('colors.carolinablue');
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

				sub, sup {
					position: relative;
					top: -0.4em;
					vertical-align: baseline;
				}

				sub {
					top: 0.4em;
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
		presetDotDev(),
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
				"--at-apply": "inline-block",
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
			/^animate-name-(.+)$/,
			function* ([, name], { theme }): Generator<string | CSSValueInput> {
				const keyframes = theme.animation?.keyframes?.[name!];
				if (keyframes) {
					yield `@keyframes ${name}${keyframes}`;
					yield { "animation-name": name };
				}
			},
		],
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
	safelist: ['[select~="auto"]', '[select~="none"]', '[sr-only~="~"]'],
	shortcuts: [
		[/^(?:c|color)-(?:bg|background)-(.+)$/, ([, value]) => `bg-${value}`],
		[
			/^flex-(center|end|start)(?:-(around|between|center|end|start))?$/,
			([, align, justify = align]) => `flex-items-${align} flex-justify-${justify}`,
		],
		[
			/^flex-(col|col-reverse|row|row-reverse)-(wrap|nowrap)$/,
			([, direction, wrap]) => `flex-${direction} flex-${wrap}`,
		],
		[
			/^(?:pos|position)-([ltrb])-(.+)$/,
			([, side, value]) => {
				switch (side) {
					case "l": {
						side = "left";
						break;
					}
					case "t": {
						side = "top";
						break;
					}
					case "r": {
						side = "right";
						break;
					}
					case "b": {
						side = "bottom";
						break;
					}
					default: // unreachable
				}

				return `position-${side}-${value}`;
			},
		],
		[
			/^(?:size-?)?(w|width|h|height)-?(min|max)-?(.+)$/,
			([, rule, limit, value]) => `${limit}-${rule![0]}-${value}`,
		],
	],
	theme: {
		animation: {
			counts: {
				caret: "infinite",
			},
			durations: {
				caret: "1.25s",
			},
			keyframes: {
				// biome-ignore lint/nursery/noSecrets: False positive.
				caret: "{from{color:transparent}50%{color:var(--caret-color)}to{color:transparent}}",
			},
			timingFns: {
				caret: "steps(1,end)",
			},
		},
		colors: {
			carolinablue: {
				DEFAULT: "#6DADD8",
			},
			isabelline: {
				DEFAULT: "#F2E9E4",
			},
			paledogwood: {
				DEFAULT: "#c9ada7",
			},
			richblack: {
				DEFAULT: "#11111e",
			},
			rosequartz: {
				DEFAULT: "#9a8c98",
			},
			seasalt: {
				DEFAULT: "#fcfaf9",
			},
			spacecadet: {
				DEFAULT: "#22223b",
			},
			ultraviolet: {
				DEFAULT: "#4a4e69",
			},
		},
		preflightBase: {
			"box-sizing": "border-box",
		} satisfies CSSValueInput,
	},
	transformers: [transformerDirectives(), transformerVariantGroup()],
} as UnoUserConfig<Theme>;

/**
 * The UnoCSS preset for registering and auto-updating the safelist for icons
 * that may be referenced by the `@sepruko/dotdev` project configuration.
 */
function presetDotDev(): UnoPreset<Theme> {
	return {
		name: "@sepruko/dotdev/preset-uno",
		configResolved: (options): void => {
			const config = new URL("dotdev.config.json", options.configFile || import.meta.url);

			options.configDeps ??= [];
			options.configDeps.push(`${config.pathname}`);
			// biome-ignore lint/style/useNamingConvention: Match global.
			const DotDev = JSON.parse(readFileSync(config, { encoding: "utf-8", flag: "a+" }));
			if (!Array.isArray(DotDev.socials)) {
				return;
			}

			const platforms = [
				...new Set(Object.values(DotDev.socials).map((s: any) => s.platform_name)),
			] as string[];

			options.safelist.push(
				...platforms
					.map((p) => p.replace(/-server$/, ""))
					.map((p) => {
						switch (p) {
							case "ko-fi": {
								p = "tabler-coffee";
								break;
							}
							default: {
								p = `tabler-brand-${p}`;
								break;
							}
						}

						return `[icon~="${p}"]`;
					}),
			);
		},
	};
}
