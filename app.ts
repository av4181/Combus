import { ChemicalElement } from './chemical-element';
import { Component } from './component';
import { Stream } from './stream';
import { loadLHVData, findLHVInLoadedData } from './lhv-data-fetcher';

// Functies voor frontend interactie (pas aan voor je Bootstrap frontend)
// Deze zouden in een aparte UI-module kunnen staan.

function formatElementCounts(elementCounts: Map<string, number>): string {
    let output = "";
    for (const [key, value] of elementCounts.entries()) {
        output += `${key}: ${value}, `;
    }
    return output.slice(0, -2); // Verwijder laatste komma en spatie
}

// Global LHV Data (voor snelle toegang in een frontend context)
// In een echte applicatie zou dit State Management of dependency injection gebruiken
let isLHVDataLoaded = false;

// Async functie om de LHV data te initialiseren
async function initializeLHVData() {
    try {
        await loadLHVData('./producten.json'); // Pas het pad aan indien nodig
        isLHVDataLoaded = true;
        console.log('LHV data is klaar voor gebruik.');
    } catch (error) {
        console.error('Kon LHV data niet laden, LHV functies zullen niet werken.', error);
    }
}

// Roep initializeLHVData aan bij het starten van de applicatie
initializeLHVData();


// Voorbeeld gebruik van de klassen
async function runExample() {
    // 1. ChemicalElement testen
    try {
        const hydrogen = ChemicalElement.getElement('H');
        const carbon = ChemicalElement.getElement('C');
        console.log(`Waterstof molaire massa: ${hydrogen.molarMass} g/mol`);
        console.log(`Koolstof molaire massa: ${carbon.molarMass} g/mol`);
        // const unknown = ChemicalElement.getElement('Xx'); // Dit zal een error gooien
    } catch (error: any) {
        console.error('Fout bij ChemicalElement:', error.message);
    }

    // 2. Component testen
    const methane = new Component("CH4");
    const water = new Component("H2O");
    const ironOxide = new Component("Fe2O3"); // Formule zonder cijfers direct aan het einde van element

    console.log(`\nComponent: ${methane.formula}`);
    console.log(`Elementen in ${methane.formula}: ${formatElementCounts(methane.getElementComposition())}`);
    console.log(`Molaire massa van ${methane.formula}: ${methane.getMolarMass()} g/mol`);

    console.log(`\nComponent: ${water.formula}`);
    console.log(`Elementen in ${water.formula}: ${formatElementCounts(water.getElementComposition())}`);
    console.log(`Molaire massa van ${water.formula}: ${water.getMolarMass()} g/mol`);

    console.log(`\nComponent: ${ironOxide.formula}`);
    console.log(`Elementen in ${ironOxide.formula}: ${formatElementCounts(ironOxide.getElementComposition())}`);
    console.log(`Molaire massa van ${ironOxide.formula}: ${ironOxide.getMolarMass()} g/mol`);

    // Wacht tot LHV data geladen is
    if (!isLHVDataLoaded) {
        console.log('Wachten op LHV data om te laden...');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wacht 1 seconde, of implementeer een betere wachtmechanisme
    }

    // LHV toevoegen aan componenten
    const lhvMethane = findLHVInLoadedData("CH4");
    if (lhvMethane !== null) {
        methane.setLHV(lhvMethane);
        console.log(`LHV van ${methane.formula}: ${methane.getLHV()} kJ/kg`);
    } else {
        console.log(`LHV van ${methane.formula} niet gevonden.`);
    }

    const lhvWater = findLHVInLoadedData("H2O");
    if (lhvWater !== null) {
        water.setLHV(lhvWater);
        console.log(`LHV van ${water.formula}: ${water.getLHV()} kJ/kg`);
    } else {
        console.log(`LHV van ${water.formula} niet gevonden.`);
    }


    // 3. Stream testen
    console.log('\n--- Stream Voorbeeld ---');
    const fuelStream = new Stream();
    fuelStream.addComponent(methane, 80, 'mol%');
    fuelStream.addComponent(new Component("C2H6"), 15, 'mol%'); // Nieuwe component on-the-fly
    fuelStream.addComponent(water, 5, 'mol%');

    try {
        console.log(`Gemiddelde molaire massa van brandstofstroom: ${fuelStream.getAverageMolarMass()} g/mol`);
    } catch (error: any) {
        console.error('Fout bij gemiddelde molaire massa:', error.message);
    }

    // Voor totale LHV moeten we componenten met massa% en ingestelde LHV hebben
    const gasA = new Component("CH4");
    const gasB = new Component("C2H6");

    // Simulatie van LHV waarden laden
    const lhvGasA = findLHVInLoadedData("CH4");
    if (lhvGasA !== null) gasA.setLHV(lhvGasA); else console.warn("LHV voor CH4 niet geladen.");

    const lhvGasB = findLHVInLoadedData("C2H6");
    if (lhvGasB !== null) gasB.setLHV(lhvGasB); else console.warn("LHV voor C2H6 niet geladen.");

    const massFuelStream = new Stream();
    massFuelStream.addComponent(gasA, 70, 'mass%');
    massFuelStream.addComponent(gasB, 30, 'mass%');

    try {
        const totalLHV = massFuelStream.getTotalLHV();
        if (totalLHV !== null) {
            console.log(`Totale LHV van brandstofstroom (massa%): ${totalLHV} kJ/kg`);
        } else {
            console.log('Kon totale LHV van brandstofstroom (massa%) niet berekenen omdat LHV data ontbreekt voor sommige componenten.');
        }
    } catch (error: any) {
        console.error('Fout bij totale LHV:', error.message);
    }
}

