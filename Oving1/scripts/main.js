/*This file is made so the documentation button is working on all html pages. */

let showDocx = false; /* Variable to tell if documentation is showing or not */

/* Code that toggles between showing and hiding documentation and changing text on button */
$(document).ready(function () {
    $("#textButton").click(function () {
        if (showDocx) {
            $("#info").hide();
            $("#textButton").html("Show Documentation");
            showDocx = false;
        }
        else {
            $("#info").show();
            $("#textButton").html("Hide Documentation");
            showDocx = true;
        }
    });
});

/* Code to insert documentation in all HTML-files. */
$(document).ready(function () {
    $("#info").append(`
        <h2>Dokumentasjon om prosjektet</h2>
        <h3>
            Hvordan CSS-grid og Flexbox-layout har blitt brukt
        </h3>
        <p>
        Jeg brukte Flexbox for å få plassert elementene i toppmenyen slik at de fikk likt mellomrom mellom seg.
        Jeg definerte stylingen i CSS-filen for toppmenyens Nav-elementet og bruke «display: flex» og «justify-content: space-evenly».
        Jeg har brukt Flexbox før så det var ganske greit og jeg valgte å gjøre det sånn siden jeg visste at det ville fungere.
        Jeg hadde mer lyst til å prøve ut CSS-grid som jeg ikke hadde brukt før.
        Jeg brukte CSS-grid på alle de andre elementene på siden.
        Jeg la alle de andre elementene inne i en DIV som jeg stylet i CSS filen med «display: grid;», «grid-template-columns: [firstColumn] 25% [secondColumn] 50% [thirdColumn] 25%;» og «justify-items: center;». Dette gjorde jeg fordi jeg ville ha alt sentrert og ha luft på hver side av teksten og bildene. 
        Deretter definerte jeg for alle elementene som ligger i den nevnte DIVen at de skulle følge «grid-column: secondColumn;», sånn at de bare lå i kolonnen i midten.
        Tolket denne setningen fra oppgaven "Nederst på siden skal du ha en knapp" til at knappen alltid skulle være nederste element. 
        Det var derfor den ble plassert slik at den kom på bunnen.
        Tolket det også slik at en "webside" kan innholde flere HTML-sider. 
        HTML-sidene hadde ganske likt oppsett og jeg gjenbrukte Flexbox og CSS-grid stylingen i style.css på alle sammen.
        </p>
        <h3>
            Hvordan HTML canvas og SVG i HTML har blitt brukt
        </h3>
        <p>
        Jeg tilstrebet å gjøre bildene så like som mulig.
        Jeg lagde SVG bildet først og det gikk ganske greit å legge til elementer i motviet.
        Jeg prøvde først å lage skyer med bøyde kurver, men det var vanskelig å lage bøyde kruver siden det må gjøres med mange rettekruver.
        Jeg leste at det ikke <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths" target="_blank">skalerte bra</a> og valgte derfor å heller ha en ellipse som sky.
        Det var veldig greit å gjøre bildet interaktivt siden det var lett å definere de forskjellige objektene som skulle klikkes eller lignende.
        Canvas slet jeg mer med. 
        Det ser mer ryddig ut i HTML filen, men jeg måtte legge hva som skulle tegnes inn i en Js-fil (kunne også lagt det inn i et script element).
        Jeg brukte en god del tid på å få det likt som SVG elementet og få det til å tegne med en gang siden åpnes ved å bruke «window.onload».
        Den største utfordringen var likevel å gjøre Canvas interaktivt.
        Jeg leste noen steder at det ikke lot seg enkelt gjøre og jeg fant funksjonen «addHitRegion», men den var <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/addHitRegion" target="_blank">foreldet</a>.
        Heldigvis etter litt mer leting fant jeg en løsning jeg kunne bruke med <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath" target="_blank">«isPointInPath»</a> og ved å lage <a href="https://developer.mozilla.org/en-US/docs/Web/API/Path2D" target="_blank">«Path2D»-objekter</a> som jeg kunne bruke til å finne ut om jeg interagerte med riktig figur på bildet.
        «Path2D»-objekter ble også brukt for å gjøre blinkingen til blomstene lettere.
        </p>
        <h3>
            Hvordan jQuery har blitt brukt
        </h3>
        <p>
        jQuery har jeg brukt ved å laste det ned i script tag i HTML-filen fra CDN.
        Dette har jeg gjort fordi da kan brukeren gjenbruke nedlastet jQuery fil.
        jQuery har jeg brukt i Javascript filene «Main.js», «Canvas.js» og «SVG.js».
        Alle HTML-sidene har en knapp som viser/skjuler dokumentasjon og jQuery brukes for å sjekke når den er klikket og for å endre teksten, funksjonen for dette ligger i «Main.js».
        I «Main.js» bruker jeg også jQuery til å laste inn dokumentasjonen ved å bruke <a href="https://api.jquery.com/append/" target="_blank">append()</a> og <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" target="_blank">template literals</a>.
        I «SVG.js» brukes jQuery for å sjekk om det gjøres interaksjon mot elementer inne i SVG-elementet,
        mens i «Canvas.js» måtte jeg sjekke om det ble gjort handlinger i Canvas-elementet og så finne ut posisjonen til musen,
        ved å hente informasjon fra «eventet», for å så bruke Canvas funksjonen «isPointInPath» for å sjekke at musen var riktig sted i Canvas-elementet.
        </p>
        <h3>
            Hvordan cross-browser testing har blitt utført
        </h3>
        <p>
        Jeg lastet ned nyeste versjon av Chrome, Firefox, Opera, Microsoft Edge og Internet Explorer.
        Jeg prøvde også å laste ned Safari, men Safari har ikke lengre <a href="https://support.apple.com/en-us/HT204416" target="_blank">støtte for Windows</a>.
        Jeg testet alle funksjonene og så at det ikke var noen problemer da jeg testet i Chrome, Opera, Firefox eller Edge.
        Internet Explorer hadde problemer, som forventet da Internet Explorer er blitt <a href="https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666" target="_blank">erstattet av Edge</a>,
        der virket ikke CSS-grid, SVG, Canvas eller "template literals" slik som tenkt. 
        Hvis jeg skulle hatt støtte for Internet Explorer så burde jeg brukt en transpiler som <a href="https://babeljs.io/" target="_blank">Babel</a> eller lignende.
        Det som var litt interessant var at konsollen i utviklerverktøyet til FireFox gjorde meg klar over at jeg hadde glemte å legge til «charset» i HTML-filene,
        noe de andre utviklerverktøyene ikke klaget over.
        </p>
        <h3>
            Viktigste og nyttigste informasjonskildene (tutorials, websider, bøker)
        </h3>
        <ul>
            <li>
                HTML: <a href="https://www.w3schools.com/html/" target="_blank">https://www.w3schools.com/html/</a>
            </li>
            <li>
                Flexbox: <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox" target="_blank">https://css-tricks.com/snippets/css/a-guide-to-flexbox</a>
            </li>
            <li>
                CSS-grid: <a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank">https://css-tricks.com/snippets/css/complete-guide-grid/</a>
            </li>
            <li>
                SVG: <a href="https://www.w3schools.com/graphics/svg_intro.asp" target="_blank">https://www.w3schools.com/graphics/svg_intro.asp</a>
            </li>
            <li>
                Canvas: <a href="https://www.w3schools.com/jsref/dom_obj_canvas.asp" target="_blank">https://www.w3schools.com/jsref/dom_obj_canvas.asp</a>
            </li>
            <li>
                Canvas interaktivitet: <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath" target="_blank">https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath</a>
            </li>
            <li>
                jQuery: <a href="https://api.jquery.com/" target="_blank">https://api.jquery.com/</a>
            </li>
        </ul>
        <h3>
            Kilder for gjenbrukte kodesnutter
        </h3>
        <p>Dette var det jeg lot meg tydelig inspirere av: </p>
        <ul>
            <li>
                Fargepalett for museumsfølelse: <a href="https://www.w3schools.com/colors/colors_palettes.asp" target="_blank">https://www.w3schools.com/colors/colors_palettes.asp</a> 2016 Palettes
            </li>
            <li>
                Toppmeny: <a href="https://www.w3schools.com/howto/howto_js_topnav.asp" target="_blank">https://www.w3schools.com/howto/howto_js_topnav.asp</a>
            </li>
            <li>
                Blinkende SVG: <a href="https://stackoverflow.com/questions/1605698/text-blinking-jquery">https://stackoverflow.com/questions/1605698/text-blinking-jquery</a>
            </li>
        </ul>
        </div>
        `);
});

