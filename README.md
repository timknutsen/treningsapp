# Treningsplan

Enkel PWA-treningsplan. Appen starter tom: dere bygger uka selv fra en
øvelsesbank. Velg hvilke dager som skal ha økt, hvilke øvelser som skal
inngå, hvor mye av hver og hvor mange runder. Trykk "Fikk ikke trent i dag"
for å flytte dagens gjenstående øvelser til neste dag.

## Bruk
- **I dag** — dagens økt, avhuking, og de neste planlagte dagene. Før uka er
  satt opp vises en kort veiledning i stedet
- **Plan** — sett opp hver ukedag: legg til øvelser fra banken eller egne,
  juster mengde og antall runder, eller gjør dagen til hviledag
- **Logg** — rekke av fullførte økter, rekord og totaler, og en månedskalender
  der hver dag er fargelagt etter hvordan den gikk. Trykk på en dag for å se
  hvilke øvelser som ble gjort

Øvelser med tid i seg, som `60 sek` eller `5 min`, får en oransje mengde-brikke.
Trykk på den for å starte nedtelling rett i raden, med −15 / +15, pause og
stopp. Timeren piper de tre siste sekundene, huker av øvelsen når den er ferdig,
og holder skjermen våken mens den går. Reps og distanser (`20 stk`, `4 km`) har
ingen timer.

Øvelsesbanken dekker bein, overkropp, kjerne og kondisjon. Finner du ikke
øvelsen, legg den til som egen øvelse nederst i velgeren.

Økter som glapp dukker opp som **etterslep** øverst på I dag-fanen, i inntil
to uker bakover. Der kan de enten hentes inn i dagens økt eller strykes.
Strøkne dager står fortsatt som ikke trent i loggen.

Rekka teller fullførte økter etter hverandre. Hviledager bryter den ikke, og
dagens økt teller først når den er huket av, så du taper ikke rekka på å trene
om kvelden.

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
