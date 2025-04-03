/**
 * Berekent de stralingsemissie.
 * @param I - Index voor de stralingsberekening (1, 2 of 3).
 * @param X - Een parameter.
 * @param Y - Een andere parameter.
 * @param EPS - De berekende emissie.
 * @param V - Een waarde.
 */
function EPSIL(I: number, X: number, Y: number, EPS: number, V: number) {
    const A = [
        [0.103693E+01, 0.902430E+00, 0.828204E+00, 0.185042E+01, 0.592914E+00],
        [0.278472E-04, 0.361332E-03, 0.981404E-03, -0.191858E-01, -0.441292E-01],
        [0.392958E-06, -0.164362E-06, -0.790052E-06, 0.503378E-04, 0.115634E-03],
        [-0.313739E-09, 0.216244E-10, 0.328413E-09, -0.586168E-07, -0.134717E-06],
        [0.720044E-13, 0.354211E-14, -0.546602E-13, 0.260562E-10, 0.592233E-10],
        [0.324107E+01, 0.484687E+01, 4.92641, 8.55156, 24.9184],
        [-0.108088E-01, -0.232373E-01, -0.191858E-01, -0.441292E-01, 0.176458],
        [0.352004E-04, 0.718503E-04, 0.503378E-04, 0.115634E-03, 0.511215E-03],
        [-0.479498E-07, -0.955852E-07, -0.586168E-07, -0.134717E-06, -0.650741E-06],
        [0.242319E-10, 0.470506E-10, 0.260562E-10, 0.592233E-10, 0.306911E-09],
        [0.0181583, 0.0177624, 0.0105287, -0.0036744, 0.0146543]
    ];

    let EA = 0;
    let EB = 0;
    let EC = 0;
    let ED = 0;

    const I1 = 3 * (I - 1) + 1;
    const I2 = I1 + 1;
    const I3 = I2 + 1;
    const I4 = I3 + 1;

    for (let J = 1; J <= 11; J++) {
        EA = EA + A[J - 1][I1 - 1] * X ** (J - 1);
        EB = EB + A[J - 1][I2 - 1] * X ** (J - 1);
        EC = EC + A[J - 1][I3 - 1] * Y ** (J - 1);
        ED = ED + A[J - 1][I4 - 1] * X ** (J - 1);
    }

    if (I === 1) {
        EPS = EB * (Y - 0.1) / 9. * 10. + EC;
        goto70();
    } else if (I === 2) {
        if (Y === 0.6) {
            EPS = 0;
        }
        if (Y < 0.6) {
            EPS = EA * (0.6 - Y) / 4. * 10. + EC;
        }
        if (Y > 0.6) {
            EPS = EA * (Y - 0.6) / 4. * 10. + EC;
        }
        goto70();
    } else if (I === 3) {
        EPS = EA + (EB - EA) * (Y - 0.1) / 9. * 10. + EC;
        V = ED;
        goto70();
    }

    function goto70() {
        if (ITSSN === 1) {
            console.log(`EPSIL: I: ${I}, X: ${X}, Y: ${Y}, EA: ${EA}, EB: ${EB}, EC: ${EC}, EPS: ${EPS}, V: ${V}`);
        }
    }
    return EPS;
}

/**
 * Berekent een functie van X1 en X2.
 * @param X1 - Een array van getallen.
 * @param X2 - Een array van getallen.
 * @param XA - Een parameter.
 * @param ITSSN - Een controleparameter.
 */
