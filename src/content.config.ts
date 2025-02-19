import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const vesti = defineCollection({
	// Load Markdown and MDX files in the `src/content/vesti/` directory.
	loader: glob({ base: './src/content/vesti', pattern: '**/*.md' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image(),
		draft: z.boolean().optional()
	}),
});

const akcije = defineCollection({
	// Load Markdown and MDX files in the `src/content/akcije/` directory.
	loader: glob({ base: './src/content/akcije', pattern: '**/*.md' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		heroImage: image(),
		draft: z.boolean().optional()
	}),
});

const pocetna = defineCollection({
	// Load Markdown and MDX files in the `src/content/akcije/` directory.
	loader: glob({ base: './src/content/stranice', pattern: '**/početna.md' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({}),
});

const zahtevi = defineCollection({
	// Load Markdown and MDX files in the `src/content/akcije/` directory.
	loader: glob({ base: './src/content/stranice', pattern: '**/zahtevi.md' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({}),
});

const oblokadama = defineCollection({
	// Load Markdown and MDX files in the `src/content/akcije/` directory.
	loader: glob({ base: './src/content/stranice', pattern: '**/o-blokadama.md' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({}),
});

const zaglavlje = defineCollection({
	// Load Markdown and MDX files in the `src/content/akcije/` directory.
	loader: glob({ base: './src/content/stranice', pattern: '**/zaglavlje.md' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({
		naslov: z.string(),
		linkovi: z.object({
			naziv: z.string(),
			link: z.string()
		}).array()
	}),
});

const pitanja = defineCollection({
	// Load Markdown and MDX files in the `src/content/akcije/` directory.
	loader: glob({ base: './src/content/stranice', pattern: '**/pitanja.md' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({
		naslov: z.string(),
		pitanjaOdgovori: z.object({
			pitanje: z.string(),
			odgovor: z.string()
		}).array()
	}),
});

const ostalo = defineCollection({
	// Load Markdown and MDX files in the `src/content/akcije/` directory.
	loader: glob({ base: './src/content/stranice', pattern: '**/ostalo.md' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({
		naslov: z.string(),
		kontakt: z.string(),
		studenti_u_blokadi: z.string(),
		pojedinacni_fakulteti: z.string(),
	}),
});

export const collections = { vesti, akcije, pocetna, zahtevi, oblokadama, zaglavlje, pitanja, ostalo };