// Voer het voorbeeld uit wanneer de DOM geladen is of direct als het een backend-script is
runExample();

// Frontend functies die gekoppeld kunnen worden aan de add-knop en inputvelden
// Zorg ervoor dat deze code in je HTML of een script file is die na de klassen geladen wordt.
/*
// Deze functies (addFn, parseFormula, formatOutput, findLHV) moeten aangepast worden
// om de nieuwe Component, ChemicalElement, Stream en LHVDataFetcher klassen te gebruiken.
// Dit is slechts een schets van hoe je het zou kunnen aanpakken:

// Dummy data voor LHV (vervang door je echte producten.json)
// const dummyLHVData = [[{Formula: "CH4", "WOTAN LHV": 50000}], [{Formula: "H2O", "WOTAN LHV": 0}]];

// Global LHV data (zou nu geladen worden via initializeLHVData)
// let lhvData: LHVComponentData[][] = []; // Dit wordt nu beheerd door lhv-data-fetcher.ts

// Functie die een input field parsed
async function parseFormulaAndDisplay(inputField: HTMLInputElement) {
    const formula = inputField.value;
    const outputLabel = inputField.nextElementSibling as HTMLLabelElement;
    const lhvLabel = inputField.nextElementSibling?.nextElementSibling as HTMLLabelElement;

    // Maak een Component object aan
    const component = new Component(formula);

    try {
        // Parseer de formule en toon de atoomtelling
        const elementCounts = component.getElementComposition();
        outputLabel.textContent = formatElementCounts(elementCounts);

        // Zoek de LHV-waarde op (zorg dat LHV data geladen is)
        if (isLHVDataLoaded) {
            const lhvValue = findLHVInLoadedData(formula);
            if (lhvValue !== null) {
                component.setLHV(lhvValue);
                lhvLabel.textContent = `LHV: ${lhvValue} kJ/kg`;
            } else {
                lhvLabel.textContent = `LHV: N/A`;
            }
        } else {
            lhvLabel.textContent = `LHV: Bezig met laden...`;
        }

        // Optioneel: toon molaire massa
        const molarMass = component.getMolarMass();
        console.log(`Molaire massa van ${formula}: ${molarMass} g/mol`);

    } catch (error: any) {
        outputLabel.textContent = `Fout: ${error.message}`;
        lhvLabel.textContent = '';
    }
}

// Functie om extra inputveld toe te voegen
function addInputField() {
    const divEle = document.getElementById("inputFields");
    if (divEle) {
        divEle.innerHTML += `
            <div class="input-group">
                <input type="text" placeholder="Voer formule in" class="input-field">
                <label class="output-label"></label>
                <label class="lhv-label"></label>
            </div>
        `;
        // Voeg event listener toe aan het nieuwe inputveld
        const newInputField = divEle.lastElementChild?.querySelector('.input-field') as HTMLInputElement;
        if (newInputField) {
            newInputField.addEventListener('input', () => parseFormulaAndDisplay(newInputField));
        }
    }
}

// Zorg ervoor dat de 'add' knop een event listener heeft
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addFormulaButton');
    if (addButton) {
        addButton.addEventListener('click', addInputField);
    }

    // Initialiseer bestaande inputvelden als die er zijn
    document.querySelectorAll('.input-field').forEach(inputField => {
        (inputField as HTMLInputElement).addEventListener('input', () => parseFormulaAndDisplay(inputField as HTMLInputElement));
    });
});
*/