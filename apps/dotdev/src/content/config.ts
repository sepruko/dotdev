import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

const entity = defineCollection({
	loader: glob({ base: "./src/content/entity/", pattern: "**/*.mdx?" }),
});

export const collections = { entity };
