# Trening

Enkel PWA-treningsplan for mobil, i samme stil som Ukeoppgaver-appen:
ukestripe med flamme, store avkrysningskort, faner nederst, lyd og feiring.
Uka bygges fra en øvelsesbank. Første gang en konto tas i bruk, ligger
apparatprogrammet fra treningssenteret inne på mandag og torsdag.

## Bruk
- **Trening** — øverst teller flammen hvor mange økter du har fullført på
  rad. Under ligger ukestripa (man–søn): fullførte dager blir en gyllen
  stolpe, og nabodager smelter sammen. Hviledager mellom to fullførte dager
  blir med i stolpen, siden de ikke bryter rekka. Ringen oppe til høyre viser
  økter fullført av planlagt denne uka. Trykk på en dag i stripa for å se
  økta. Dager bak i uka kan hukes av i etterkant, kommende dager vises bare
- **Plan** — velg en ukedag, legg til øvelser fra banken (eller en egen),
  juster mengde og antall runder. Tomme dager er hviledager. Velgeren blir
  stående åpen, så flere øvelser kan legges til på rad
- **Logg** — antall økter, rekke, rekord og en månedskalender. Trykk på en
  dag for å se hva som ble gjort

Når alle øvelsene for en dag er huket av, kommer et feiringsark med konfetti
og rekka di. Er alle ukas økter gjort, blir hele stripa en skimrende stolpe,
stjerna på søndag fylles, og feiringen blir «Perfekt uke!».

Øvelsesbanken har også en gruppe **Treningssenter** med apparatprogrammet
fra treningssenteret (leg press, pull down, chest press, leg extension,
midjerotasjon, seated row og back extension), med apparatnummer, 3×15 og
startvekt. «Legg til hele programmet» legger alle sju inn på valgt dag med
ett trykk. Programmet legges også automatisk inn på mandag og torsdag én
gang per konto. Øvelser som alt står på de dagene
blir liggende, og fjernes programmet, kommer det ikke tilbake.
Etter 10 ganger kan vekta økes. Det gjøres ved å endre mengden i
Plan.

Øvelser med tid i seg, som `60 sek` eller `5 min`, får en blå ▶-brikke.
Trykk på den for å starte nedtelling under øvelsen, med −15 / +15, pause og
stopp. Timeren piper de tre siste sekundene, huker av øvelsen når den er
ferdig, og holder skjermen våken mens den går. Reps og distanser (`20 stk`,
`4 km`) har ingen timer.

Fikk du ikke trent, kan du trykke «Flytt resten til i morgen» under dagens
økt. Rekka teller fullførte økter etter hverandre: hviledager bryter den
ikke, og dagens økt teller først når den er huket av. En dag som er flyttet,
vises med ↪. Den bryter verken rekka eller perfekt uke så lenge det som ble
flyttet blir gjort (eller fortsatt venter på i dag eller senere). Blir det
aldri gjort, teller dagen som hoppet over.

## Slik gjør du

Øvelser fra banken har et lite blått **i** på emojien, både i Trening og i
Plan. Trykk på emojien for å få en kort beskrivelse: en animert strekfigur
som viser bevegelsen, tre steg og et tips. Trykk på resten av raden huker av
som før. Figurene er SVG bygd fra ledd og vinkler (`HOW` i `index.html`), og
står stille med start- og sluttstilling når telefonen har redusert bevegelse
slått på. Egne øvelser har ingen beskrivelse.

## Sett

Øvelser med sett i mengden, som `3×15 · 18 kg` eller `6 × 400 m`, får én
rund knapp per sett under øvelsen. Trykk på et sett for å huke det av;
øvelsen blir gjort når alle settene er tatt. Trykk på selve raden huker av,
eller fjerner, alle settene på én gang. Har øvelsen både sett og tid (som
`3×60 sek`), huker timeren av neste sett. Settene lagres per dag
(`sets` på øvelsen) og synkes som resten. En dag der bare noen sett er tatt,
regnes som påbegynt og bygges ikke om når planen endres.

## Mer vekt

