# Zvanični veb sajt studenata u blokadi u Beogradu

Ovo je izvorni kod sajta [blokade.org](https://blokade.org/) kao i sadržaj (vesti, akcije itd.) koji je prikazan na sajtu.
Sajt koji je dostupan na [blokade.org](https://blokade.org/) pravi generator statičkih stranica [Astro](https://astro.build/) na osnovu layout-a koji je ovde definisan i sadržaja koji se nalazi u src/content. Tako generisane stranice su potpuno statičke i hostuje ih [Netlify](https://www.netlify.com/).

## Kako mogu da pomognem?

### Za pisanje sadržaja

Potrebno je da napravite Github nalog i da se obratite nekome ko održava sajt kako bi taj nalog bio dodat sa odgovarajućim pravima pristupa.
Da pristupite samom interfejsu uđite na [blokade.org/admin](https://blokade.org/admin/).
Kada napravite neku izmenu biće potrebno da je neko od administratora proveri i odobri.

## Kako da pokrenem stranicu lokalno?

1. Klonirajte projekat sa ovog repozitorijuma

   ```
   git clone https://git.blokade.org/blokade-org/sajt`
   ```

2. Instalirajte sve neophodne Node module

   U kloniranom repozitorijumu pokrenite:

   ```
   pnpm install
   ```

3. Pokrenite development server lokalno
   ```
   pnpm run dev
   ```
   Sada ćete moći da pristupite stranici lokalno (najverovatnije na localhost:4321) - proverite terminal za tačan port

## Struktura projekta

- **Sadržaj** koji se koristi pri generisanju stranica nalazi se u src/content/NAZIV STRANICE/JEZIK/NAZIV.md
- **Layout** stranica se nalazi u src/pages/\[lang\], komponente koje se koriste na više mesta su u src/components
