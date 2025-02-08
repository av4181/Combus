// Javascript program to parse the molecule
// and get the atoms count
function get_count(s) {
// Use Map to store elements in insertion order
    let mp = new Map();

    let i = 0;
    while (i < s.length) {
        let count = 0;
// Convert the string element into character
        let c = s.charAt(i);

// Check string contains the Capital A - Z value.
        if (c.match(/[A-Z]/)) {
            let a = " ";

            // Convert the character element
            // into string element
            a += c;

            let j = i + 1;
            while (j < s.length) {
                let d = s.charAt(j);

                // Check string contains the small a-z value.
                if (d.match(/[a-z]/)) {
                    a += d;

                    if (!mp.has(a)) {
                        mp.set(a, 1);
                    } else {
                        mp.set(a, mp.get(a) + 1);
                    }
                    count = 1;
                }

                // Check string contains the number value.
                else if (d.match(/[0-9]/)) {
                    let k = parseInt(d);
                    mp.set(a, k);
                    count = 1;
                } else {
                    i = j - 1;
                    break;
                }
                j += 1;
            }

            if (count == 0) {
                if (!mp.has(a)) {
                    mp.set(a, 1);
                } else {
                    mp.set(a, mp.get(a) + 1);
                }
            }
        }
        i += 1;
    }

    console.log("\nAtom count:");
    for (let [key, value] of mp) {
        console.log(key, value);
    }
    // TODO : niet zeker waarom dit erin staat
    //mp.clear();

    return mp;
}

// TEST get_count()
// let str = "Fe2H3OH";
// console.log("Given molecule:", str);
// get_count(str);

/*
Functies om extra inputveld toe te voegen met knop.  Toevoegen extra <div>
 */
function addFn() {
    const divEle = document.getElementById("inputFields");
    divEle.innerHTML += `
        <div class="input-group">
            <input type="text" placeholder="Voer formule in" class="input-field" oninput="parseFormula(this)">
            <label class="output-label"></label>
        </div>
    `;
}

/*
Functie die het inputveld parsed
 */
function parseFormula(inputField) {
    const formula = inputField.value;
    const outputLabel = inputField.nextElementSibling;

    //... (roep hier je get_count functie aan en formatteer de output)...
    const elementCount = get_count(formula); // Aanpassen aan je get_count functie
    outputLabel.textContent = formatOutput(elementCount); // formatOutput functie moet nog gedefinieerd worden
}

/*
Voorbeeld formatOutput functie (aanpassen naar je eigen formaat)
 */
function formatOutput(elementCount) {
    let output = "";
    for (let [key, value] of elementCount) {
        output += `${key}: ${value}, `;
    }
    return output.slice(0, -2); // Verwijder laatste komma en spatie
}