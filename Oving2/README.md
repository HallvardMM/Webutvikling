This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To run the app, write the following lines in the terminal:

`cd exhibition`

`npm install`

`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will see any lint errors in the console.

### GitPod

1. Open Gitpod: [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.idi.ntnu.no/?fbclid=IwAR1k5bFnYUjI77Qf0c16jAnF0Zv6zolIlHl5RSodCPhwUdyjlzYQFaxxSBE#https://gitlab.stud.idi.ntnu.no/it2810-h20/team-65/prosjekt-2.git)
2. In the terminal: `cd exhibition`
3. `npm install`
4. `npm start`
5. Open the app by clicking the **URL** in gitpod after launching

# Dokumentasjon

## Introduksjon
Worlds Greatest Art Exhibition! er en single page application (SPA), hvor brukeren kan trykke gjennom en utstilling enten vha **prev/next** eller ved å velge **rotation**. Utstillingen inneholder ulike kombinasjoner kunstverk bestående av et bilde, diktutdrag og lydopptak. Bilde og lydopptak er låst, men diktutdraget er tilfeldig med mindre man låser det til kunstverket som **favorite**.

## Interaksjoner

### Rotation:

Itererer gjennom utstillingen, kan pauses ved å trykke på pause-knappen. Default: På, 10 sekunders avspillingshastighet.

### Favorite:

Lagrer poesien til Art-komponenten vha localstorage. Poesien hentes vanlgivis fra poetrydb.org/random. Favoritter forblir lagret selvom nettleseren lukkes.

### Sound:

Slår av/på lyden for bildefremvisningen.

### Prev & Next:

Tillater å manuelt gå tilbake/videre i utstillingen. Dette vil stoppe auto-fremvisning hvis den er aktivert.

### Innstillinger:

Åpner en dropdown meny med instillingsvalgene.

### Color Theme:

Tillater valg av 4 forskjellige temaer {Blue, Sand, Pink, Green} for webapplikasjonen, refreshing av siden endrer tilbake til default. Default: 'Blue'.

### Speed of rotation:

Setter avspillingshastigheten. Ved input lavere enn 1 sekund settes hastigheten til default. Default: 10 sekunder.

## Teknologi

### React

Vi har brukt React implementert med JSX3 og Ecmascript 5. React-prosjektet ble opprettet i terminalen ved bruk av `npx create-react-app my-app --template typescript --use-npm`

Funksjonelle komponenter har blitt en trend innenfor utvikling i React, og kan i flere tilfeller føre til kortere kode. Facebook, som lager React, har også et prosjekt som heter ReasonML, tilsvarende TypeScript, men som hovedsaklig er funksjonelt. Dette viser at Facebook satser på funksjonell programmering, og alle disse grunnene har ført til at vi valgte å fokusere på funksjonelle komponenter. Derfor har vi kun laget en Class-komponent: Art.

### Komponent Hierarki

Funksjonaliteten og logikken til nettsiden er delt opp i mindre komponenter med hver sin oppgave. Dette gjorde vi fordi det ble enklere å jobbe med og å ha oversikt, samt å teste bestemte deler av prosjektet.

![Alt text](./hierarki.png)

Et snapshot av hierarkiet finnes også [her](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-65/prosjekt-2/-/blob/master/exhibition/src/__snapshots__/App.test.tsx.snap?fbclid=IwAR1SdSuYNMiHeN1KpZaYEMINPXBZdueoXuUzznINs-1sbSAM32dat7vYPBs).

- App - inneholder hele applikasjonen, tar seg av state management for fargevalg av Context API

- Context API - brukes for å endre fargene i alle komponentene, samt lagre og sende nøkler for localstorage og sessionstorage

- Exhibition - er hovedkomponenten til, og sender props til art, samt inneholder logikken for bytte mellom art-komponentene.

- Art - er en container som får tilsendt de animerte SVG-bildene og data fra poetryDB

- Sounds - laster inn mp3-filene og spiller av lyd

- Buttons - prev & next tillater manuelt bytte av art-komponenten, auto-avspilling/auto-rotering bytter automatisk videre til neste element i hastigheten lagret i sessionstorage, mute/unmute tillater avspilling av lyd etter ønske, favoritt lagrer lastet poesi til artkomponenten

- Dropdown - lager en dropdown-meny som inneholder settings

- Settings - setter fargevalg i Context API og avspillingshastighet

### Ajax

Dikt lastes ved hjelp av den innebygde fetch-funksjonen i JavaScript. Det gjøres et kall mot poetryDB med Rest API, spesifikt mot https://poetrydb.org/random for å få tilfeldig genererte dikt. Vi bruker første linje av diktet samt forfatter og tittel. 

Dataen returnertes først fra poetryDB som et json-objekt på dette formatet:

```
{
  "title": "AnyTitle",
  "author": "AnyAuthor",
  "lines": [
    "AnyLine1",
    "AnyLine2",
    "AnyLineN"
  ],
  "linecount": "N"
}
```

Etter 24.09.2020 ble dataen fra poetryDB sendt i et annet format:

```
[
    {
        "title": "AnyTitle",
        "author": "AnyAuthor",
        "lines": [
            "AnyLine1",
            "AnyLine2",
            "AnyLineN"
        ],
        "linecount": "N"
    }
]
```

Dermed måtte webapplikasjon tilpasses at objektet var wrappet i et array. 

### Context API

Context API er blitt brukt til å generalisere variablene til fargevalgene i dropdownmenyen, og for å sette nøklene til localstorage og sessionstorage så de kun blir satt et sted.

Ved å bruke Context API for å endre på temafargene til nettsiden fikk vi prøvd bruk av Context API både i klasse- og funksjonell-sammenheng, og både til setting og getting av farge.

### SVG

Kunsten er SVG-elementer laget fra bunnen av, og gjort skalerbare med viewbox. Disse er deretter blitt animert og fargelagt i tilhørende css-filer ved hjelp av id og class-labels.


## HTML WEB STORAGE

### Localstorage 

Localstorage lagrer data uten utløpsdato, og brukes til å lagre brukerens "favorittkombinasjon" av lyd, bilde og poesi. Lyd og bilde er låst sammen, men poesien lastes inn tilfeldig. Localstorage brukes dermed til å lagre poesien til Art-komponenten. Dette gjør at om brukeren lukker fanen/nettleseren for så å åpne den igjen vil fortsatt brukeren finne den samme poesien på det samme bildet merket med favoritt.

### Sessionstorage

Sessionstorage brukes til å huske avspillingshastighten til auto-rotering-funksjonen. 

## RESPONSIVE WEB DESIGN

Vi brukt viewbox for å gjøre SVGene skalerbare, media-queries for å skalere elementene på webapplikasjonen etter størrelse på vinduet og REM for å skalere teksten. CSS Flexbox er blitt brukt for å få et fleksibelt layout, og i index.html-filen settes viewport som brukes i css-filene til dropdown og settings for å justere marginene.

Media-queries'ene er satt opp til å sjekke hvor stor bredden på skjermen er, og skalerer font-, button- og box-sizes så det passer til vinduet. På den måten tilpasser webapplikasjonen seg enheten som brukes, og layoutet blir ryddig og oversiktlig for brukeren.

## TESTING

Vi bruker snapshot-testing til å sjekke at ulike komponenter eksisterer, og at appen kjører. Testing av brukergrensesnitt og responsivt webdesign er gjort i Chrome, Safari, Opra og Firefox.

Enhetene vi har testet på er: 
* Mobil:
  - Samsung Galaxy s10+
* Tablets:
  - iPad Pro
* Desktops:
  - Lenovo Thinkpad
  - Ekstern stor pc-skjerm
 
## GIT

De fleste commits er merket med tilknyttet issue og beskrivende kommentarer. Vi lagde et issue-board for å synliggjøre progresjon og fordele arbeidsoppgaver, samt noen labels for å tydligjøre hva issuet løser.
