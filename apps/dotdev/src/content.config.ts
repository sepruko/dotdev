import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const entity = defineCollection({
	loader: glob({ base: "./src/data/entity/", pattern: "**/*" }),
	schema: z.object({}),
});

export const collections = { entity };
