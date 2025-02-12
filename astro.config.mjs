// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import markdownIntegration from '@astropub/md'

// https://astro.build/config
export default defineConfig({
	site: 'https://blokade.org',
	integrations: [mdx(), sitemap(), markdownIntegration()],
});
