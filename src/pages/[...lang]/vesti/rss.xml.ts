import rss from "@astrojs/rss";
import { collection, langs } from "@scripts/i18n";
import type { APIRoute } from "astro";
import { SITE_DESCRIPTION, SITE_TITLE } from "../../../consts";

export async function getStaticPaths() {
  return langs.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const posts = await collection("vesti", params.lang);
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: site ?? "",
    items: posts.map((post) => ({
      ...post.data,
      link: `/${post.lang}/vesti/${post.id}/`,
    })),
  });
};
