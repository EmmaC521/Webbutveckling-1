// Testchecklista: Skapar en lista över test som ska utföras, med möjlighet att markera dem som klara och lägga till nya testpunkter. Man ser
// även datumet för när testet utförs och andelen klara testpunkter.

const tester = [
    { text: "Testa inloggningsflödet", klar: false },
    { text: "Kontrollera formulärvalidering", klar: false },
    { text: "Verifiera responsiv layout på mobil", klar: false }
];

// Ritar upp testlistan som kryssrutor
function renderTester() {
    const lista = document.getElementById("testlista");
    lista.innerHTML = "";

    for (const test of tester) {
        const li = document.createElement("li");
        li.innerHTML = `
            <label>
                <input type="checkbox" ${test.klar ? "checked" : ""}>
                ${test.text}
            </label>
        `;

        const checkbox = li.querySelector("input");
        checkbox.addEventListener("change", () => {
            test.klar = Boolean(checkbox.checked);
            visaAndelKlara();
        });

        lista.appendChild(li);
    }
}

// Visar dagens datum som testdatum
function visaDatum() {
    const idag = new Date();
    document.getElementById("datum").textContent = "Testdatum: " + idag.toLocaleDateString("sv-SE");
}

// Räknar ut och visar hur stor andel av testerna som är avklarade
function visaAndelKlara() {
    const antalKlara = tester.filter(test => test.klar).length;
    const andel = Math.round((antalKlara / tester.length) * 100);
    document.getElementById("andel").textContent = `Klara: ${andel.toFixed(0)}%`;
}

const form = document.getElementById("tillagg-form");
const nyttTestInput = document.getElementById("nytt-test");
const giltigTextRegex = /\S/;

// Hanterar formuläret för att lägga till en ny testpunkt, kollar så att texten inte är tom och uppdaterar listan
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = nyttTestInput.value.trim();

    if (giltigTextRegex.test(text)) {
        tester.push({ text: text, klar: false });
        nyttTestInput.value = "";
        renderTester();
        visaAndelKlara();
    } else {
        alert("Testpunkten får inte vara tom.");
    }
});

renderTester();
visaDatum();
visaAndelKlara();



