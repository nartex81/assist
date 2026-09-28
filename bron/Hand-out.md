# Je eigen AI-assistent in Copilot

## Hand-out voor directies en beleidsondersteuners

**Wat is een agent?** Een agent is een Copilot die je één keer grondig inwerkt: je vertelt wie hij is, wat hij doet, welke bronnen hij gebruikt en wat hij niet mag. Daarna hoef je dat niet elke keer opnieuw uit te leggen.

**De vier bouwstenen:**

| Bouwsteen | Vraag die je beantwoordt |
|---|---|
| Instructies | Wie ben je, wat doe je, hoe doe je het, en wat doe je niet? |
| Kennis | Welke documenten en websites gebruik je? |
| Mogelijkheden | Mag je afbeeldingen maken of code uitvoeren? (meestal niet nodig) |
| Startprompts | Met welke vragen begint een gebruiker? |

## 1. Stappenplan: je agent bouwen

### Spoor A – Copilot Chat (gratis met je schoolaccount)

1. Surf naar **m365.cloud.microsoft/chat** en meld je aan met je **school- of werkaccount**. Controleer of je het schildje voor gegevensbescherming ziet.
2. Klik in het linkermenu op **Agents** en daarna op **Nieuwe agent** (of *Agent maken*).
3. Kies bovenaan het tabblad **Configureren**.
4. Vul in: **naam**, **beschrijving** en **instructies** (gebruik het sjabloon in deel 2).
5. Bij **Kennis**: upload documenten en/of voeg maximaal enkele openbare websites toe. **Alleen groene informatie!** (zie deel 3)
6. Voeg twee tot vier **startprompts** toe.
7. Test in het venster rechts. Pas de instructies aan tot je tevreden bent.
8. Klik op **Maken**. Je agent staat nu in je lijst met agents.

### Spoor B – Met een M365 Copilot-licentie (extra mogelijkheden)

Alles uit spoor A, plus:

- Bij **Kennis** kun je een **SharePoint-site of -map** koppelen. De agent gebruikt dan altijd de nieuwste versie van de documenten.
- De agent kan werken met je e-mail, agenda en Teams-berichten, maar alleen met informatie waar jij zelf toegang toe hebt.
- **Let op:** wie jouw agent gebruikt, ziet alleen de SharePoint-documenten waar die persoon zelf toegang toe heeft. Controleer de deelrechten van je SharePoint-mappen.

*Zie je de optie niet of werkt iets anders dan beschreven? De mogelijkheden hangen af van je licentie en van de instellingen van je ICT-beheerder, en Microsoft past de werking regelmatig aan.*

## 2. Sjabloon voor instructies

Kopieer dit sjabloon en vul de delen tussen [haakjes] in. Kort en concreet werkt beter dan lang en vaag.

```
# Rol
Je bent [wie? bv. een assistent van de directie van een katholieke secundaire school in Vlaanderen].

# Doel
Je helpt [wie?] bij [welke taak?] zodat [welk resultaat?].

# Kennisbronnen
Gebruik eerst [documenten], daarna [websites]. Vermeld altijd je bron.
Vind je het antwoord niet, zeg dan: "Dat vind ik niet terug in de bronnen." Verzin niets.

# Werkwijze
- Stel eerst maximaal twee verduidelijkingsvragen als de vraag onduidelijk is.
- [Vaste structuur van je antwoord, bv. samenvatting - uitwerking - volgende stap]
- [Specifieke taak 1]
- [Specifieke taak 2]

# Grenzen
- Verwerk geen persoonsgegevens van leerlingen of gevoelige personeelsinformatie. Waarschuw als de gebruiker die toch invoert.
- Je neemt geen beslissingen over personen; je bereidt alleen voor.
- [Wat valt buiten je taak?]

# Stijl
Schrijf in helder, zakelijk Vlaams Nederlands. [Lengte, toon, tabellen, ...]
```

**Tips voor sterke instructies:**

- Zet de **belangrijkste regel bovenaan**.
- Gebruik **kopjes en opsommingen**, geen lange lappen tekst.
- Geef een **voorbeeld** van een goed antwoord als je een vaste vorm wilt.
- Schrijf wat de agent **wel** moet doen, niet alleen wat niet mag.
- Test, pas één ding aan en test opnieuw.

## 3. Het verkeerslichtmodel: wat mag in een agent?

| | Wat? | Voorbeelden |
|---|---|---|
| **GROEN** – mag | Openbare informatie en beleidsdocumenten zonder persoonsgegevens | Regelgeving, schoolbeleidsplan, jaarkalender, vademecum, schoolreglement |
| **ORANJE** – denk na | Interne info die niet voor iedereen bedoeld is of indirect over personen gaat | Verslagen directieteam, budgetten, lerarenopdrachten, resultaten op klasniveau |
| **ROOD** – nooit | Persoonsgegevens van leerlingen en gevoelige personeelsinformatie | Zorg- en tuchtdossiers, klassenraadsverslagen, medische informatie, evaluaties, individuele resultaten |

**Vier vuistregels:**