function FUNKBP(X1: number[], X2: number[], XA: number[], ITSSN: number) {
    const X: number[] = [];
    const Y: number[][] = [];
    const A: number[] = [];
    const XX: number[][] = [];
    const XZ: number[] = [];

    for (let I = 0; I < 11; I++) {
        XZ[I] = 0;
        X[I] = 0;
        for (let J = 0; J < 11; J++) {
            XX[I][J] = 0;
            Y[I][J] = 0;
        }
    }

    for (let I = 0; I < 11; I++) {
        X[I] = X1[I];
        Y[I][0] = X2[I];
    }

    for (let I = 1; I < 11; I++) {
        if (X[I] === 0) {
            continue; //  Simuleert GO TO 35
        }
        let IAANT = 11 - I;
        if (IAANT <= 1) {
            goto69();
            return;
        }
        const K2 = IAANT - 1;

        if (ITSSN === 1) {
            console.log('1' + 'BEREKENING TOT DE '.padEnd(40) + K2 + 'DE MACHT'.padEnd(31) + '*');
            console.log('*'.repeat(40));
        }

        for (let J = 1; J <= IAANT; J++) {
            for (let II = J; II <= IAANT; II++) {
                Y[II][J] = (Y[II][J - 1] - Y[J - 1][J - 1]) / (X[II] - X[J - 1]);
            }
        }

        if (ITSSN === 1) {
            console.log(X.map((xi, i) => xi.toFixed(3) + '   ' + Y[i].map(yi => yi.toFixed(3)).join('   ')).join('\n'));
        }

        for (let I = 0; I < 11; I++) {
            A[I] = Y[I][0];
            XX[0][I] = 1;
        }

        for (let I = 1; I < IAANT; I++) {
            for (let J = 1; J < 11; J++) {
                XX[I][J] = XX[I - 1][J] * X[I - 1] + XX[I - 1][J - 1];
            }
        }

        if (ITSSN === 1) {
            console.log(XX.map(row => row.map(val => val.toFixed(3)).join('   ')).join('\n'));
        }

        for (let I = 0; I < IAANT; I++) {
            for (let J = 0; J < 11; J++) {
                XZ[J] = XZ[J] + XX[I][J] * A[I];
            }
        }

        if (ITSSN === 1) {
            console.log(XZ.map(xi => xi.toFixed(2)).join('   '));
        }

        for (let I = 0; I < 11; I++) {
            XA[I] = XZ[11 - 1 - I];
        }

        if (ITSSN === 1) {
            console.log('DE FORMULE WORDT'.padEnd(40) + 'Y='.padEnd(13) + XA.map(xa => xa.toExponential(3)).join(' + ').padEnd(53) + '/');
        }

        for (let I = 1; I <= IAANT; I++) {
            let Z = 0;
            for (let J = 1; J <= IAANT; J++) {
                if (XA[J] * X[I] === 0) {
                    continue; //  Simuleert GO TO 60
                }
                Z = Z + XA[J] * X[I] ** (J - 1);
            }
            const ZB = Math.abs(Y[I][0] - Z);
            let ZC = 0;
            if (Z !== 0) {
                ZC = Math.abs(ZB / Y[I][0] * 100);
            }

            if (ITSSN === 1) {
                console.log(`RESULTATEN: X=${X[I].toFixed(3)}, Y=${Y[I][0].toFixed(3)}, Z=${Z.toFixed(3)}, FOUT ${ZB.toFixed(5)}   ${ZC.toFixed(5)}%`);
            }
            //  II = IFIX(80. * (1. - I) / (IAANT - 1.) + 1.5);  //  Niet gebruikt
        }
    }

    function goto69() {
        //  Implementeer de logica voor label 69
    }
}

/**
 * Berekent de warmteoverdrachtscoëfficiënt voor een pijp.
 * @param XN2 - Parameter.
 * @param XO2 - Parameter.
 * @param XCO2 - Parameter.
 * @param XH2O - Parameter.
 * @param XSO2 - Parameter.
 * @param TEMG - Temperatuur van het gas.
 * @param TEMW - Temperatuur van de wand.
 * @param PIJPD - Diameter van de pijp.
 * @param PIJPL - Lengte van de pijp.
 * @param DM - Massastroom.
 * @param ALF - De berekende warmteoverdrachtscoëfficiënt.
 * @param ITSSN - Een controleparameter.
 */
function ALFIN(XN2: number, XO2: number, XCO2: number, XH2O: number, XSO2: number, TEMG: number, TEMW: number, PIJPD: number, PIJPL: number, DM: number, ALF: number, ITSSN: number) {
    const PI = 3.141592654;

    if (PIJPD <= 0 || PIJPL <= 0 || DM <= 0) {
        goto30();
        return;
    }

    const AA = 0;  //  Placeholder
    const A = 0;   //  Placeholder
    const YLAM = 0;  //  Placeholder

    const DYNWAN = TYPVA(XN2, XO2, XCO2, XH2O, XSO2, TEMW, AA, A, 0, ITSSN);  //  PLACEHOLDER
    const DYNGAS = TYPVA(XN2, XO2, XCO2, XH2O, XSO2, TEMG, 0, 0, YLAM, 0, ITSSN);  //  PLACEHOLDER

    const RE = 4. * DM / (PI * PIJPD * DYNGAS);

    if (RE < 1016.32) {
        goto30();
        return;
    }

    const CPW = 0;  //  Placeholder
    const PR = CPW * DYNGAS / YLAM / 1000;

    const XNUS = 0.037 * (RE ** 0.75 - 180.) * PR ** 0.42 * (1. + (PIJPD / PIJPL) ** (2. / 3.)) * (DYNGAS / DYNWAN) ** 0.14;

    ALF = YLAM * XNUS / PIJPD;

    goto35();

    function goto30() {
        ALF = 0;
    }

    function goto35() {
        if (ITSSN !== 1) {
            return;
        }
        console.log(`ALFIN: TEMPG: ${TEMG}, TEMW: ${TEMW}, PIJPD: ${PIJPD}, DM: ${DM}, RE: ${RE}, XNUS: ${XNUS}, ALF: ${ALF}`);
    }
}

