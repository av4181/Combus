import { Component } from './component';

/** Type voor de eenheid van concentratie. */
export type ConcentrationUnit = 'mol%' | 'vol%' | 'mass%';

/**
 * Representeert een stroom, een verzameling van componenten met hun concentraties.
 */
export class Stream {
    private components: { component: Component, concentration: number, unit: ConcentrationUnit }[] = [];

    /**
     * Voegt een component toe aan de stroom.
     * @param component - Het Component object.
     * @param concentration - De concentratie van de component in de opgegeven eenheid.
     * @param unit - De eenheid van concentratie (mol%, vol%, mass%).
     */
    addComponent(component: Component, concentration: number, unit: ConcentrationUnit): void {
        // Basic validatie: concentratie moet tussen 0 en 100 liggen
        if (concentration < 0 || concentration > 100) {
            throw new Error('Concentratie moet tussen 0 en 100 liggen.');
        }
        this.components.push({ component, concentration, unit });
    }

    /**
     * Retourneert de lijst van componenten in de stroom.
     * @returns Een array van componenten met hun concentraties en eenheden.
     */
    getComponents(): readonly { component: Component, concentration: number, unit: ConcentrationUnit }[] {
        return this.components;
    }

    /**
     * Berekent de gemiddelde molaire massa van de stroom.
     * Vereist dat alle concentraties in mol% zijn opgegeven.
     * @returns De gemiddelde molaire massa in g/mol.
     * @throws Error als niet alle componenten in mol% zijn opgegeven.
     */
    getAverageMolarMass(): number {
        const totalMolPercentage = this.components.reduce((sum, c) => {
            if (c.unit !== 'mol%') {
                throw new Error('Alle componenten moeten in mol% zijn opgegeven om de gemiddelde molaire massa te berekenen.');
            }
            return sum + c.concentration;
        }, 0);

        if (totalMolPercentage === 0) {
            return 0; // Lege stroom of geen gespecificeerde componenten
        }

        // Normaliseer percentages voor het geval het totaal niet precies 100 is (door afronding etc.)
        const normalizedComponents = this.components.map(c => ({
            component: c.component,
            fraction: c.concentration / totalMolPercentage
        }));

        return normalizedComponents.reduce((sum, c) => {
            return sum + c.component.getMolarMass() * c.fraction;
        }, 0);
    }

    /**
     * Berekent de totale LHV van de stroom op basis van de massafracties.
     * @returns De totale LHV van de stroom, of null als LHV niet beschikbaar is voor alle componenten.
     * @throws Error als niet alle componenten in massa% zijn opgegeven of als LHV niet is ingesteld voor een component.
     */
    getTotalLHV(): number | null {
        const componentsWithMassLHV = this.components.map(item => {
            if (item.unit !== 'mass%') {
                throw new Error('Alle componenten moeten in massa% zijn opgegeven om de totale LHV te berekenen.');
            }
            const lhv = item.component.getLHV();
            if (lhv === null) {
                console.warn(`LHV niet beschikbaar voor component: ${item.component.formula}`);
                return null; // Als een LHV ontbreekt, kunnen we geen totale LHV berekenen, of we kunnen een deelresultaat retourneren.
            }
            return {
                component: item.component,
                concentration: item.concentration,
                lhv: lhv
            };
        }).filter(Boolean) as { component: Component, concentration: number, lhv: number }[]; // Filter nulls eruit en assert type

        if (componentsWithMassLHV.length === 0 && this.components.length > 0) {
            return null; // Geen LHV beschikbaar voor enige component in de stroom
        } else if (componentsWithMassLHV.length === 0 && this.components.length === 0) {
            return 0; // Lege stroom
        }


        const totalMassPercentage = componentsWithMassLHV.reduce((sum, c) => sum + c.concentration, 0);

        if (totalMassPercentage === 0) {
            return 0;
        }

        const normalizedComponents = componentsWithMassLHV.map(c => ({
            component: c.component,
            fraction: c.concentration / totalMassPercentage,
            lhv: c.lhv
        }));

        return normalizedComponents.reduce((sum, c) => {
            return sum + c.lhv * c.fraction;
        }, 0);
    }

    // Verdere methoden zoals conversie tussen eenheden, totale volumestroom, etc. kunnen hier worden toegevoegd.
}