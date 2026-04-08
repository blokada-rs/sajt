import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod'

const vesti = defineCollection({
	loader: glob({ base: './src/content/vesti', pattern: '**/*.(md|mdx)' }),
	schema: ({ image }) => z.object({
		link: z.string(),
		title: z.string(),
		description: z.string().optional(),
		live: z.boolean(),
		live_embed: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image(),
		timeline: z.object({
			naslov: z.string(),
			datum: z.coerce.date(),
			videos: z.string().array().optional(),
			slike: image().array().optional(),
			tekst: z.string().optional()
		}).array().optional(),
		map: z.object({
			coords_lat: z.number(),
			coords_long: z.number(),
			zoom: z.number(),
			markers: z.object({
				coords_lat: z.number(),
				coords_long: z.number(),
				text: z.string(),
			}).array().optional()
		}).optional(),
	}),
});

const akcije = defineCollection({
	loader: glob({ base: './src/content/akcije', pattern: '**/*.md' }),
	schema: ({ image }) => z.object({
		link: z.string(),
		title: z.string(),
		pubDate: z.coerce.date(),
		heroImage: image(),
	}),
});

const afere = defineCollection({
	loader: glob({ base: './src/content/afere', pattern: '**/*.md' }),
	schema: () => z.object({
		link: z.string(),
		title: z.string(),
	}),
});

const linkovi = defineCollection({
	loader: glob({ base: './src/content/linkovi', pattern: '**/*.md' }),
	schema: () => z.object({
		title: z.string(),
		link: z.string(),
		linkovi: z.object({
			ikonica: z.enum([
				"bez", "web", "instagram", "twitter", "at",
				"facebook", "youtube", "viber", "facebook-messenger",
				"music-note", "threads", "reddit", "newspaper", "hand-coin"
			]),
			naslov: z.string(),
			link: z.string(),
		}).array()
	}),
});

const pocetna = defineCollection({
	loader: glob({ base: './src/content/stranice', pattern: '**/početna.md' }),
	schema: () => z.object({
		naslov: z.string(),
		vesti: z.string(),
		vesti_tekst: z.string(),
		vesti_dugme: z.string(),
		akc: z.string(),
		akc_tekst: z.string(),
		suss: z.string(),
		suss_tekst: z.string(),
		suss_dugme: z.string(),
		konkretizacije_zahteva: z.string(),
	}),
});

const zahtevi = defineCollection({
	loader: glob({ base: './src/content/stranice', pattern: '**/zahtevi.md' }),
	schema: () => z.object({
		title: z.string(),
		naslov: z.string(),
		zahtevi: z.object({
			original: z.string(),
			konkretizacija: z.string(),
		}).array(),
	}),
});

const faq = defineCollection({
	loader: glob({ base: './src/content/stranice', pattern: '**/faq.md' }),
	schema: () => z.object({
		naslov: z.string(),
		pitanja: z.object({
			pitanje: z.string(),
			odgovor: z.string(),
		}).array()
	}),
});

const oblokadama = defineCollection({
	loader: glob({ base: './src/content/stranice', pattern: '**/o-blokadama.md' }),
	schema: () => z.object({
		title: z.string(),
	}),
});

const dijaspora = defineCollection({
	loader: glob({ base: './src/content/stranice', pattern: '**/dijaspora.md' }),
	schema: () => z.object({
		title: z.string(),
	}),
});

const zaglavlje = defineCollection({
	loader: glob({ base: './src/content/stranice', pattern: '**/zaglavlje.md' }),
	schema: () => z.object({
		naslov: z.string(),
		linkovi: z.object({
			naziv: z.string(),
			link: z.string(),
		}).array()
	}),
});

const ostalo = defineCollection({
	loader: glob({ base: './src/content/stranice', pattern: '**/ostalo.md' }),
	schema: () => z.object({
		akcije: z.string(),
		afere: z.string(),
		vesti: z.string(),
		notifikacije: z.string(),
		kontakt: z.string(),
		live: z.string(),
		pratite_live: z.string(),
		studenti_u_blokadi: z.string(),
		pojedinacni_fakulteti: z.string(),
	}),
});

export const collections = { vesti, akcije, afere, linkovi, pocetna, zahtevi, faq, oblokadama, dijaspora, zaglavlje, ostalo };
