import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import {
    type CollectionEntry,
    type AnyEntryMap,
    getCollection,
    render,
    getEntry, type ContentEntryMap
} from 'astro:content';

export const langs = ["sr", "sr-lat", "en", undefined];

const fallbackLanguages = ["en", "sr-lat"];

export async function collectionIDs<T extends "vesti" | "akcije" | "afere" | "linkovi">(
  collection: T
): Promise<string[]> {
  const all =
    (await getCollection(collection))
      .map((collection) => collection.id.split('/')[1]);

  return [...new Set(all)];
}

export async function collection<T extends "vesti" | "akcije" | "afere">(
    collection: T,
    lang: string = "all"
): Promise<(CollectionEntry<T> & {lang: string})[]> {
    const ids = await collectionIDs(collection);
    const all = await Promise.all(ids.map(async id => await entry(collection, id, lang)));

    if (all.length > 0 && typeof all[0].data.pubDate !== "undefined") {
        return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
    }

    return all.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export async function entry<T extends "vesti" | "akcije" | "afere" | "linkovi">(
  collection: T,
  entry: string,
  lang: string = "sr"
): Promise<CollectionEntry<T> & {lang: string, id: string}> {
    let e = await getEntry(collection, `${lang}/${entry}`);

    for (let lang of fallbackLanguages) {
        if (!!e) { break; }

        e = await getEntry(collection, `${lang}/${entry}`);
    }

    const c = e as CollectionEntry<T>;
    return {...c, lang: c.id.split('/')[0], id: c.id.split('/')[1]};
}

export async function file<C extends keyof AnyEntryMap>(
    collection: C,
    lang: string = "all"
): Promise<{
    Content: AstroComponentFactory,
    frontmatter: Record<string, any>
}> {
    const post = (await getCollection(collection))
        .map(post => ({...post, lang: post.id.split('/')[0], id: post.id.split('/')[1]}))
        .filter(post => lang === post.lang)[0];

    const rendered = await render(post);
    return {
        Content: rendered.Content,
        frontmatter: rendered.remarkPluginFrontmatter
    }
}
