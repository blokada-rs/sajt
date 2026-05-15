# Zvanični veb sajt studenata u blokadi u Beogradu

Ovo je izvorni kod sajta [blokade.org](https://blokade.org/) kao i sadržaj (vesti, akcije itd.) koji je prikazan na sajtu.
Sajt koji je dostupan na [blokade.org](https://blokade.org/) pravi generator statičkih stranica [Astro](https://astro.build/) na osnovu layout-a koji je ovde definisan i sadržaja koji se nalazi u src/content. Tako generisane stranice su potpuno statičke i hostuje ih [Netlify](https://www.netlify.com/).

## Kako mogu da pomognem?

### Za pisanje sadržaja

Potrebno je da napravite Github nalog i da se obratite nekome ko održava sajt kako bi taj nalog bio dodat sa odgovarajućim pravima pristupa.
Da pristupite samom interfejsu uđite na [blokade.org/admin](https://blokade.org/admin/).
Kada napravite neku izmenu biće potrebno da je neko od administratora proveri i odobri.

### Za tehničku implementaciju

Pogledajte šta je otvoreno i nije preuzeto u [Issues](https://github.com/blokada-rs/sajt/issues) <br>
Ukoliko nemate write permission za ovaj repozitorijum moraćete da ga forkujete i da radite na svom forku.
Kada mislite da ste rešili određeni problem ili implementirali nešto novo napravite pull request na master granu ili po dogovoru na neku drugu granu ovog projekta.
Neko od nas će pregledati vaše izmene i spojiti ih u master granu.

## Kako da pokrenem stranicu lokalno?

1. Instalirajte [Node.js](https://nodejs.org/en)

   Za Linux: `sudo apt install nodejs`

2. Klonirajte projekat sa ovog repozitorijuma

   `git clone https://github.com/blokada-rs/sajt.git`

3. Instalirajte sve neophodne Node module

   U kloniranom repozitorijumu pokrenite `npm install`

4. Pokrenite development build lokalno

   `npm run dev`

   Sada ćete moći da pristupite stranici lokalno (najverovatnije na localhost:4321) - proverite terminal za tačan port

## Struktura projekta

**Sadržaj** koji se koristi pri generisanju stranica nalazi se u src/content/NAZIV STRANICE/JEZIK/NAZIV.md

**Layout** stranica se nalazi u src/pages/\[lang\], komponente koje se koriste na više mesta su u src/components
