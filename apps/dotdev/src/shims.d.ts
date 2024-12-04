/// <reference path="../.astro/types.d.ts" />

import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare module "@unocss/preset-attributify" {
	interface AttributifyAttributes {
		b?: string | boolean;
		bottom?: string | boolean;
		c?: string | boolean;
		decoration?: string | boolean;
		left?: string | boolean;
		right?: string | boolean;
		self?: string | boolean;
		t?: string | boolean;
		top?: string | boolean;
	}
}

declare global {
	declare namespace astroHTML.JSX {
		interface HTMLAttributes extends AttributifyAttributes {}
	}

	/**
	 * The type for the {@linkcode DotDev} global object.
	 */
	declare interface DotDevGlobal {
		/**
		 * The copyright document for the website.
		 */
		copyright: DotDevCopyright;

		/**
		 * An entity that has control over the website.
		 */
		entity: DotDevEntity;

		/**
		 * A list of links that will be displayed in the website's
		 * navigation.
		 *
		 * @see {@linkcode DotDevGlobal.DotDevNavLinksItem}
		 */
		// biome-ignore lint/style/useNamingConvention: Match schema.
		nav_links: DotDevNavLinks;

		/**
		 * A list of socials controlled by the website's owning entities.
		 *
		 * @see {@linkcode DotDevGlobal.DotDevSocialsItem}
		 */
		socials?: DotDevSocials;
	}

	/**
	 * The copyright document for the website.
	 */
	export declare interface DotDevCopyright {
		/**
		 * The identifying name of the legal document.
		 */
		name: string;

		/**
		 * A URI reference that leads to the legal document.
		 */
		link?: string;
	}

	/**
	 * An entity that has control over the website.
	 */
	export declare interface DotDevEntity {
		/**
		 * The name of the entity.
		 */
		name: string;

		/**
		 * The full name of the entity.
		 */
		// biome-ignore lint/style/useNamingConvention: Match schema.
		full_name: string;

		/**
		 * The pronouns used by the entity.
		 */
		pronouns: DotDevPronouns;

		/**
		 * A URI reference that leads to a WWW application controlled by the
		 * entity.
		 */
		link?: string;
	}

	export declare interface DotDevPronouns {
		/**
		 * The pronoun used for showing association.
		 */
		associative: string;

		/**
		 * The pronoun used for referring to the entity as the object.
		 */
		object: string;

		/**
		 * The pronoun used for referring to the entity as the object doing unto itself.
		 */
		// biome-ignore lint/style/useNamingConvention: Match schema.
		object_self: string;

		/**
		 * The pronoun used for showing possession.
		 */
		possessive: string;

		/**
		 * The pronoun used for referring to the entity.
		 */
		reference: string;
	}

	/**
	 * A list of links that will be displayed in the website's
	 * navigation.
	 *
	 * @see {@linkcode DotDevGlobal.DotDevNavLinksItem}
	 */
	export declare type DotDevNavLinks = DotDevNavLinksItem[];

	/**
	 * An item that may be used in the
	 * {@link DotDevNavLinks navigation links list}.
	 */
	export declare interface DotDevNavLinksItem {
		/**
		 * The title of the navigation element.
		 */
		name: string;

		/**
		 * A URI reference that leads to either a same or cross-origin
		 * resource.
		 */
		link: string;
	}

	/**
	 * A list of socials controlled by the website's owning entities.
	 *
	 * @see {@linkcode DotDevGlobal.DotDevSocialsItem}
	 */
	export declare type DotDevSocials = DotDevSocialsItem[];

	/**
	 * A union of `string` types that satisfy all known social platforms.
	 *
	 * @see {@linkcode DotDevKnownSocialsItem}, {@linkcode DotDevDiscordSocialItem}, {@linkcode DotDevSteamSocialItem}
	 */
	export declare type DotDevKnownSocialsItemPlatform =
		| "bluesky"
		| "discord"
		| "discord-server"
		| "github"
		| "ko-fi"
		| "steam";

	/**
	 * A generic social item type.
	 */
	export declare type DotDevSocialsItem<P extends string = string> =
		P extends DotDevKnownSocialsItemPlatform
			? P extends "bluesky" | "github" | "ko-fi"
				? DotDevKnownSocialsItem<P>
				: P extends "discord"
					? DotDevDiscordSocialItem
					: P extends "discord-server"
						? DotDevDiscordServerSocialItem
						: P extends "steam"
							? DotDevSteamSocialItem
							: never
			: DotDevBaseSocialsItem;

	/**
	 * The base of all social items, only used for unknown platforms.
	 *
	 * @see {@linkcode DotDevKnownSocialsItemPlatform}
	 */
	declare interface DotDevBaseSocialsItem<P extends string = string> {
		/**
		 * The name of the social platform.
		 */
		// biome-ignore lint/style/useNamingConvention: Match schema.
		platform_name: P;

		/**
		 * The name of the profile on the
		 * {@link platform_name social platform}.
		 */
		name: string;

		/**
		 * A link to the profile on the
		 * {@link platform_name social platform}.
		 */
		link: string;
	}

	/**
	 * A basic known item for any known social platforms.
	 *
	 * @see {@linkcode DotDevKnownSocialsItemPlatform}
	 */
	declare interface DotDevKnownSocialsItem<P extends DotDevKnownSocialsItemPlatform>
		extends Exclude<DotDevBaseSocialsItem<P>, "link"> {}

	/**
	 * A known item specifically for the `"discord"` platform.
	 *
	 * @see {@linkcode DotDevKnownSocialsItemPlatform}
	 */
	declare interface DotDevDiscordSocialItem
		extends Exclude<DotDevBaseSocialsItem<"discord">, "link"> {
		/**
		 * The unique identifier of the profile on the social platform.
		 */
		id: `${number}`;
	}

	/**
	 * A known item specifically for the `"discord-server"` platform.
	 *
	 * @see {@linkcode DotDevKnownSocialsItemPlatform}
	 */
	declare interface DotDevDiscordServerSocialItem extends DotDevDiscordSocialItem {
		/**
		 * An invite slug or custom string that allows people to enter the
		 * server.
		 */
		invite: string;
	}

	/**
	 * A known item specifically for the `"discord"` platform.
	 */
	declare interface DotDevSteamSocialItem
		extends Exclude<DotDevBaseSocialsItem<"steam">, "name" | "link"> {
		/**
		 * The ID of the profile on the social platform.
		 */
		id: string;
	}

	// biome-ignore lint/style/useNamingConvention: Match 'Astro' global.
	declare const DotDev: DotDevGlobal;
}

declare module "solid-js" {
	// biome-ignore lint/style/useNamingConvention: Not our symbol.
	declare namespace JSX {
		interface HTMLAttributes extends AttributifyAttributes {}
	}
}