/**
 * Berekent de warmteoverdrachtscoëfficiënt voor stoom in pijpen.
 * @param DRUK - Druk van de stoom.
 * @param TEMS - Temperatuur van de stoom.
 * @param TEMW - Temperatuur van de wand.
 * @param PIJPD - Diameter van de pijp.
 * @param PIJPL - Lengte van de pijp.
 * @param DM - Massastroom.
 * @param ALF - De berekende warmteoverdrachtscoëfficiënt.
 * @param ITSSN - Een controleparameter.
 */
function ALFINS(DRUK: number, TEMS: number, TEMW: number, PIJPD: number, PIJPL: number, DM: number, ALF: number, ITSSN: number) {
    const PI = 3.141592654;

    const VOLUME = 0;  //  Placeholder
    const A1 = 0;  //  Placeholder
    const A2 = 0;  //  Placeholder
    const A3 = 0;  //  Placeholder
    const A4 = 0;  //  Placeholder
    const Aa = 0;  //  Placeholder
    const A = 0;   //  Placeholder

    const ENTHAL_RESULT = ENTHAL(TEMW, DRUK, VOLUME, A1, A2, A3, A4, Aa, A, 0);  //  PLACEHOLDER
    const VISCOS_RESULT = VISCOS(VOLUME, TEMW, 0, ITSSN);  //  PLACEHOLDER
    const VISWAN = VISCOS_RESULT;

    const ENTHAL_RESULT_S = ENTHAL(TEMS, DRUK, VOLUME, A1, A2, A3, A4, Aa, A, 0);  //  PLACEHOLDER
    const VISCOS_RESULT_S = VISCOS(VOLUME, TEMS, 0, ITSSN);  //  PLACEHOLDER
    const VISSTO = VISCOS_RESULT_S;

    const YLAMS = CONDUC(VOLUME, TEMS, ITSSN);  //  PLACEHOLDER
    const CPW = CPWOVS(DRUK, TEMS, ITSSN);  //  PLACEHOLDER

    const RE = 4. * DM / (PI * PIJPD * VISSTO);
    const PR = CPW * VISSTO / YLAMS / 1000.;

    const XNUS = 0.037 * (RE ** 0.75 - 180.) * PR ** 0.42 * (1. + (PIJPD / PIJPL) ** (2. / 3.)) * (VISSTO / VISWAN) ** 0.14;

    ALF = YLAMS * XNUS / PIJPD;

    if (ALF <= 0.) {
        ALF = 0.55555555;
    }

    if (ITSSN === 1) {
        console.log(`ALFINS: TEMS: ${TEMS}, TEMW: ${TEMW}, PIJPD: ${PIJPD}, DM: ${DM}, RE: ${RE}, XNUS: ${XNUS}, ALF: ${ALF}`);
    }
}

/**
 * Berekent de warmteoverdrachtscoëfficiënt voor rechthoekige kanalen.
 * @param XN2 - Parameter.
 * @param XO2 - Parameter.
 * @param XCO2 - Parameter.
 * @param XH2O - Parameter.
 * @param XSO2 - Parameter.
 * @param TEMG - Temperatuur van het gas.
 * @param TEMW - Temperatuur van de wand.
 * @param DHYDR - Hydraulische diameter.
 * @param RKBREE - Breedte van het kanaal.
 * @param RKHOOG - Hoogte van het kanaal.
 * @param RKLENG - Lengte van het kanaal.
 * @param DM - Massastroom.
 * @param ALF - De berekende warmteoverdrachtscoëfficiënt.
 * @param ITSSN - Een controleparameter.
 */
