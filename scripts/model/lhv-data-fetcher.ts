// Simulatie van de JSON data structuur
export interface LHVComponentData {
    Formula: string;
    "WOTAN LHV": number;
    // Andere eigenschappen in je JSON-bestand kunnen hier ook worden toegevoegd.
}

export type LHVData = LHVComponentData[][]; // Zoals je voorbeeld 'lhvData' een array van arrays van objecten lijkt te zijn

let lhvData: LHVData | null = null;

/**
 * Laadt de LHV-data vanuit een JSON-bestand.
 * @param filePath - Het pad naar het JSON-bestand.
 * @returns Een Promise die resolved met de geladen LHVData.
 */
export async function loadLHVData(filePath: string): Promise<LHVData> {
    if (lhvData) {
        return lhvData; // Retourneer gecachte data als al geladen
    }
    try {
        // In een Node.js omgeving:
        const fs = await import('fs/promises');
        const data = await fs.readFile(filePath, 'utf-8');
        lhvData = JSON.parse(data) as LHVData;
        console.log('LHV data succesvol geladen.');
        return lhvData;
    } catch (error) {
        // In een browser omgeving zou je fetch gebruiken:
        // const response = await fetch(filePath);
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // lhvData = await response.json() as LHVData;
        console.error('Fout bij het laden van LHV data:', error);
        throw error;
    }
}

/**
 * Zoekt de LHV-waarde op voor een gegeven chemische formule.
 * @param formula - De chemische formule.
 * @returns De LHV-waarde, of null als de formule niet wordt gevonden.
 */
export function findLHVInLoadedData(formula: string): number | null {
    if (!lhvData) {
        console.warn('LHV data is nog niet geladen. Laad eerst de data met loadLHVData().');
        return null;
    }

    // Zoek de formule in de JSON-data
    for (const group of lhvData) {
        const component = group.find(comp => comp.Formula === formula);
        if (component) {
            return component["WOTAN LHV"];
        }
    }
    return null; // Formule niet gevonden
}