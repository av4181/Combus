/**
 * Representeert een chemisch element met zijn molaire massa.
 */
export class ChemicalElement {
    /** Naam van het element (bijv. "C", "H", "O") */
    readonly symbol: string;
    /** Molaire massa van het element in g/mol */
    readonly molarMass: number;

    /**
     * Een statische Map om snel chemische elementen op te zoeken.
     * Bevat standaard elementen met hun molaire massa's.
     */
    private static readonly elements = new Map<string, ChemicalElement>();

    // Initialiseer de statische map met veelvoorkomende elementen.
    // Molaire massa's zijn afgerond voor dit voorbeeld.
    static {
        ChemicalElement.elements.set("H", new ChemicalElement("H", 1.008));
        ChemicalElement.elements.set("C", new ChemicalElement("C", 12.011));
        ChemicalElement.elements.set("O", new ChemicalElement("O", 15.999));
        ChemicalElement.elements.set("N", new ChemicalElement("N", 14.007));
        ChemicalElement.elements.set("S", new ChemicalElement("S", 32.06));
        ChemicalElement.elements.set("Fe", new ChemicalElement("Fe", 55.845));
        // Voeg hier meer elementen toe indien nodig.
    }

    /**
     * Creëert een instantie van ChemicalElement.
     * @param symbol - Het symbool van het element.
     * @param molarMass - De molaire massa van het element.
     */
    private constructor(symbol: string, molarMass: number) {
        this.symbol = symbol;
        this.molarMass = molarMass;
    }

    /**
     * Haalt een bestaand ChemicalElement object op of creëert een nieuw element als het nog niet bestaat.
     * Dit zorgt ervoor dat er slechts één instantie per element symbool is (singleton-achtig gedrag voor elementen).
     * @param symbol - Het symbool van het element.
     * @returns Het ChemicalElement object.
     * @throws Error als het element niet in de interne lijst voorkomt.
     */
    static getElement(symbol: string): ChemicalElement {
        const element = ChemicalElement.elements.get(symbol);
        if (!element) {
            // In een productieomgeving zou je hier misschien een dynamische lookup of een robuustere foutafhandeling willen.
            throw new Error(`Chemisch element '${symbol}' niet gevonden in de database.`);
        }
        return element;
    }
}

/**
 * Parseert een chemische formule en telt het aantal atomen van elk element.
 * Deze versie behandelt geen haakjes of complexe groepen.
 * @param formula - De chemische formule (bijv. "H2O", "Fe2H3OH").
 * @returns Een Map met element symbolen als sleutels en hun aantallen als waarden.
 */
export function parseFormulaToElementCounts(formula: string): Map<string, number> {
    const elementCounts = new Map<string, number>();
    let i = 0;

    while (i < formula.length) {
        let currentElementSymbol = '';
        let currentCount = 0;

        // Lees het hoofdsymbool (hoofdletter)
        let char = formula.charAt(i);
        if (char.match(/[A-Z]/)) {
            currentElementSymbol += char;
            i++;

            // Lees eventuele kleine letters die bij het symbool horen
            while (i < formula.length && formula.charAt(i).match(/[a-z]/)) {
                currentElementSymbol += formula.charAt(i);
                i++;
            }

            // Lees het aantal (cijfers)
            let numStr = '';
            while (i < formula.length && formula.charAt(i).match(/[0-9]/)) {
                numStr += formula.charAt(i);
                i++;
            }
            currentCount = numStr === '' ? 1 : parseInt(numStr, 10);

            // Voeg toe aan de elementCounts Map
            elementCounts.set(
                currentElementSymbol,
                (elementCounts.get(currentElementSymbol) || 0) + currentCount
            );
        } else {
            // Negeer tekens die geen element symbool beginnen
            i++;
        }
    }

    return elementCounts;
}