function ALFINR(XN2: number, XO2: number, XCO2: number, XH2O: number, XSO2: number, TEMG: number, TEMW: number, DHYDR: number, RKBREE: number, RKHOOG: number, RKLENG: number, DM: number, ALF: number, ITSSN: number) {
    const PI = 3.141592654;

    if (DHYDR <= 0. || RKBREE < 0. || RKHOOG < 0. || RKLENG <= 0. || DM <= 0) {
        goto30();
        return;
    }

    const AA = 0;  //  Placeholder
    const A = 0;   //  Placeholder
    const YLAM = 0;  //  Placeholder

    const DYNWAN = TYPVA(XN2, XO2, XCO2, XH2O, XSO2, TEMW, AA, A, 0, ITSSN);  //  PLACEHOLDER
    const DYNGAS = TYPVA(XN2, XO2, XCO2, XH2O, XSO2, TEMG, 0, 0, YLAM, 0, ITSSN);  //  PLACEHOLDER

    const RE = DM * DHYDR / (RKBREE * RKHOOG * DYNGAS);

    if (RE < 101.632) {
        goto30();
        return;
    }

    const CPW = 0;  //  Placeholder
    const PR = CPW * DYNGAS / YLAM / 1000;

    const XNUS = 0.037 * (RE ** 0.75 - 180.) * PR ** 0.42 * (1. + (DHYDR / RKLENG) ** (2. / 3.)) * (DYNGAS / DYNWAN) ** 0.14;

    ALF = YLAM * XNUS / DHYDR;

    goto35();

    function goto30() {
        ALF = 0;
    }

    function goto35() {
        if (ITSSN !== 1) {
            return;
        }
        console.log(`ALFINR: TEMG: ${TEMG}, TEMW: ${TEMW}, DHYDR: ${DHYDR}, DM: ${DM}, RE: ${RE}, XNUS: ${XNUS}, ALF: ${ALF}`);
    }
}

/**
 * Berekent de warmteoverdrachtscoëfficiënt voor een pijp met dwarsstroming.
 * @param XN2 - Parameter.
 * @param XO2 - Parameter.
 * @param XCO2 - Parameter.
 * @param XH2O - Parameter.
 * @param XSO2 - Parameter.
 * @param TEMG - Temperatuur van het gas.
 * @param PIJPDU - Diameter van de pijp.
 * @param DM - Massastroom.
 * @param RKBREE - Breedte.
 * @param RKHOOG - Hoogte.
 * @param TB - Parameter.
 * @param TL - Parameter.
 * @param ALF - De berekende warmteoverdrachtscoëfficiënt.
 * @param KCON - Parameter.
 * @param ITSSN - Een controleparameter.
 */
function ALFUID(XN2: number, XO2: number, XCO2: number, XH2O: number, XSO2: number, TEMG: number, PIJPDU: number, DM: number, RKBREE: number, RKHOOG: number, TB: number, TL: number, ALF: number, KCON: number, ITSSN: number) {
    const PI = 3.141592654;

    if (TB <= 0. || TL <= 0. || DM <= 0. || RKHOOG <= 0. || RKBREE <= 0.) {
        goto40();
        return;
    }

    const EL = TL / PIJPDU;
    const EB = TB / PIJPDU;
    const PSI = 1. - PI / (4. * EL * EB);
    const F1 = 4. / PI * EB * PSI;

    const AA = 0;  //  Placeholder
    const A = 0;   //  Placeholder
    const YLAMB = 0;  //  Placeholder

    const DYNVIS = TYPVA(XN2, XO2, XCO2, XH2O, XSO2, TEMG, 0, 0, YLAMB, 0, ITSSN);  //  PLACEHOLDER

    const RE = DM * PI * PIJPDU / (2. * RKBREE * RKHOOG * PSI * DYNVIS);
    const CPW = 0;  //  Placeholder
    const PR = CPW * DYNVIS / YLAMB * 1000;

    let FEA = 1. + (1.87 - 1.70 / EL) / (1.90 - 1.80 / EL);
    if (KCON !== 1) {
        FEA = 1.;
    }

    if (F1 < 3.04 && FEA < 1.58) {
        FEA = 1.58;
    }

    const XNUS = (1.95 + 0.178 * RE ** 0.4 * PR ** 0.116) ** 2. * PR ** 0.19 * FEA;

    if (FEA > (2 + F1)) {
        console.log(`ALFUID: GELDIGHEIDSCRITERIUM VOOR EL EN EB OVERSCHREDEN: FEA: ${FEA}, EL: ${EL}, EB: ${EB}, F1: ${F1}`);
        console.log(`ALFUID: GELDIGHEIDSCRITERIUM VOOR EL EN EB OVERSCHREDEN: FEA: ${FEA}, EL: ${EL}, EB: ${EB}, F1: ${F1}`);
    }

    goto35();

    function goto35() {
        ALF = XNUS * YLAMB * 2 / (PI * PIJPDU);
        goto45();
    }

    function goto40() {
        ALF = 0.;
    }

    function goto45() {
        if (ITSSN === 1) {
            console.log(`ALFUID: TEM: ${TEMG}, PIJPDU: ${PIJPDU}, DM: ${DM}, RKBREE: ${RKBREE}, RE: ${RE}, XNUS: ${XNUS}, ALF: ${ALF}`);
        }
    }
}
/**
 * Berekent de stralingscoëfficiënt.
 * @param TEMPG - Temperatuur van het gas.
 * @param TEMPW - Temperatuur van de wand.
 * @param P - Druk.
 * @param PH2O - Partiële druk van waterdamp.
 * @param PCO2 - Partiële druk van koolstofdioxide.
 * @param KCON1 - Parameter.
 * @param T - Parameter.
 * @param T1 - Parameter.
 * @param SS - Parameter.
 * @param DA - Parameter.
 * @param KCON2 - Parameter.
 * @param X - Parameter.
 * @param XB - Parameter.
 * @param XT - Parameter.
 * @param XH - Parameter.
 * @param TL - Parameter.
 * @param TB - Parameter.
 * @param ALFAS - De berekende stralingscoëfficiënt.
 * @param ITSSN - Een controleparameter.
 */
