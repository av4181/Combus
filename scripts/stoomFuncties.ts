/**
 * Berekent de warmtecapaciteit van oververhitte stoom.
 * @param druk - De druk van de stoom in bar.
 * @param temp - De temperatuur van de stoom in graden Celsius.
 * @returns De warmtecapaciteit van de stoom.
 */
function berekenCPW(druk: number, temp: number): number {
    const fWaarden: number[] = berekenFWaarden(temp);
    let cpw: number;

    if (druk > 10) {
        cpw = berekenCPWHoog(druk, fWaarden);
    } else if (druk > 5) {
        cpw = berekenCPWMiddel(druk, fWaarden);
    } else {
        cpw = berekenCPWLaag(druk, fWaarden);
    }

    // Correctie voor temperatuur
    const temver = berekenTemver(druk); // Functie om TEMVER te berekenen
    if (temp <= temver) {
        cpw = 4.1868;
    }

    return cpw;
}

/**
 * Berekent de F-waarden op basis van de temperatuur.
 * @param temp - De temperatuur van de stoom.
 * @returns Een array met de berekende F-waarden.
 */
function berekenFWaarden(temp: number): number[] {
    const f: number[] = [];

    f[0] = 2.26979 - 0.0034499 * temp + 0.0000134907 * temp ** 2 - 0.0000000192245 * temp ** 3 + 0.0000000000100016 * temp ** 4;
    f[1] = 3.24107 - 0.0108088 * temp + 0.0000352004 * temp ** 2 - 0.0000000479498 * temp ** 3 + 0.0000000000242319 * temp ** 4;
    f[2] = 4.84687 - 0.0232373 * temp + 0.0000718503 * temp ** 2 - 0.0000000955852 * temp ** 3 + 0.000000000470506 * temp ** 4;
    f[3] = 4.92641 - 0.0191858 * temp + 0.0000503378 * temp ** 2 - 0.0000000586168 * temp ** 3 + 0.000000000260562 * temp ** 4;
    f[4] = 8.55156 - 0.0441292 * temp + 0.000115634 * temp ** 2 - 0.000000134717 * temp ** 3 + 0.000000000592233 * temp ** 4;
    f[5] = 24.9184 + 0.176458 * temp + 0.000511215 * temp ** 2 - 0.000000650741 * temp ** 3 + 0.000000306911 * temp ** 4;
    f[6] = 23.0338 + 0.151516 * temp + 0.000415485 * temp ** 2 - 0.000000504777 * temp ** 3 + 0.000000228904 * temp ** 4;
    f[7] = 35.5370 + 0.245374 * temp + 0.000678946 * temp ** 2 - 0.000000830596 * temp ** 3 + 0.000000378368 * temp ** 4;
    f[8] = 55.7552 + 0.399895 * temp + 0.00111813 * temp ** 2 - 0.00000137869 * temp ** 3 + 0.000000631488 * temp ** 4;
    f[9] = 52.5819 + 0.361996 * temp + 0.000979305 * temp ** 2 - 0.00000117360 * temp ** 3 + 0.000000524612 * temp ** 4;
    f[10] = 77.8511 + 0.550009 * temp + 0.00150026 * temp ** 2 - 0.00000180888 * temp ** 3 + 0.000000812045 * temp ** 4;
    f[11] = 117.348 + 0.847521 * temp + 0.00233231 * temp ** 2 - 0.00000283095 * temp ** 3 + 0.00000127716 * temp ** 4;

    return f;
}

/**
 * Berekent CPW voor drukken groter dan 10 bar.
 * @param druk - De druk van de stoom.
 * @param fWaarden - De array met de F-waarden.
 * @returns De berekende CPW-waarde.
 */
function berekenCPWHoog(druk: number, fWaarden: number[]): number {
    let i: number;
    for (i = 20; i <= 100; i += 10) {
        if (druk < i) {
            break;
        }
    }

    if (i > 100) {
        // OVERSCHREDEN BEREIK VAN DE FUNCTIE
        return NaN; // Of gooi een error, afhankelijk van de gewenste foutafhandeling
    }

    const j = i - 10;
    const k = i / 10 + 2;
    const l = k - 1;

    return fWaarden[l - 1] + (druk - j) / 10 * (fWaarden[k - 1] - fWaarden[l - 1]);
}

/**
 * Berekent CPW voor drukken tussen 5 en 10 bar.
 * @param druk - De druk van de stoom.
 * @param fWaarden - De array met de F-waarden.
 * @returns De berekende CPW-waarde.
 */
function berekenCPWMiddel(druk: number, fWaarden: number[]): number {
    return fWaarden[1] + (druk - 5) / 5 * (fWaarden[2] - fWaarden[1]);
}

/**
 * Berekent CPW voor drukken kleiner dan of gelijk aan 5 bar.
 * @param druk - De druk van de stoom.
 * @param fWaarden - De array met de F-waarden.
 * @returns De berekende CPW-waarde.
 */
function berekenCPWLaag(druk: number, fWaarden: number[]): number {
    return fWaarden[0] + (druk - 1) / 4 * (fWaarden[1] - fWaarden[0]);
}

/**
 * Berekent de temperatuur TEMVER op basis van de druk.
 * @param druk - De druk van de stoom.
 * @returns De berekende temperatuur TEMVER.
 */
function berekenTemver(druk: number): number {
    // Implementeer de logica om TEMVER te berekenen op basis van de druk.
    // Aangezien de originele Fortran code deze functie aanroept:
    // CALL ENTHAA (TEMVER, DRUK, A1, A2,A3,A,0)
    // en de code voor ENTHAA niet is meegeleverd, is dit een placeholder.
    // Je moet deze functie nog implementeren op basis van de ENTHAA implementatie.
    return 0; // Placeholder
}

// Voorbeeldgebruik
const druk = 8; // bar
const temp = 400; // graden Celsius
const cpw = berekenCPW(druk, temp);

console.log(`De warmtecapaciteit (CPW) bij ${druk} bar en ${temp} graden Celsius is: ${cpw}`);