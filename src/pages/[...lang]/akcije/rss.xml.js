import rss from "@astrojs/rss";
import { collection, langs } from "@scripts/i18n";
import { SITE_DESCRIPTION, SITE_TITLE } from "../../../consts";

export async function getStaticPaths() {
  return langs.map((lang) => ({ params: { lang } }));
}

export async function GET({ params, site }) {
  const posts = await collection("akcije", params.lang);
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/${post.lang}/akcije/${post.id}/`,
    })),
  });
}
