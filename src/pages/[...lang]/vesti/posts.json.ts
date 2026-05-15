import { collection, langs } from "@scripts/i18n";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  return langs.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const posts = await collection("vesti", params.lang);
  return Response.json(
    posts.map((post) => ({
      title: post.data.title,
      body: post.body,
      pubDate: post.data.pubDate.toISOString(),
      url: `/${post.lang}/vesti/${post.id}/`,
    })),
  );
};
