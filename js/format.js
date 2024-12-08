document.getElementById("buttonGo").addEventListener("click", main);

class io {
    type = "";
    input = "";
    chars = 0;
    balancedBrackets = true;
    balancedSingleQuotes = true;
    balancedDoubleQuotes = true;
    output = "";
}

function main() {
    let checks = new io();

    manageInput(checks);
    manageFormat(checks);
    manageOutput(checks);
}

function manageInput(io) {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Missing selection!");
        return;
    }
    io.type = selectedOption.value;
    io.input = document.getElementById("textInput").value;
}

function manageFormat(io) {
    io.chars = io.input.length;
    io.balancedBrackets = twoCharSymmetry(io.input, "(", ")");
    io.balancedSingleQuotes = oneCharSymmetry(io.input, "'");
    io.balancedDoubleQuotes = oneCharSymmetry(io.input, "\"");


    io.output = io.type === "c" ? clean(io.input) : reformat(clean(io.input));
}

function manageOutput(io) {
    document.getElementById("textOutput").value = io.output;
    document.getElementById("chars").innerHTML = `${io.chars}`;
    document.getElementById("balancedBrackets").innerHTML = `${io.balancedBrackets}`;
    document.getElementById("balancedSingle").innerHTML = `${io.balancedSingleQuotes}`;
    document.getElementById("balancedDouble").innerHTML = `${io.balancedDoubleQuotes}`;
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

function clean(text) {
    return cleanTabs(cleanLinefeed(text));
}

function cleanLinefeed(text) {
    return text.replace(/\n/g, "");
}

function cleanTabs(text) {
    return text.replace(/'([^']*)'|\s+/g, (match, quotedText) => {
        if (quotedText !== undefined) {
            return `'${quotedText}'`;
        }
        return '';
    });
}

function reformat(text) {
    let temp = "";
    let indentLevel = 0;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === "(") {
            indentLevel++;
            temp += `(\n${"    ".repeat(indentLevel)}`;
        } else if (text[i] === ")") {
            indentLevel = Math.max(0, indentLevel - 1);
            temp += `\n${"    ".repeat(indentLevel)})`;
        } else {
            temp += text[i];
        }
    }
    return temp;
}