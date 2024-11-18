import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare module "@unocss/preset-attributify" {
	interface AttributifyAttributes {
		b?: string | boolean;
		c?: string | boolean;
		self?: string | boolean;
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
		copyright: DotDevGlobal.Copyright;

		/**
		 * An entity that has control over the website.
		 */
		entity: DotDevGlobal.Entity;

		/**
		 * A list of links that will be displayed in the website's
		 * navigation.
		 *
		 * @see {@linkcode DotDevGlobal.NavLinksItem}
		 */
		// biome-ignore lint/style/useNamingConvention: Match schema.
		nav_links: DotDevGlobal.NavLinks;

		/**
		 * A list of socials controlled by the website's owning entities.
		 *
		 * @see {@linkcode DotDevGlobal.SocialsItem}
		 */
		socials?: DotDevGlobal.Socials;
	}

	declare namespace DotDevGlobal {
		/**
		 * The copyright document for the website.
		 */
		export declare interface Copyright {
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
		export declare interface Entity {
			/**
			 * The name of the entity.
			 */
			name: string;

			/**
			 * A URI reference that leads to a WWW application controlled by the
			 * entity.
			 */
			link?: string;
		}

		/**
		 * A list of links that will be displayed in the website's
		 * navigation.
		 *
		 * @see {@linkcode DotDevGlobal.NavLinksItem}
		 */
		export declare type NavLinks = NavLinksItem[];

		/**
		 * An item that may be used in the
		 * {@link NavLinks navigation links list}.
		 */
		export declare interface NavLinksItem {
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
		 * @see {@linkcode DotDevGlobal.SocialsItem}
		 */
		export declare type Socials = SocialsItem[];

		/**
		 * A union of `string` types that satisfy all known social platforms.
		 *
		 * @see {@linkcode KnownSocialsItem}, {@linkcode DiscordSocialItem}, {@linkcode SteamSocialItem}
		 */
		export declare type KnownSocialsItemPlatform = "bluesky" | "discord" | "github" | "steam";

		/**
		 * A generic social item type.
		 */
		export declare type SocialsItem<P extends string = string> =
			P extends KnownSocialsItemPlatform
				? P extends "bluesky" | "github"
					? KnownSocialsItem
					: P extends "discord"
						? DiscordSocialItem
						: P extends "steam"
							? SteamSocialItem
							: never
				: BaseSocialsItem;

		/**
		 * The base of all social items, only used for unknown platforms.
		 *
		 * @see {@linkcode KnownSocialsItemPlatform}
		 */
		declare interface BaseSocialsItem<P extends string = string> {
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
		 * @see {@linkcode KnownSocialsItemPlatform}
		 */
		declare interface KnownSocialsItem
			extends Exclude<BaseSocialsItem<"bluesky" | "github">, "link"> {}

		/**
		 * A known item specifically for the `"discord"` platform.
		 *
		 * @see {@linkcode KnownSocialsItemPlatform}
		 */
		declare interface DiscordSocialItem extends Exclude<BaseSocialsItem<"discord">, "link"> {
			/**
			 * The unique identifier of the profile on the social platform.
			 */
			id: `${number}`;
		}

		/**
		 * A known item specifically for the `"discord"` platform.
		 */
		declare interface SteamSocialItem
			extends Exclude<BaseSocialsItem<"steam">, "name" | "link"> {
			/**
			 * The ID of the profile on the social platform.
			 */
			id: string;
		}
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
