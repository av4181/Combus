/**
 * Berekent de drukval in een rookgaskanaal.
 * @param XN2 - Parameter.
 * @param XO2 - Parameter.
 * @param XCO2 - Parameter.
 * @param XH2O - Parameter.
 * @param XSO2 - Parameter.
 * @param ROGAS - Parameter.
 * @param DMROOK - Rookgasdebiet.
 * @param FMTKET - Array van ketelformaten.
 * @param FMTDLN - Array van lijnformaten.
 * @param ITSSN - Parameter.
 */
function RKDRUK(XN2: number, XO2: number, XCO2: number, XH2O: number, XSO2: number, ROGAS: number, DMROOK: number, FMTKET: string[], FMTDLN: string[], ITSSN: number) {
    //  Simulatie van COMMON blocks
    let CGEGEV: any = {};
    let CRESUL: any = {};
    let CDRURO: any = {};

    const BLAN = '    '; // 4 spaces
    const RUWH: number[] = Array(20).fill(0.00025);

    if (ITSSN >= 1 && ITSSN <= 3) {
        console.log('STDRUK/ 6X, PIJPD PIJPN DRUKGM RUWH BO NR BO GR ZETA EPS EPSTOT DRUK BO AN BOR TEMS V RE VGEM IRK');  //  PLACEHOLDER
    }

    for (let I = 1; I <= 30; I++) {
        CDRURO.RDRUK[I - 1] = 0.;
    }

    for (let IOPP = 1; IOPP <= 20; IOPP++) {
        CDRURO.RRE[IOPP - 1] = 0.;
        CDRURO.RZETA[IOPP - 1] = 0.;
        let FE = 0.;
        let FZ = 0.;
        let Z = 0.;

        CDRURO.REPS[IOPP - 1] = 0.;

        if (FMTKET[IOPP - 1] === BLAN) {
            goto72();
            continue;
        }

        const TEMGEM = (CRESUL.TEMR[IOPP] + CRESUL.TEMR[IOPP + 1]) / 2.;
        const ROGASW = ROGAS * 273. / (273. + TEMGEM);

        for (let K = 1; K <= 20; K++) {
            if (FMTKET[IOPP - 1] === FMTDLN[K - 1]) {
                goto36(K);
                break;
            }
        }
    }

    function goto36(K: number) {
        switch (K) {
            case 1:
            case 2:
            case 3:
            case 4:
                goto1();
                break;
            case 5:
                goto65();
                break;
            case 8:
                goto71();
                break;
            case 14:
                goto1();
                break;
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
                goto71();
                break;
            case 20:
                goto66();
                break;
        }
    }

    function goto1() {
        CDRURO.RV[IOPP - 1] = 4. * DMROOK / (ROGASW * PI * CGEGEV.PIJPD[IOPP - 1] ** 2. * CGEGEV.PIJPN[IOPP - 1]);
        const DYNVIS = TYPVA(XN2, XO2, XCO2, XH2O, XSO2, TEMGEM, 0, 0, 0, 0, ITSSN);  //  PLACEHOLDER
        CDRURO.RRE[IOPP - 1] = 4. * DMROOK / (PI * CGEGEV.PIJPD[IOPP - 1] * DYNVIS * CGEGEV.PIJPN[IOPP - 1]);
        if (CDRURO.RRE[IOPP - 1] <= 2320.) {
            CDRURO.RZETA[IOPP - 1] = 64. / CDRURO.RRE[IOPP - 1];
            goto46();
        }
        let IZET = 0;
        CDRURO.RZETA[IOPP - 1] = 0.015;
        goto40();
    }

    function goto40() {
        let ZETAA = 1. / Math.abs(2.0 * Math.log10(RUWH[IOPP - 1] / CGEGEV.PIJPD[IOPP - 1] / 3.71 + 2.51 / CDRURO.RRE[IOPP - 1] / CDRURO.RZETA[IOPP - 1] ** 0.5)) ** 2.;
        if (Math.abs(CDRURO.RZETA[IOPP - 1] - ZETAA) < 0.0005) {
            goto42();
        }
        CDRURO.RZETA[IOPP - 1] = (CDRURO.RZETA[IOPP - 1] + ZETAA) / 2.;
        IZET++;
        if (IZET < 20.) {
            goto40();
        }
        goto42();
    }

    function goto42() {
        if (CDRURO.RRE[IOPP - 1] * CDRURO.RZETA[IOPP - 1] ** 0.5 * RUWH[IOPP - 1] / CGEGEV.PIJPD[IOPP - 1] < 200.) {
            goto46();
        }
        CDRURO.RZETA[IOPP - 1] = 0.25 / Math.abs(Math.log10(3.7 * CGEGEV.PIJPD[IOPP - 1] / RUWH[IOPP - 1])) ** 2.;
        goto46();
    }

    function goto46() {
        CDRURO.REPS[IOPP - 1] = CDRURO.RZETA[IOPP - 1] * CGEGEV.PIJPL[IOPP - 1] / CGEGEV.PIJPD[IOPP - 1];
        if (FMTKET[IOPP] !== FMTDLN[12]) {  //  FMTDLN(13)
            goto70();
        }
        goto2();
    }

    function goto2() {
        CDRURO.REPS[IOPP - 1] = CDRURO.REPS[IOPP - 1] + 0.50 - 0.50 * PI / 4. * CGEGEV.PIJPD[IOPP] ** 2. * CGEGEV.PIJPN[IOPP] / (CGEGEV.RKHOOG[IOPP] * CGEGEV.RKBREE[IOPP]);
        goto70();
    }

    function goto65() {
        CDRURO.RV[IOPP - 1] = DMROOK / (ROGASW * CGEGEV.RKHOOG[IOPP] * (CGEGEV.RKBREE[IOPP] - CGEGEV.RKBREE[IOPP] / CGEGEV.TB[IOPP] * CGEGEV.PIJPDU[IOPP]));
        const EB = CGEGEV.TB[IOPP] / CGEGEV.PIJPDU[IOPP];
        if (EB < 1.25) {
            EB = 1.25;
        }
        if (EB > 3.00) {
            EB = 3.00;
        }
        const EL = CGEGEV.TH[IOPP] / CGEGEV.PIJPDU[IOPP];
        const PSI = 1. - PI / (4. * EL * EB);
        const DYNVIS = TYPVA(XN2, XO2, XCO2, XH2O, XSO2, TEMGEM, 0, 0, 0, 0, ITSSN);  //  PLACEHOLDER
        const DHYDR = 2. * CGEGEV.RKBREE[IOPP] * CGEGEV.RKHOOG[IOPP] / (CGEGEV.RKBREE[IOPP] + CGEGEV.RKHOOG[IOPP]);
        CDRURO.RRE[IOPP - 1] = 4. * DMROOK / (PI * DHYDR * DYNVIS);
        let FE = 0.30 - 0.05 * (EB - 1.25);
        if (CDRURO.RRE[IOPP - 1] <= 20000.) {
            FE = 0.35 - 0.05 * (EB - 1.25);
        }
        if (CDRURO.RRE[IOPP - 1] <= 10000.) {
            FE = 0.40 - 0.10 * (EB - 1.25);
        }
        if (CDRURO.RRE[IOPP - 1] <= 2000.) {
            FE = 0.50 - 0.15 * (EB - 1.25);
        }
        if (FE < 0.) {
            FE = 0.;
        }
        if (FE > 0.8) {
            FE = 0.8;
        }
        Z = Math.trunc(CGEGEV.RKLENG[IOPP] / CGEGEV.TH[IOPP] + 0.5);
        if (Z < 1) {
            Z = 1;
        }
        FZ = 1. + (3. / EL - 1.) * Z ** (-1.75);
        if (FZ > 1.6) {
            FZ = 1.6;
        }
        if (FZ < 1.0) {
            FZ = 1.0;
        }
        const FSA = 1.;
        CDRURO.REPS[IOPP - 1] = 0.8 * FE * FSA * FZ * Z;
        goto70();
    }

    function goto66() {
        DHYDR = 2. * CGEGEV.RKBREE[IOPP] * CGEGEV.RKHOOG[IOPP] / (CGEGEV.RKBREE[IOPP] + CGEGEV.RKHOOG[IOPP]);
        CDRURO.RV[IOPP - 1] = DMROOK / (ROGASW * CGEGEV.RKHOOG[IOPP] * CGEGEV.RKBREE[IOPP]);
        if (FMTKET[IOPP - 1] === FMTDLN[5]) {  //  FMTDLN(6)
            CDRURO.RV[IOPP - 1] = CRESUL.VROOK[IOPP] * ROGAS / ROGASW;
        }
        const DYNVIS = TYPVA(XN2, XO2, XCO2, XH2O, XSO2, TEMGEM, 0, 0, 0, 0, ITSSN);  //  PLACEHOLDER
        CDRURO.RRE[IOPP - 1] = 4. * DMROOK / (PI * DHYDR * DYNVIS);
        if (CDRURO.RRE[IOPP - 1] <= 2320.) {
            CDRURO.RZETA[IOPP - 1] = 64. / CDRURO.RRE[IOPP - 1];
            goto56();
        }
        let IZET = 0;
        CDRURO.RZETA[IOPP - 1] = 0.015;
        goto50();
    }

    function goto50() {
        let ZETAA = 1. / Math.abs(2.0 * Math.log10(RUWH[IOPP - 1] / DHYDR / 3.71 + 2.51 / CDRURO.RRE[IOPP - 1] / CDRURO.RZETA[IOPP - 1] ** 0.5)) ** 2.;
        if (Math.abs(CDRURO.RZETA[IOPP - 1] - ZETAA) < 0.0005) {
            goto52();
        }
        CDRURO.RZETA[IOPP - 1] = (CDRURO.RZETA[IOPP - 1] + ZETAA) / 2.;
        IZET++;
        if (IZET < 20.) {
            goto50();
        }
        goto52();
    }

    function goto52() {
        if (CDRURO.RRE[IOPP - 1] * CDRURO.RZETA[IOPP - 1] ** 0.5 * RUWH[IOPP - 1] / DHYDR < 200.) {
            goto56();
        }
        CDRURO.RZETA[IOPP - 1] = 0.25 / (Math.log10(3.7 * DHYDR / RUWH[IOPP - 1])) ** 2.;
        goto56();
    }

    function goto56() {
        CDRURO.REPS[IOPP - 1] = CDRURO.RZETA[IOPP - 1] * CGEGEV.PIJPL[IOPP - 1] / DHYDR;
        if (FMTKET[IOPP] !== FMTDLN[12]) {  //  FMTDLN(13)
            goto70();
        }
        goto6();
    }

    function goto6() {
        CDRURO.REPS[IOPP - 1] = CDRURO.REPS[IOPP - 1] + 1.5;
        if (FMTKET[IOPP + 1] !== FMTDLN[0] && FMTKET[IOPP + 1] !== FMTDLN[1] && FMTKET[IOPP + 1] !== FMTDLN[3]) {  //  FMTDLN(1), FMTDLN(2), FMTDLN(4)
            goto70();
        }
        CDRURO.REPS[IOPP - 1] = CDRURO.REPS[IOPP - 1] + .55125 - .525 * PI / 4. * CGEGEV.PIJPD[IOPP + 1] ** 2. * CGEGEV.PIJPN[IOPP + 1] / (CGEGEV.RKBREE[IOPP] * CGEGEV.RKHOOG[IOPP]);
        goto70();
    }

    function goto70() {
        //  Gemeenschappelijke code voor alle gevallen
        //  (kan leeg zijn)
    }

    for (let J = 1; J <= 4; J++) {
        const B = CDRURO.RRE[IOPP - 1] / 1000.;
        const BB = CDRUK[IOPP - 1] / 1000.;
        const BBB = RUWH[IOPP - 1] * 1000.;
        if (J === 1) {
            console.log(FMTDRU[IOPP - 1], CGEGEV.PIJPD[IOPP - 1], CGEGEV.PIJPN[IOPP - 1], DRUKGM, BBB, CGEGEV.BOCHT[IOPP - 1][J - 1], TEMGEM, VOLGEM, B, CDRURO.ZETA[IOPP - 1], CDRURO.EPS[IOPP - 1][J - 1], CDRURO.EPSTOT[IOPP - 1], BB, CDRURO.VGEM[IOPP - 1], CDRURO.IRK[IOPP - 1]);  //  PLACEHOLDER
        } else if (CGEGEV.BOCHT[IOPP - 1][J - 1][2] > 0.) {
            console.log(CGEGEV.BOCHT[IOPP - 1][J - 1], CDRURO.EPS[IOPP - 1][J - 1]);  //  PLACEHOLDER
        }
    }

    if (ITEM[IOPP - 1] !== 0 && ITEM[IOPP] === ITEM[IOPP - 1]) {
        CRESUL.TEMR[IOPP] = CRESUL.TEMR[IOPP - 1];
    }
}

