## Kjøring av app
   - Vær på NTNU sitt nett på både pc og mobil, kan bruke vpn
   - Skriv `npm install`
   - Skriv` npm start`
   - Scan QR koden med Iphone/Android (noen brukere må benytte tunnel fremfor LAN i expo)

# Dokumentasjon

## Introduksjon
  Vi har valgt oppgave A og lagd en React Native klient til prosjekt 3. Dette er da en mobilapplikasjon med en filmdatabase hvor brukeren kan finne informasjon om nesten 7000 filmer. Det er også mulig å opprette egne brukere og legge inn anmeldelser på filmene, så fremtidige brukere kan se hva du mener om disse filmene. I denne oppgaven skulle vi lage en applikasjon som støttet både android og IOS mobiler.
  
## Funksjonalitet
 
### Registrering
  - Etter å ha trykket på **Register** kan man sette opp en ny bruker.
  - Man må fylle ut **Username** og begge **Password**-tekstfeltene for å kunne registrere en ny bruker. Brukeren får indikasjon på om passordene er ulike.
  - **Create User**-knappen er kun klikkbar hvis alle feltene er fylt. Om **Username** allerede finnes i databasen får brukeren beskjed om dette etter å ha trykket. Nye brukere blir bare opprettet dersom det ikke finnes en bruker med tilsvarende **Username** i databasen fra før.
  - Det er også mulig å trykke på **X** hvis man ikke ønsker å lage en bruker, man blir da tatt tilbake til hovedsiden

  
### Login
  - Etter å ha trykket på **login** kan du logge på med en eksisterende bruker (feks brukernavn: Test, passord: Test)
  - Man må ha fylt ut begge felter for å kunne trykke logg inn
  - Hvis du skriver inn feil vil du få beskjed om at det er incorrect, hvis brukeren eksisterer tas du tilbake til hovedsiden
  - Her er det en **X** knapp for å gå tilbake, og en knapp **registrer** hvis du vil opprette en ny bruker
 

### Search for titles
  - Etter å ha trykket **Search for Titles** får du opp en modal hvor du kan søke etter filmtittel 
  - Her er det en autocomplete funksjon som du kommer med forslag etterhvert som du skriver inn bokstaver
  - Det er kun mulig å søke på en film om gangen
  - Etter å ha søkt på film vil den komme opp i tabellen. 


### Theme
  - Her kan du trykke mellom tre ulike fargetemaer for appen etter dine preferanser
  - Fargetema er Blue, Dark og Fall. Her kunne vi lagt til flere, men tenkte tre var nok for å vise proof of concept.


### Filter
  - Hvis du trykker deg inn på **Filter** får du opp en modal (pop-up)
  - Her kan du trykke deg inn på genre, director,year og rating og legge til de filtrene du ønsker
  - Når du er ferdig kan du trykke **Apply Filter**, eventuelt kryss oppe i høyre hjørnet hvis du ikke vil legge til noen
  - Når du har filtrert vil kun de filmene som matcher de valgte filterne komme opp.


### Sort
  - Denne varierer utifra om du har mobilen i portrait eller landscape
  - I portrait kan du trykke på **Sort** og deretter velge hvilket data du vil sortere på, i headeren til tabellen kan du velge om det vil være i stigende eller synkende rekkefølge, det er også denne dataen som vil vises ved siden av filmtittelen
  - I utgangspunktet skulle ikke sort være en egen modal, men grunnet iPhone sin picker tok stor plass valgte vi å flytte det til en modal for å gjøre hovedsiden mer ryddig
  - I landscape mode vil all dataer du kan sortere på vises og ved å klikke på de ulike i headeren kan man sortere på Movie title, Genre, Director, Country, Runtime, Year, Score og Rating i enten stigende eller synkende rekkefølge.
  - I portrait mode hvis man velger å sortere på name vil andre kolonne automatisk velge director. Dette er fordi det er naturlig å se director for å kunne skille filmer, da noen filmer har likt navn.


### Tabellen
 - Som sagt kan man sortere ved å trykke på headeren i tabellen
 - Det vil være 10 elementer som vises i tabellen til en hver tid(hvis det finnes 10 som oppfyller filtrene du har lagt til)
 - I bunn kan du trykke deg fram eller tilbake til de neste side av resultatene


### Reviews og Detaljer om Film:
  - Ved å trykke raden som tilhører hver film får man mer detaljert informasjon om filmen.
  - Under ser man Reviews som er lagt til.
  - Ved å trykke på **Write a review**-knappen kommer man til en side for å skrive et review. Hvis man er logget inn så kan man legge til et review ved å skrive det og trykke på **Add Review**-knappen. Hvis ikke får man beskjed om at **User is not logged in**. Tekstefeltet er låst om man ikke er logget inn.

### Orientation
  - Vi har laget støtte for orientation(både portrait og landscape)
  - Dette viste seg å være mer jobb enn først antatt da dette fungerer litt ulikt på ios og android

## Teknologi

### React native og expo
Vi har jobbet i react native og expo slik som det ble spesifisert i oppgaveteksten. Vi testet med emulator, men merket at vi personlig synes arbeidsprossesen var enklere med mobil

### Backend
Backend koden kjører på VM og trenger derfor ikke starte koden i prosjekt-4/backend. Prosjektet skal kjøre på http://it2810-65.idi.ntnu.no:3000. Vi har ikke gjort noen endringer på backend fra prosjekt 3. Hvis man mistenker at backend er nede kan man sjekke om http://it2810-65.idi.ntnu.no:3000/allgenres viser data.

### Biblioteker
  - react-native-paper: Dette biblioteket har vi hentet mange komponenter fra, dette valgte vi ettersom komponentene lignet på de vi benyttet fra material UI i prosjekt 3.
  - react-native-sectioned-multi-select: Dette ble brukt for å velge med autocomplete i filter og filmsøk
  - @expo/vector-icons dette blit brukt i multiselect
  - react-router-native: Dette ble brukt for navigering mellom ulike steder i appen, tilsvarer react-router-dom som vi brukte i prosjekt 3
  - redux: Brukt for å håndtere states
  - react-redux: Brukt for å håndtere states
  - @react-native-picker Blir brukt for å velge hva som skal sortes i portrett modus
  - react-native-elements: Blir brukt for movie icon
  - expo-constants blir brukt for å finne høyden, da vi fant ut at iphone og android oppførte seg forskjellig ved utregning av skjerm høyde

### Tester
  - Vi har gjennomført manuell E2E testing med følgende enheter: Iphone 8, Samsung Galaxy S10+ og en Huawei P20.
  - Gjennom testing har vi oppdaget at ulike enheter ikke nødvendigvis reagerer likt på samme kode, derfor var det viktig å teste alle funksjonaliteter med alle enheter
  - Vi har testet Registrering med ny bruker, hvor du blir logget inn med den nye brukeren, det er også testet å registrere en allerede eksisterende bruker noe som ikke fungerer
  - Det er testet innloggig med bruker som funker og brukere som ikke funker, her blir du tatt tilbake til siden ved eksiterende bruker og får beskjed om at det er feil hvis ikke
  - Vi har testet søk på ulike filmer, ved å skrive inne ulike filmtittler og velge de
  - Vi har testet filtrering med å legge inn ulike filtre som gir filmer som oppfyller disse kravene
  - Vi har testet sortering på de ulike dataene, her har vi også testet å sortere allerede filtrert data
