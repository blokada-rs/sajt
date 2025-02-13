import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const vesti = defineCollection({
	// Load Markdown and MDX files in the `src/content/vesti/` directory.
	loader: glob({ base: './src/content/vesti', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		draft: z.boolean().optional()
	}),
});

const akcije = defineCollection({
	// Load Markdown and MDX files in the `src/content/akcije/` directory.
	loader: glob({ base: './src/content/akcije', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		heroImage: image().optional(),
		draft: z.boolean().optional()
	}),
});

const donacije = defineCollection({
	// Load Markdown and MDX files in the `src/content/donacije/` directory.
	loader: glob({ base: './src/content/donacije', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		fakultet: z.string(),
		koordinate: z.array(z.number()).length(2).optional(),
		namirnice: z.array(z.object({
			naziv: z.string(),
			prioritet: z.enum(["visok", "srednji", "nizak"]),
			opis: z.string().optional(),
		})).optional(),
	}),
});

export const collections = { vesti, akcije, donacije };
