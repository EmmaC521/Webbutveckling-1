// Testkörning: simulerar att köra tester med en timer, resultat och en rapport i nytt fönster
// I denna uppgift har jag tagit hjälp av AI för att bolla idéer kring hur jag kan få med alla obligatoriska delar av uppgiften och fortsätta på temat kring testning.

let sekunder = 0;
let timerId;
let timeoutId;


const startaBtn = document.getElementById("starta-btn");
const timerText = document.getElementById("timer");

// Startar testkörningen efter bekräftelse, och startar en timer
startaBtn.addEventListener("click", () => {
    const villStarta = confirm("Vill du starta en ny testkörning?");

    if (villStarta) {
        sekunder = 0;
        timerId = setInterval(() => {
            sekunder++;
            timerText.textContent = "Tid: " + sekunder + " sekunder";
        }, 1000);

        //Hårdkodat värde för testkörningens längd
        timeoutId = setTimeout(avslutaTestkorning, 5000);

    }
});

// Avslutar testkörningen: stoppar timern, avgör resultat och visar det
function avslutaTestkorning() {
    clearInterval(timerId);

    //Hårdkodade värden
    const antalTester = 10;
    const godkanda = 8;

    if (godkanda < antalTester) {
        const kommentar = prompt("Ett eller flera tester misslyckades. Vad gick fel?");
        alert("Testkörning klar! " + godkanda + " av " + antalTester + " tester godkända.\nKommentar: " + kommentar);
    } else {
        alert("Testkörning klar! Alla " + antalTester + " tester godkända.");
    }
}

const rapportBtn = document.getElementById("rapport-btn");

// Öppnar en rapport i ett nytt fönster, med en knapp för att stänga det
rapportBtn.addEventListener("click", () => {
    const rapportFonster = window.open("", "Rapport", "width=400,height=300");

    rapportFonster.document.write("<h1>Testrapport</h1>");
    rapportFonster.document.write("<p>Senaste testkörning: 8 av 10 tester godkända.</p>");
    rapportFonster.document.write('<button id="stang-btn">Stäng</button>');

    rapportFonster.document.getElementById("stang-btn").addEventListener("click", () => {
        rapportFonster.close();
    });
});
const avbrytBtn = document.getElementById("avbryt-btn");

// Avbryter en pågående testkörning innan den hinner slutföras
avbrytBtn.addEventListener("click", () => {
    clearInterval(timerId);
    clearTimeout(timeoutId);
    timerText.textContent = "Testkörningen avbröts.";
});