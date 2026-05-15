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

const icons = [
  { label: "Bez", value: "bez" },
  { label: "Sajt", icon: "web", value: "web" },
  { label: "Instagram", icon: "instagram", value: "instagram" },
  { label: "Twitter", icon: "twitter", value: "twitter" },
  { label: "Facebook", icon: "facebook", value: "facebook" },
  { label: "YouTube", icon: "youtube", value: "youtube" },
  { label: "Viber", icon: "viber", value: "viber" },
  {
    label: "Messenger",
    icon: "facebook-messenger",
    value: "facebook-messenger",
  },
  { label: "Reddit", icon: "reddit", value: "reddit" },
  { label: "TikTok", icon: "music-note", value: "music-note" },
  { label: "Vesti", icon: "newspaper", value: "newspaper" },
  { label: "Mejl", icon: "at", value: "at" },
  { label: "Donacije", icon: "hand-coin", value: "hand-coin" },
  { label: "Stikeri", icon: "sticker", value: "sticker" },
];

const vesti = folder_collection(
  "vesti",
  "Vesti",
  "newspaper",
  "src/content/vesti",
  [
    string_field("link", "Link").i18n("duplicate"),
    string_field("title", "Naslov"),
    bool_field("live", "Lajv"),
    string_field("live_embed", "Video ID").i18n("duplicate").required(false),
    datetime_field("pubDate", "Datum objavljivanja"),
    datetime_field("updatedDate", "Datum izmene").required(false),
    image_field("heroImage", "Glavna slika"),
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
        .required(false),
    ]).required(false),
    text_field("description", "Opis").required(false),
    markdown_field("body", "Tekst"),
    list_field("timeline", "Tajmlajn", [
      string_field("naslov", "Naslov"),
      datetime_field("datum", "Datum"),
      list_field("videos", "Video IDs", [string_field("id", "ID")])
        .singular("Video ID")
        .required(false),
      list_field("slike", "Slike", [image_field("slike", "Slike")])
        .singular("Slika")
        .required(false),
      markdown_field("tekst", "Tekst"),
    ])
      .add_to_top()
      .required(false)
      .i18n(false),
  ],
)
  .slug("{{fields.link}}")
  .sort_by("pubDate");

const akcije = folder_collection(
  "akcije",
  "Akcije",
  "timeline",
  "src/content/akcije",
  [
    string_field("link", "Link").i18n("duplicate"),
    string_field("title", "Naslov"),
    datetime_field("pubDate", "Datum akcije"),
    image_field("heroImage", "Glavna slika"),
    string_field("description", "Opis").required(false),
    markdown_field("body", "Tekst"),
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

const stranice = file_collection("stranice", "Stranice", "description", [
  file("pocetna", "Početna", "src/content/stranice", "početna.md", [
    string_field("naslov", "Naslov"),
    markdown_field("body", "Opis"),
    string_field("vesti", "Vesti"),
    markdown_field("vesti_tekst", "Vesti tekst"),
    string_field("vesti_dugme", "Vesti dugme"),
    string_field("akc", "AKC"),
    markdown_field("akc_tekst", "AKC tekst"),
    string_field("suss", "SUSS"),
    markdown_field("suss_tekst", "SUSS tekst"),
    string_field("suss_dugme", "SUSS dugme"),
    string_field("konkretizacije_zahteva", "Konkretizacijе zahteva"),
  ]),

  file("izbori", "Izbori", "src/content/stranice", "izbori.md", [
    string_field("title", "Naslov"),
    list_field("sections", "Sekcije", [
      string_field("id", "ID").required(false),
      string_field("title", "Naslov").required(false),
      string_field("link_text", "Link tekst").required(false),
      string_field("link", "Link").required(false),
      markdown_field("text", "Tekst").required(false),
    ]).singular("Sekcija"),
  ]),

  file("o_blokadama", "O Blokadama", "src/content/stranice", "o-blokadama.md", [
    string_field("title", "Naslov"),
    markdown_field("body", "Tekst"),
  ]),

  file("dijaspora", "Dijaspora", "src/content/stranice/", "/dijaspora.md", [
    string_field("title", "Naslov"),
    markdown_field("body", "Tekst"),
  ]),

  file("zahtevi", "Zahtevi", "src/content/stranice/", "zahtevi.md", [
    string_field("title", "Title"),
    string_field("naslov", "Naslov"),
    list_field("zahtevi", "Zahtevi", [
      string_field("original", "Originalni oblik"),
      markdown_field("konkretizacija", "Konkretizacija"),
    ]).singular("Zahtev"),
    markdown_field("body", "Tekst"),
  ]),

  file("not_found", "404", "src/content/stranice", "404.md", [
    markdown_field("body", "Tekst"),
  ]),

  file("zaglavlje", "Zaglavlje", "src/content/stranice", "zaglavlje.md", [
    string_field("naslov", "Naslov"),
    list_field("linkovi", "Linkovi", [
      string_field("naziv", "Naslov"),
      string_field("link", "Link").url(true),
    ]).singular("Link"),
  ]),

  file(
    "ostali_linkovi",
    "Ostali linkovi",
    "src/content/stranice",
    "ostali-linkovi.md",
    [
      string_field("ostali_linkovi", "Ostali linkovi"),
      string_field("najnovije_vesti", "Najnovije vesti"),
      list_field("linkovi", "Linkovi", [
        enum_field(
          "ikonica",
          "Ikonica",
          icons.map(({ value, label }) => [value, label]),
        ),
        string_field("naslov", "Naslov"),
        string_field("link", "Link").url(true),
      ]).singular("Link"),
    ],
  ),

  file("ostalo", "Ostalo", "src/content/stranice", "ostalo.md", [
    string_field("akcije", "Akcije"),
    string_field("vesti", "Vesti"),
    string_field("afere", "Afere"),
    string_field("notifikacije", "Uključi notifikacije"),
    string_field("kontakt", "Kontakt"),
    string_field("live", "Live"),
    string_field("studenti_u_blokadi", "Studenti u blokadi"),
    string_field("pojedinacni_fakulteti", "Kontakti pojedinačnih fakulteta"),
    string_field("pratite_live", "Pratite live"),
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
    list_field("linkovi", "Linkovi", [
      enum_field(
        "ikonica",
        "Ikonica",
        icons.map(({ value, label }) => [value, label]),
      ),
      string_field("naslov", "Naslov"),
      string_field("link", "Link").url(true),
    ])
      .singular("Link")
      .summary("{{naslov}}"),
  ],
);

export const all = all_collections([
  vesti,
  akcije,
  afere,
  divider(),
  stranice,
  linkovi,
]);