function ALFSTR(TEMPG: number, TEMPW: number, P: number, PH2O: number, PCO2: number, KCON1: number, T: number, T1: number, SS: number, DA: number, KCON2: number, X: number, XB: number, XT: number, XH: number, TL: number, TB: number, ALFAS: number, ITSSN: number) {
    const B = [
        9.251678472, -12.367469009, 4.651081915, -0.89577796386, 0.06757510016, -0.82237875113, -2.1859738718,
        -2.64567384259, 0.66164969280, -0.12847760843, -0.0755410577385, 1.0944269595, 0.55131798057, -0.61388840193,
        0.13221469066, -0.10852911458, 0.011662882139, -0.41307039045, 0.28400233913, -0.055026701041,
        0.2098241444, -3.7950744964, 0.6781068982, -0.051107800042, -0.277365924933, 4.498492240772, -0.776435735758,
        0.06030410021, 0.3460208861
    ];

    const ALFAW = 0.85;
    const CS = 5.77;

    if (P <= 0. || DA <= 0. || TEMPW >= TEMPG || TEMPW <= 0.) {
        goto67();
        return;
    }

    const PI = 3.141592654;

    let FIS: number;

    if (KCON1 !== 1) {
        goto23();
    } else {
        FIS = 1;
    }

    function goto21() {
        const E = T / DA;
        FIS = 1 - ((E ** 2 - 1) ** 0.5 - Math.atan((E ** 2 - 1) ** 0.5) / E) ** 2.;
        goto25();
    }

    function goto22() {
        const T2 = (DA ** 2 - SS ** 2.) ** 0.5;
        const T1 = T - T2;
        FIS = DA / T2 * (T - (T * T1) ** 0.5) / DA + 0.5 * Math.atan(((DA ** 2 + 2 * T1 * T2) * (T * T1) ** 0.5 - T1 * SS * DA) / ((DA ** 2 + 2 * T1 * T2) * DA / 2 + 2 * T1 * SS * (T * T1) ** 0.5));
        goto25();
    }

    function goto23() {
        FIS = 1.;
    }

    function goto25() {
        //  Leeg
    }

    let S: number;

    if (KCON2 !== 2) {
        goto30();
    } else {
        S = XB * 1.7 / (1 + XB / XT + XB / XH);
        if (XT / XB < 1 || XH / XB < 1) {
            console.log(`ALFSTR: VEILIGHEIDSCRITERIUM OVERSCHREDEN XB: ${XB}, XH: ${XH}, XT: ${XT}`);
        }
        goto45();
    }

    function goto30() {
        S = D * 0.9 / (1 + 0.5 / (X / D));
        goto45();
    }

    function goto40() {
        S = 0.85 * T * (4 * T / (PI * DA) - DA / T) / (1 + T / (2 * X) * (4 * T / (PI * DA) - DA / T));
        goto45();
    }

    function goto45() {
        const TT = (TL * TB) ** 0.5;

        const FH2O = Math.exp(0.842036 * (0.23 / (0.23 + PH2O * S)) ** (1. / 3.) * (1. / 0.75 - 2. / (0.5 + PH2O + P)));
        if ((PH2O + P) / 2. < 0.5 || PH2O * S < 0.) {
            FH