import {
  all_collections,
  bool_field,
  datetime_field,
  divider,
  enum_field,
  file,
  file_collection,
  folder_collection,
  image_field,
  list_field,
  markdown_field,
  number_field,
  object_field,
  string_field,
  text_field,
} from "@scripts/content.ts";

type Icon = {
  label: string;
  icon?: string;
  value: string;
};

export const socials: Icon[] = [
  { label: "Sajt", icon: "mdi:web", value: "web" },
  { label: "Instagram", icon: "simple-icons:instagram", value: "instagram" },
  { label: "Twitter", icon: "simple-icons:twitter", value: "twitter" },
  { label: "Facebook", icon: "simple-icons:facebook", value: "facebook" },
  { label: "YouTube", icon: "simple-icons:youtube", value: "youtube" },
  { label: "TikTok", icon: "simple-icons:tiktok", value: "tiktok" },
  { label: "Viber", icon: "simple-icons:viber", value: "viber" },
  { label: "Messenger", icon: "simple-icons:messenger", value: "messenger" },
  { label: "Reddit", icon: "simple-icons:reddit", value: "reddit" },
  { label: "WhatsApp", icon: "simple-icons:whatsapp", value: "whatsapp" },
  { label: "Telegram", icon: "simple-icons:telegram", value: "telegram" },
  { label: "Threads", icon: "simple-icons:threads", value: "threads" },
  { label: "Mejl", icon: "mdi:at", value: "mail" },
];

export const others: Icon[] = [
  { label: "Bez", value: "bez" },
  { label: "Vesti", icon: "mdi:newspaper", value: "news" },
  { label: "Donacije", icon: "mdi:hand-coin", value: "donations" },
  { label: "Stikeri", icon: "mdi:sticker", value: "sticker" },
];

export const icons = [
  ...others,
  ...socials,
  ...socials.map((icon) => ({
    ...icon,
    label: `${icon.label} bitno`,
    value: `${icon.value}-bitno`,
  })),
];

export const type = {
  ot: { sort: -1 },
  ub: { sort: 0 },
  uu: { sort: 1 },
  visa: { sort: 2 },
  privatni: { sort: 3 },
};

export const map = () =>
  object_field("map", "Mapa", [
    number_field("coords_lat", "Geografska širina").default(44.8118),
    number_field("coords_long", "Geografska dužina").default(20.4659),
    number_field("zoom", "Zoom").default(12).type("int"),
    list_field("markers", "Markeri", [
      number_field("coords_lat", "Geografska širina"),
      number_field("coords_long", "Geografska dužina"),
      markdown_field("text", "Tekst"),
    ])
      .singular("Marker")
      .optional(),
  ]);

const vesti = folder_collection(
  "vesti",
  "Vesti",
  "newspaper",
  "src/content/vesti",
  [
    string_field("link", "Link").i18n("duplicate"),
    string_field("title", "Naslov"),
    bool_field("live", "Lajv"),
    string_field("live_embed", "Video ID").i18n("duplicate").optional(),
    datetime_field("pubDate", "Datum objavljivanja"),
    datetime_field("updatedDate", "Datum izmene").optional(),
    image_field("heroImage", "Glavna slika"),
    map().optional(),
    text_field("description", "Opis").optional(),
    markdown_field("body", "Tekst"),
    list_field("timeline", "Tajmlajn", [
      string_field("naslov", "Naslov"),
      datetime_field("datum", "Datum"),
      list_field("videos", "Video IDs", [string_field("id", "ID")])
        .singular("Video ID")
        .optional(),
      list_field("slike", "Slike", [image_field("slike", "Slike")])
        .singular("Slika")
        .optional(),
      markdown_field("tekst", "Tekst").optional(),
    ])
      .add_to_top()
      .optional()
      .i18n(false),
  ],
)
  .slug("{{fields.link}}")
  .sort_by("pubDate");

const afere = folder_collection(
  "afere",
  "Afere",
  "priority_high",
  "src/content/afere",
  [
    string_field("link", "Link").i18n("duplicate"),
    string_field("title", "Naslov"),
    markdown_field("body", "Tekst"),
  ],
).slug("{{fields.link}}");

const link_list = () =>
  list_field("linkovi", "Linkovi", [
    enum_field(
      "type",
      "Tip",
      icons.map(({ value, label }) => [value, label]),
    ),
    string_field("naslov", "Naslov"),
    string_field("link", "Link").url(true),
  ])
    .singular("Link")
    .summary("{{naslov}}");

const specijalne_stranice = folder_collection(
  "specijalne_stranice",
  "Specijalne stranice",
  "priority_high",
  "src/content/specijalne_stranice",
  [
    string_field("link", "Link"),
    string_field("class", "CSS class (trenutno samo suss)").optional(),
    image_field("heroImage", "Glavna slika").optional(),
    string_field("title", "Naslov"),
    text_field("description", "Opis"),
    markdown_field("body", "Body"),
  ],
  "**/*.{md,mdx}",
  "mdx",
).slug("{{fields.link}}");

const stranice = file_collection("stranice", "Stranice", "description", [
  file("not_found", "404", "src/content/stranice", "404.md", [
    text_field("description", "Opis"),
    markdown_field("body", "Tekst"),
  ]),

  file("zaglavlje", "Zaglavlje", "src/content/stranice", "zaglavlje.md", [
    string_field("naslov", "Naslov"),
    list_field("linkovi", "Linkovi", [
      string_field("naziv", "Naslov"),
      string_field("link", "Link"),
    ]).singular("Link"),
  ]),

  file(
    "ostali_linkovi",
    "Ostali linkovi",
    "src/content/stranice",
    "ostali-linkovi.md",
    [
      string_field("ostali_linkovi", "Ostali linkovi"),
      text_field("description", "Opis"),
      string_field("najnovije_vesti", "Najnovije vesti"),
      link_list(),
    ],
  ),

  file("ostalo", "Ostalo", "src/content/stranice", "ostalo.md", [
    string_field("akcije", "Akcije"),
    string_field("vesti", "Vesti"),
    string_field("afere", "Afere"),
    string_field("notifikacije", "Uključi notifikacije"),
    string_field("kontakt", "Kontakt"),
    markdown_field("kontakt_opis", "Kontakt - opis"),
    string_field("live", "Live"),
    string_field("studenti_u_blokadi", "Studenti u blokadi"),
    string_field("pojedinacni_fakulteti", "Kontakti pojedinačnih fakulteta"),
    string_field("pratite_live", "Pratite live"),
    markdown_field("vesti_opis", "Vesti - opis"),
    string_field("najnovija_vest", "Najnovija vest"),
    text_field("afere_description", "Afere opis"),
    text_field("vesti_description", "Vesti opis"),
    text_field("kontakt_description", "Kontakt opis"),
  ]),
]);

const linkovi = folder_collection(
  "linkovi",
  "Linkovi",
  "link",
  "src/content/linkovi",
  [
    string_field("title", "Naslov"),
    string_field("link", "Link"),
    string_field("prikaz", "Prikaz").optional(),
    enum_field(
      "type",
      "Tip",
      Object.keys(type).map((e) => [e, e]),
    ).optional(),
    link_list(),
  ],
);

export const all = all_collections([
  vesti,
  afere,
  divider(),
  stranice,
  specijalne_stranice,
  linkovi,
]);
