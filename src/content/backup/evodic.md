\n\s*special: default

\s*- id: (.*)\n\s*title: (.*)\n\s*  text: \|-\n
\n</section>\n<section id="$1">\n## $2\n\n

\s*- id: (.*)\n\s*title: (.*)\n\s*  text: 
\n</section>\n<section id="$1">\n## $2\n\n

\s*- title: (.*)\n\s*  text: \|-\n
\n</section>\n<section>\n## $1\n\n

\s*- title: (.*)\n\s*  text: 
\n</section>\n<section>\n## $1\n\n

link_  text: (.*)\nlink: (.*)
<SectionLink link="$2" text="$1" />



const frontmatter = Astro.props.data;

const vesti_map = new Map();

await Promise.all(
  frontmatter.sections.map(async (s) => {
    if (s.special === "vest") {
      vesti_map.set(s.vest_id, await entry("vesti", s.vest_id, lang));
    }
  }),
);

const vesti = await collection("vesti", lang);
const live = vesti.filter((vest) => vest.data.live);

const map_data = await Promise.all(frontmatter.sections.map(async (section) => (
  section.map
    ? {
      ...section.map,
      markers: await Promise.all(
        section.map?.markers?.map(async (e) => ({
          ...e,
            text: await markdown(e.text),
        })) ?? [],
      ),
    }
    : null
)))
