# Treningsplan

Enkel PWA-treningsplan. Du bygger uka di selv fra en øvelsesbank: velg hvilke
dager som skal ha økt, hvilke øvelser som skal inngå, hvor mye av hver og hvor
mange runder. Trykk "Fikk ikke trent i dag" for å flytte dagens gjenstående
øvelser til neste dag.

Standardoppsettet er lørdag styrke i 2 runder og søndag 4 km løping. Alt kan
endres under fanen "Plan".

## Bruk
- **I dag** — dagens økt, avhuking, og de neste planlagte dagene
- **Plan** — sett opp hver ukedag: legg til øvelser fra banken eller egne,
  juster mengde og antall runder, eller gjør dagen til hviledag

Øvelsesbanken dekker bein, overkropp, kjerne og kondisjon. Finner du ikke
øvelsen, legg den til som egen øvelse nederst i velgeren.

Endringer i planen slår inn på kommende dager med det samme. Dager du allerede
har huket av på, hoppet over, eller flyttet øvelser til, blir stående urørt.

## Filer
- `index.html` — selve appen (bruker localStorage, ingen backend nødvendig)
- `manifest.json` — gjør appen installerbar på hjemskjermen
- `sw.js` — service worker for offline-bruk
- `icon-192.png` / `icon-512.png` — app-ikoner

Lagring skjer i to nøkler: `workout-plan-v1` (planen) og `workout-schedule-v1`
(framgang per dato).

## Publisere på GitHub Pages
1. Push disse filene til et repo (rot-mappen, eller en `docs/`-mappe)
2. Settings → Pages → velg branch og mappe → Save
3. Åpne den utgitte URL-en på mobil → del-ikon → "Legg til på Hjem-skjerm"
