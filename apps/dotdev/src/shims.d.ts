import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare module "@unocss/preset-attributify" {
	interface AttributifyAttributes {
		b?: string | boolean;
		c?: string | boolean;
		self?: string | boolean;
	}
}

declare global {
	namespace astroHTML.JSX {
		interface HTMLAttributes extends AttributifyAttributes {}
	}
}

declare module "solid-js" {
	// biome-ignore lint/style/useNamingConvention: Not our symbol.
	namespace JSX {
		interface HTMLAttributes extends AttributifyAttributes {}
	}
}