/**
 * Corrigeert de stoomkringloop.
 * @param FMTKET - Array van ketelformaten.
 * @param FMTDLN - Array van lijnformaten.
 * @param STRVER - Parameter.
 * @param RENDEM - Parameter.
 * @param ENTSTI - Parameter.
 * @param TEMSIN - Inlaattemperatuur van de stoom.
 * @param ENTSTB - Parameter.
 */
function CORSTO(FMTKET: string[], FMTDLN: string[], STRVER: number, RENDEM: number, ENTSTI: number, TEMSIN: number, ENTSTB: number) {
    //  Simulatie van COMMON blocks
    let CRECUP: any = {};
    let CRESUL: any = {};
    let ALGEM: any = {};

    const FMTKET_LOC = FMTKET.slice();  //  Maak een kopie om wijzigingen te voorkomen
    const FMTDLN_LOC = FMTDLN.slice();
    const IDTER = ['STOO', 'ROOK', 'VERD', 'TRST', 'TRRO', 'TSST', 'TSRO'];
    const BLAN = '    ';

    let IKOEL = 0;
    let IAANT = 0;

    for (let I = 1; I <= 20; I++) {
        if (FMTKET_LOC[I - 1] === FMTDLN_LOC[19]) {  //  FMTDLN(20)
            IKOEL = I;
        }
        if (FMTKET_LOC[I - 1] !== BLAN) {
            IAANT++;
        }
    }

    let ITOT = IAANT + 1;
    let IENOV = 1;

    for (let I = 1; I <= IAANT; I++) {
        if (CRESUL.IST[I - 1] > CRESUL.IST[IENOV - 1] && CRESUL.IST[I - 1] < 100 && FMTKET_LOC[I - 1] !== FMTDLN_LOC[8]) {  //  FMTDLN(9)
            IENOV = CRESUL.IST[I - 1];
        }
    }

    for (let I = 1; I <= IAANT; I++) {
        if (CRESUL.IST[I - 1] === CRESUL.IST[I]) {
            IRVER = I;
            IVERD = CRESUL.IST[I - 1];
        }
    }

    for (let I = 1; I <= IAANT; I++) {
        if (CRESUL.IST[I - 1] === IVERD + 1) {
            IRVER2 = I;
        }
        CRESUL.Q[I - 1] = CRESUL.Q[I - 1] / (1. + STRVER / RENDEM);
    }

    let QVERD = 0.;

    for (let I = 1; I <= IAANT; I++) {
        if (CRESUL.IST[I - 1] === 1) {
            continue;
        }
        if (CRESUL.TEMS[I - 1] < TEMSIN) {
            CRESUL.TEMS[I - 1] = TEMSIN;
        }
        const ENTWAT = ENTHAL(ALGEM.TWATER, CRESUL.DRUKST[I - 1], 0, 0, 0, 0, 0, 0, 0, ALGEM.ITSSN);  //  PLACEHOLDER
        const ENTVVW = ENTHAL(TEMSIN, CRESUL.DRUKST[I - 1], 0, 0, 0, 0, 0, 0, 0, ALGEM.ITSSN);  //  PLACEHOLDER

        ISTOIN = I;
        CRESUL.ENTST[I - 1] = ENTVVW;
    }

    for (let ITEL = 1; ITEL <= IAANT; ITEL++) {
        let ISIN = 0;
        let ISUI = 0;

        for (let I = 1; I <= ITOT; I++) {
            if (CRESUL.IST[I - 1] === ITEL) {
                ISIN = I;
            }
            if (CRESUL.IST[I - 1] === ITEL + 1) {
                ISUI = I;
            }
        }

        if (ISIN <= 0 || ISUI <= 0) {
            continue;
        }

        if (FMTKET_LOC[ISIN - 1] === FMTDLN_LOC[8]) {  //  FMTDLN(9)
            goto57();
        } else if (CRESUL.IST[ISIN - 1] - IVERD) {
            goto52();
        } else if (CRESUL.IST[ISIN - 1] === IVERD) {
            goto54();
        } else {
            goto56();
        }
    }

    function goto52() {
        CRESUL.ENTST[ISUI - 1] = CRESUL.ENTST[ISIN - 1] + CRESUL.Q[ISIN - 1] / (CRESUL.STOODM[ISIN - 1] * 1000.);
        const QVOORW = CRESUL.STOODM[ISIN - 1] * 1000. * (ENTVVW - ALGEM.TWATER);
        if (CRESUL.IST[ISUI - 1] !== IVERD) {
            return;
        }
        for (let I = 1; I <= 20; I++) {
            if (CRESUL.IST[I - 1] === IVERD) {
                CRESUL.ENTST[I - 1] = CRESUL.ENTST[ISUI - 1];
            }
        }
    }

    function goto54() {
        QVERD = 0.;
        for (let I = 1; I <= IAANT; I++) {
            if (CRESUL.IST[I - 1] === IVERD) {
                QVERD += CRESUL.Q[I - 1];
            }
        }
        CRESUL.ENTST[ISUI - 1] = CRESUL.ENTST[ISIN - 1] + QVERD / (CRESUL.STOODM[IRVER - 1] * 1000.) - (ENTSTI - CRESUL.ENTST[ISIN - 1]) * ALGEM.SPUIPR - QVOORW / (CRESUL.STOODM[ISIN - 1] * 1000.);
        const ENTST2 = CRESUL.ENTST[ISUI - 1];
        CRESUL.ENTST[ISUI - 1] = ENTSTB;
    }

    function goto56() {
        QTVERD = 0;
        for (let I = 1; I <= IAANT; I++) {
            if (CRESUL.IST[I - 1] === CRESUL.IST[ISIN - 1]) {
                QTVERD += CRESUL.Q[I - 1];
            }
        }
        if (ISIN !== IKOEL) {
            CRESUL.ENTST[ISUI - 1] = CRESUL.ENTST[ISIN - 1] + QTVERD / (CRESUL.STOODM[ISIN - 1] * 1000.);
        }
        if (ISIN === IKOEL) {
            CRESUL.ENTST[ISUI - 1] = (CRESUL.ENTST[ISIN - 1] * CRESUL.STOODM[ISIN - 1] + ALGEM.TWATER * (CRESUL.STOODM[ISUI - 1] - CRESUL.STOODM[ISIN - 1])) / CRESUL.STOODM[ISUI - 1];
        }
    }

    function goto57() {
        const EINHOV = ENTHAL(ALGEM.TINHGG, ALGEM.DRUHOV, 0, 0, 0, 0, 0, 0, 0, ALGEM.ITSSN);  //  PLACEHOLDER
        const EUIHOV = ENTHAL(ALGEM.TUIHGG, ALGEM.DRUHOV, 0, 0, 0, 0, 0, 0, 0, ALGEM.ITSSN);  //  PLACEHOLDER
        const DELTH = CRESUL.Q[ISIN - 1] / 1000. / CRESUL.STOODM[ITOT - 1];
        if (DELTH - (EUIHOV - EINHOV)) {
            goto5704();
            return;
        }
        DMINJE = (CRESUL.STOODM[ITOT - 1] * EINHOV + CRESUL.Q[ISIN - 1] / 1000. - CRESUL.STOODM[ITOT - 1] * EUIHOV) / (EUIHOV - ALGEM.TWATER);
        CRESUL.STOODM[ISIN - 1] = CRESUL.STOODM[ITOT - 1] + DMINJE;
        CRESUL.ENTST[ISUI - 1] = CRESUL.ENTST[ISIN - 1];
        CRESUL.ENTST[ISIN - 1] = (CRESUL.STOODM[ITOT - 1] * EINHOV + DMINJE * ALGEM.TWATER) / CRESUL.STOODM[ISIN - 1];
        TEMPEN(ALGEM.TINHGG, ALGEM.DRUHOV, 0, CRESUL.ENTST[ISIN - 1], 0, 1, ALGEM.ITSSN);  //  PLACEHOLDER
        ALGEM.TUIHOV = ALGEM.TUIHGG;
        goto5706();
    }

    function goto5704() {
        CRESUL.STOODM[ISIN - 1] = CRESUL.STOODM[ITOT - 1];
        DMINJE = 0.;
        CRESUL.ENTST[ISUI - 1] = CRESUL.ENTST[ISIN - 1];
        EUIHOV = EINHOV + CRESUL.Q[ISIN - 1] / 1000. / CRESUL.STOODM[ITOT - 1];
        TEMPEN(ALGEM.TUIHGG, ALGEM.DRUHOV, 0, EUIHOV, 0, 1, ALGEM.ITSSN);  //  PLACEHOLDER
        ALGEM.TINHGG = ALGEM.TINHGG;
        goto5706();
    }

    function goto5706() {
        if (ALGEM.ITSSN === 1) {
            console.log(`CORSTO: EINHOV=<span class="math-inline">\{EINHOV\}, EUIHOV\=</span>{EUIHOV}, DELTH=<span class="math-inline">\{DELTH\}, DMINJ\=</span>{DMINJE}, TINHOV=<span class="math-inline">\{ALGEM\.TINHGG\}, TUIHOV\=</span>{ALGEM.TUIHGG}`);
        }
    }

    function goto58() {
        //  Leeg
    }

    if (IKOEL <= 0) {
        goto64();
    } else {
        const ENTSTO = ENTHAL(ALGEM.TSTOOM, ALGEM.DRUKKT, 0, 0, 0, 0, 0, 0, 0, ALGEM.ITSSN);  //  PLACEHOLDER
        const QKOEL = CRESUL.STOODM[IENOV - 1] * (CRESUL.ENTST[ITOT - 1] - ENTSTO);
        if (QKOEL <= 0) {
            goto6107();
        } else {
            DMINJE = CRESUL.STOODM[ITOT - 1] - CRESUL.STOODM[IRVER - 1];
            const QGELEV = CRESUL.STOODM[IRVER - 1] * CRESUL.ENTST[IKOEL - 1] + DMINJE * ALGEM.TWATER;
            const QCOR = CRESUL.STOODM[IRVER - 1] * (ENTSTB - CRESUL.ENTST[IRVER2 - 1]);
            const A = DMINJE;

            if (ALGEM.ITSSN >= 1 && ALGEM.ITSSN <= 3) {
                console.log(QKOEL, CRESUL.STOODM[IENOV - 1], ENTSTO, CRESUL.ENTST[ITOT - 1], CRESUL.ENTST[IKOEL - 1], ENTVVW, DMINJE);
            }

            for (let I = 1; I <= 7; I++) {
                if (ALGEM.ITER === IDTER[I - 1]) {
                    goto6002(I);
                    break;
                }
            }

            function goto6002(I: number) {
                if ([2, 3, 5, 7].includes(I)) {
                    goto6004();
                } else {
                    goto6006();
                }
            }

            function goto6004() {
                QKOEL += QCOR;
                goto6006();
            }

            function goto6006() {
                DMINJE = (CRESUL.STOODM[ITOT - 1] * CRESUL.ENTST[IKOEL - 1] + QKOEL - QGELEV) / (CRESUL.ENTST[IKOEL - 1] - ALGEM.TWATER);
                if (CRESUL.STOODM[ITOT - 1] + DMINJE < CRESUL.STOODM[IVERD - 1]) {
                    DMINJE = CRESUL.STOODM[IVERD - 1] - CRESUL.STOODM[ITOT - 1];
                }
                for (let I = 1; I <= ITOT; I++) {
                    if (CRESUL.IST[I - 1] > CRESUL.IST[IKOEL - 1]) {
                        CRESUL.STOODM[I - 1] += DMINJE;
                    }
                }
                DMINJE = 0.;
                goto6008();
            }

            function goto6107() {
                DMINJE = 0.;
                QKOEL = 0.;
                goto6008();
            }

            function goto6008() {
                //  Leeg
            }
        }
    }

    function goto64() {
        //  Leeg
    }

    //  BEREKENING LUCHTTEMPERATUUR
    for (let ITEL = 1; ITEL <= 4; ITEL++) {
        for (let I = 1; I <= 20; I++) {
            if (CRESUL.IST[I - 1] - 100 === ITEL) {
                goto7004();
                break;
            }
            CRESUL.TEML[ITEL] = CRESUL.