// Event-Listener für den Button


document.getElementById('buttonFormat').addEventListener('click', format);



class io {
    input = "";
    brackets = false;
    quotations = false;
    chars = 0;
    clean = "";
    formatted = "";
}

function format() {
    let check = new io();

    // Text aus dem Eingabefeld lesen
    check.input = document.getElementById("textInput").value;

    check.chars = check.input.length; // Anzahl der Zeichen
    check.brackets = twoCharSymmetry(check.input, '(', ')'); // Klammer-Symmetrie prüfen
    check.quotations = oneCharSymmetry(check.input, "'"); // Symmetrie für Anführungszeichen prüfen
    check.clean = cleanTabs(cleanLinefeed(check.input));
    check.formatted = insertTabs(check.clean);


    // Statistiken in die Div-Box schreiben
    document.getElementById('stats').innerHTML = `Characters: ${check.chars}<br>Brackets balanced: ${check.brackets}<br>Quotations balanced: ${check.quotations}`;

    // Ergebnis im zweiten Textfeld anzeigen
    document.getElementById("textOutput").value = check.formatted;
}

function twoCharSymmetry(text, charOne, charTwo) {
    return countChar(text, charOne) === countChar(text, charTwo);
}

function oneCharSymmetry(text, char) {
    return countChar(text, char) % 2 === 0;
}

function countChar(text, char) {
    let c = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === char) {
            c++;
        }
    }
    return c;
}

function cleanLinefeed(text) {
    return text.replace(/\n/g, "");
}

function cleanTabs(text) {
    return text.replace(/'([^']*)'|\s+/g, (match, quotedText) => {
        if (quotedText !== undefined) {
            return `'${quotedText}'`; // Inhalt in Anführungszeichen beibehalten
        }
        return ''; // Leerzeichen entfernen
    });
}

function insertTabs(text) {
    let temp = ""; // String für den neuen Text
    let indentLevel = 0; // Zähler für die Tiefe der Einrückung

    for (let i = 0; i < text.length; i++) {
        if (text[i] === "(") {
            indentLevel++; // Einrückung erhöhen
            temp += `(\n${"    ".repeat(indentLevel)}`; // Neue Zeile und Einrückung hinzufügen
        } else if (text[i] === ")") {
            indentLevel = Math.max(0, indentLevel - 1); // Einrückung reduzieren
            temp += `\n${"    ".repeat(indentLevel)})`; // Neue Zeile vor der schließenden Klammer
        } else {
            temp += text[i]; // Normales Zeichen hinzufügen
        }
    }
    return temp;
}