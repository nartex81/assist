# Je eigen AI-assistent in Copilot

Materiaal voor de navorming over zelfgemaakte Copilot-agents voor directies en beleidsondersteuners in het secundair onderwijs (Katholiek Onderwijs Vlaanderen).

Vrijdag 16 oktober 2026, Living Tomorrow. Voormiddagsessie 9.30–12.00 uur (ingekort) en namiddagsessie 13.00–16.30 uur.

Het Horizoncollege en alle schooldocumenten zijn **fictief** en bedoeld als oefenmateriaal.

## Inhoud

| Map | Wat |
|---|---|
| `01 Agents/` | Instructies, kennisbronnen en startprompts van de vier demo-agents |
| `02 Fictieve school Horizoncollege/` | Zes schooldocumenten die als kennisbron dienen |
| `03 Draaiboek/` | Draaiboek voor de lesgever, met beide sessies |
| `04 Hand-out/` | Hand-out voor de deelnemers |
| `docs/` | De deelnemerswebsite (GitHub Pages) |
| `bron/` | Markdown-bronnen van alle documenten en de website |
| `tools/` | Scripts om Word-bestanden en de website opnieuw te bouwen |

## Aanpassen

Pas de tekst aan in `bron/` en bouw daarna opnieuw (Node.js nodig):

```bash
npm install
```

Een Word-bestand opnieuw maken, bijvoorbeeld het draaiboek:

```bash
node tools/md2docx.js bron/Draaiboek.md "03 Draaiboek/Draaiboek vorming Copilot-agents.docx" "Draaiboek – vorming Copilot-agents"
```

De website opnieuw bouwen (neemt de instructies uit `bron/Agent-instructies.md` en kopieert de Word-bestanden naar `docs/materiaal/`):

```bash
node tools/build-pages.js
```