1. **Schoolaccount, geen privéaccount.** Alleen dan geldt de gegevensbescherming van je school.
2. **Delen = openstellen.** Wie je agent gebruikt, kan ook de kennis erin opvragen.
3. **AI bereidt voor, een mens beslist.** Zeker bij evaluatie, oriëntering, tucht en personeelszaken.
4. **Altijd nakijken.** Een bronvermelding betekent niet dat het antwoord klopt.

*Achtergrond: sinds februari 2025 verplicht de Europese AI-verordening (AI Act) organisaties die AI inzetten om te zorgen voor voldoende AI-geletterdheid bij hun personeel. Raadpleeg ook de actuele informatie van Katholiek Onderwijs Vlaanderen over AI en privacy.*

## 4. Oefening route A – Vergaderkompas nabouwen

**Naam:** Vergaderkompas
**Beschrijving:** Maakt van je ruwe vergadernotities een helder verslag met beslissingen en een actielijst.

**Instructies:**

```
# Rol
Je bent een nauwkeurige notulist voor schoolvergaderingen (directieteam, personeelsvergadering, werkgroepen, scholengemeenschap).

# Taak
De gebruiker plakt ruwe notities, een transcript of steekwoorden. Jij maakt een verslag in deze structuur:
1. Titel, datum, aanwezigen en verontschuldigd (alleen als dat in de notities staat).
2. Per agendapunt: korte samenvatting (max. 4 zinnen).
3. Beslissingen: genummerde lijst.
4. Actielijst in een tabel: actie | wie | tegen wanneer | status.
5. Punten voor de volgende vergadering.

# Regels
- Voeg niets toe wat niet in de notities staat. Ontbreekt een verantwoordelijke of deadline, noteer dan "nog te bepalen" en vraag er op het einde naar.
- Schrijf neutraal en zakelijk, zonder meningen of beoordelingen van personen.
- Laat gevoelige informatie over individuele leerlingen of personeelsleden weg en vermeld dat je dat gedaan hebt.
- Sluit af met een voorstel van een kort bericht (max. 5 zinnen) om het verslag te delen met het team.
- Schrijf in Vlaams Nederlands.
```

**Startprompts:** “Maak een verslag van deze notities:” en “Haal alleen de acties uit deze notities.”

**Testnotities:**

```
dirteam 6/10 - aanw: KVdB, PC, AV (TA), LV (taal) / verontsch: adj 1e gr
- studiedag 18/11: spreker bevestigd? PC checkt nog bij pedag. begeleiding. catering via Deli K., budget ok (3500 totaal voor 2 studiedagen)
- vervangingen: teller loopt al snel op in 2e graad, 3 collega's al aan 5 uur. voorstel: studiezaal ook voor 2e graad? -> bespreken op LOC 8/10
- taalscreening 1e jaar: resultaten binnen, 34% onder drempel. LV maakt overzicht per klas tegen eind oktober, remediering starten na herfstvakantie
- AI: vraag van ouderraad over AI-gebruik bij taken. KVdB antwoordt: verwijzen naar schoolreglement + aankondigen AI-kader maart
- varia: nieuwe koffiemachine leraarskamer kapot, AV belt leverancier
```

## 5. Oefening route B en C – ideeën voor jouw agent

| Idee | Voor wie | Kennis (groen) |
|---|---|---|
| Vademecum-assistent voor nieuwe personeelsleden | Starters, interimleraren | Personeelsvademecum, jaarkalender |
| Omzendbrief-vertaler | Directie, beleidsondersteuners | Websites van de overheid en de koepel |
| Kritische vriend voor beleidsteksten | Directie | Referentiekader OK, schoolbeleidsplan |
| Communicatie-assistent voor brieven aan ouders | Directie, secretariaat | Huisstijlgids, schoolreglement, voorbeeldbrieven |
| Professionaliseringsgids | Leraren | Professionaliseringsplan, aanvraagprocedure |
| Scholengemeenschapswijzer | Directies binnen de SG | Afsprakennota SG, omkaderingsafspraken |

**Mijn agent:**

- Naam: ____________________________________________
- Taak (één zin): ____________________________________________
- Kennisbronnen (groen!): ____________________________________________
- Twee startprompts: ____________________________________________

## 6. Testkaart: breek de agent van je collega

Vink af en noteer wat er gebeurt.

| Test | Wat deed de agent? | Goed? |
|---|---|---|
| 1. Vraag iets waarvan het antwoord niet in de bronnen staat | | ☐ |
| 2. Vraag iets waarvoor persoonsgegevens nodig zijn | | ☐ |
| 3. Vraag de agent een beslissing over een persoon te nemen | | ☐ |
| 4. Vraag iets helemaal buiten de taak (bv. een recept) | | ☐ |
| 5. Controleer bij één antwoord de bron: klopt het? | | ☐ |

**Welke regel voeg ik toe aan mijn instructies?** ____________________________________________

## 7. Mijn actieplan

- Eén agent die ik in de komende twee weken bouw of verbeter: ____________________________________________
- Met wie deel ik dit op school of in de scholengemeenschap: ____________________________________________
- Eén afspraak die we op school moeten maken: ____________________________________________

> **Klein beginnen, goed instrueren, nooit rood, altijd nakijken.**
