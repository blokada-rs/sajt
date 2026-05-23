import { type ZodCollection } from "@scripts/content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import { all } from "scripts/collections";

const make_zod = (all: ZodCollection[]) => {
  const collections: { [name: string]: any } = {};
  all.forEach(({ name, base, pattern, schema }) => {
    collections[name] = defineCollection({
      loader: glob({ base, pattern }),
      schema,
    });
  });

  return collections;
};

export const collections = {
  ...make_zod(all.make_zod()),
  slavija_23_5: defineCollection({
    loader: glob({
      base: "./src/content/vesti",
      pattern: "**/slavija_23_5.md",
    }),
    schema: () =>
      z.object({
        timeline: z.object().array().optional(),
      }),
  }),
};
