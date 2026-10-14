# Trening

Enkel PWA-treningsplan for mobil, i samme stil som Ukeoppgaver-appen:
ukestripe med flamme, store avkrysningskort, faner nederst, lyd og feiring.
Appen starter tom: du bygger uka selv fra en øvelsesbank.

## Bruk
- **Trening** — øverst teller flammen hvor mange økter du har fullført på
  rad. Under ligger ukestripa (man–søn): fullførte dager blir en gyllen
  stolpe, og nabodager smelter sammen. Hviledager mellom to fullførte dager
  blir med i stolpen, siden de ikke bryter rekka. Ringen oppe til høyre viser
  økter fullført av planlagt denne uka. Trykk på en dag i stripa for å se
  økta. Dager bak i uka kan hukes av i etterkant, kommende dager vises bare
- **Plan** — velg en ukedag, legg til øvelser fra banken (eller en egen),
  juster mengde og antall runder. Tomme dager er hviledager
- **Logg** — antall økter, rekke, rekord og en månedskalender. Trykk på en
  dag for å se hva som ble gjort

Når alle øvelsene for en dag er huket av, kommer et feiringsark med konfetti
og rekka di. Er alle ukas økter gjort, blir hele stripa en skimrende stolpe,
stjerna på søndag fylles, og feiringen blir «Perfekt uke!».

Øvelser med tid i seg, som `60 sek` eller `5 min`, får en blå ▶-brikke.
Trykk på den for å starte nedtelling under øvelsen, med −15 / +15, pause og
stopp. Timeren piper de tre siste sekundene, huker av øvelsen når den er
ferdig, og holder skjermen våken mens den går. Reps og distanser (`20 stk`,
`4 km`) har ingen timer.

Fikk du ikke trent, kan du trykke «Flytt resten til i morgen» under dagens
økt. Rekka teller fullførte økter etter hverandre: hviledager bryter den
ikke, og dagens økt teller først når den er huket av.

Avhuking gir et lite «pling», og fullført økt gir en fanfare. Høyttaleren
nederst skrur lyden av og på (`treningsplan.lyd.v1`). Appen følger mørk/lys
modus på telefonen, og animasjoner slås av under `prefers-reduced-motion`.

Endringer i planen slår inn på kommende dager med det samme. Dager du allerede
har huket av på, hoppet over, eller flyttet øvelser til, blir stående urørt.

## Filer
- `index.html` — selve appen (bruker localStorage, ingen backend nødvendig)
- `manifest.json` — gjør appen installerbar på hjemskjermen
- `sw.js` — service worker for offline-bruk
- `icon-192.png` / `icon-512.png` — app-ikoner

Lagring skjer i to nøkler: `workout-plan-v2` (planen) og `workout-schedule-v2`
(framgang per dato).

## Publisere på GitHub Pages
1. Push disse filene til et repo (rot-mappen, eller en `docs/`-mappe)
2. Settings → Pages → velg branch og mappe → Save
3. Åpne den utgitte URL-en på mobil → del-ikon → "Legg til på Hjem-skjerm"