Treningssenteret sier at vekta kan økes etter 10 ganger. For øvelser med kg i
mengden teller appen hvor mange dager øvelsen er gjort på vekta som står i
planen, og viser «7/10 før mer vekt» under øvelsen. Når den 10. gangen hukes
av, kommer «Klar for mer vekt!» med et forslag (omtrent +10 %, minst +1 kg)
som kan justeres med − og +. «Øk» endrer vekta på alle dagene i planen der
øvelsen står, og tellingen starter på nytt. «Ikke nå» lar planen stå; da
ligger en «⬆️ Klar for mer vekt»-knapp under øvelsen til du er klar.
Logg-fanen har et «💪 Vekter»-kort med vekthistorikk (for eksempel
18 → 20 kg) og framgangen mot neste økning. Historikken lagres i planen og
synkes med skyen.

Avhuking gir et lite «pling», og fullført økt gir en fanfare. Høyttaleren
nederst skrur lyden av og på (`treningsplan.lyd.v1`). Appen følger mørk/lys
modus på telefonen, og animasjoner slås av under `prefers-reduced-motion`.

Endringer i planen slår inn med det samme på resten av uka og framover,
også på dager tidligere i uka som ikke er påbegynt. Dager du allerede
har huket av på, hoppet over, eller flyttet øvelser til, blir stående urørt.

## Innlogging og lagring i skyen

Appen bruker samme familiemedlemmer og PIN som Ukeoppgaver (`members`-tabellen
i det felles Supabase-prosjektet). Første gang velger man navn og taster PIN;
deretter husker telefonen hvem som er logget inn, også uten nett. Trykk på
initialene øverst til høyre på Trening-fanen for å logge ut og bytte person.

Hvert medlem har sin egen plan og logg. De lagres lokalt
(`workout-plan-v2.<id>` og `workout-schedule-v2.<id>`) og synkes med
Supabase:

- `training_plans` — planen, med `updated_at`
- `training_days` — én rad per dag som er endret i appen, med tidsstempel `t`.
  Urørte dager lagres ikke, de bygges fra planen

Skyen leses før appen skriver dit, så en ny telefon aldri blanker ut
framgang. Ved sammenslåing vinner nyeste versjon av planen og av hver dag, og
databasen nekter å la en eldre versjon overskrive en nyere. Uten nett går
appen videre på den lokale kopien og sender endringene når nettet er tilbake.
Andre enheters endringer hentes når appen åpnes eller kommer i forgrunnen.

Plan og logg som lå på telefonen fra før kontoene kom, overtas av den første
som logger inn der og ikke er admin. Apparatprogrammet legges inn på mandag
og torsdag én gang per konto (ikke for admin). Tabellene er beskrevet i
`supabase/schema.sql`.

PIN-en er en enkel sperre mellom søsken, ikke ekte tilgangskontroll: alle med
den offentlige nøkkelen kan i prinsippet lese og skrive dataene direkte.

## Si fra om feil og forslag

Knappen «💬 Si fra» nederst på Trening-fanen lar deg velge «Noe er feil»
eller «Jeg har en idé» og skrive en melding. Meldingen lagres i tabellen
`feedback` i det samme Supabase-prosjektet som Ukeoppgaver bruker, og dukker
opp i Admin-fanen i Ukeoppgaver. Der kan den merkes som ferdig.

Uten nett legges meldingen i kø i `localStorage`
(`treningsplan.tilbakemelding.v1`) og sendes neste gang appen åpnes på nett.
Med meldingen følger hvilken fane som var åpen og nettleserinfo, så feil er
lettere å finne.

## Filer
- `index.html` — selve appen (localStorage lokalt, synket med Supabase)
- `supabase/schema.sql` — tabellene treningsappen bruker i Supabase
- `manifest.json` — gjør appen installerbar på hjemskjermen
- `sw.js` — service worker for offline-bruk
- `icon-192.png` / `icon-512.png` — app-ikoner

## Publisere på GitHub Pages
1. Push disse filene til et repo (rot-mappen, eller en `docs/`-mappe)
2. Settings → Pages → velg branch og mappe → Save
3. Åpne den utgitte URL-en på mobil → del-ikon → "Legg til på Hjem-skjerm"
