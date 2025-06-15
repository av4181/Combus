import { ChemicalElement } from './chemical-element';
import { parseFormulaToElementCounts } from './formula-parser';

/**
 * Vertegenwoordigt een chemische component (molecuul).
 */
export class Component {
    readonly formula: string;
    private _molarMass: number | null = null;
    private _elementComposition: Map<string, number> | null = null;
    private _lhv: number | null = null; // Lower Heating Value in kJ/kg of andere eenheid

    constructor(formula: string) {
        this.formula = formula;
    }

    /**
     * Berekent en retourneert de molaire massa van de component.
     * De molaire massa wordt gecached na de eerste berekening.
     * @returns De molaire massa in g/mol.
     * @throws Error als een element in de formule niet herkend wordt.
     */
    getMolarMass(): number {
        if (this._molarMass !== null) {
            return this._molarMass;
        }

        const elementCounts = this.getElementComposition();
        let totalMolarMass = 0;

        for (const [symbol, count] of elementCounts.entries()) {
            const element = ChemicalElement.getElement(symbol); // Haalt ChemicalElement object op
            totalMolarMass += element.molarMass * count;
        }

        this._molarMass = totalMolarMass;
        return this._molarMass;
    }

    /**
     * Parseert de formule en retourneert een Map met de telling van elk element.
     * De compositie wordt gecached na de eerste parsing.
     * @returns Een Map met element symbolen als sleutels en hun aantallen als waarden.
     */
    getElementComposition(): Map<string, number> {
        if (this._elementComposition !== null) {
            return this._elementComposition;
        }
        this._elementComposition = parseFormulaToElementCounts(this.formula);
        return this._elementComposition;
    }

    /**
     * Stelt de Lower Heating Value (LHV) in voor deze component.
     * Dit zou typisch geladen worden vanuit een externe bron zoals een JSON-bestand.
     * @param lhv - De Lower Heating Value.
     */
    setLHV(lhv: number): void {
        this._lhv = lhv;
    }

    /**
     * Retourneert de Lower Heating Value (LHV) van de component.
     * @returns De LHV waarde, of null als deze niet is ingesteld.
     */
    getLHV(): number | null {
        return this._lhv;
    }
}