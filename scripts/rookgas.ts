/**
 * Genereert de titel van de output.
 * @param FTIT - De titelstring.
 * @param FCAS - Een array van case-strings.
 * @param IBLZ - Een bloknummer.
 */
function TITEL(FTIT: string, FCAS: string[], IBLZ: number) {
    const sourc = 'SIM 1. FOR';
    // PLACEHOLDERS voor getdat en gettim
    const idat = getdat(); // Vervang door je eigen implementatie
    const itim = gettim(); // Vervang door je eigen implementatie

    console.log('1' + '//'.padEnd(124, '/') + '/');
    console.log('*'.repeat(116) + '/');
    console.log('DN-PROGRAM-LIBRARY'.padEnd(50) + FTIT.padEnd(28) + 'NV. D.T.I. SA WILLEBROEK BLZ.'.padEnd(86) + IBLZ + '*');
    console.log('*' + ' '.repeat(35) + 'CASE:' + FCAS.slice(0, 13).join('') + 'DIVISION: -ENG-'.padEnd(91) + idat.join('-') + '/' + itim.join(':') + '*');
    console.log('*'.repeat(116));
}

/**
 * Genereert een samenvatting van de resultaten.
 * @param ITOT - Totaal aantal.
 * @param IAANT - Aantal.
 * @param IBLZ - Bloknummer.
 */
function RECSUM(ITOT: number, IAANT: number, IBLZ: number) {
    // Simulatie van COMMON blocks
    let CRECSM: any = {};
    let ALGEM: any = {};

    const BLAN = '    '; // 4 spaces
    const IDAT1 = 'CONDITIONS : -STEAM-FLUE GAS-FLOW: KG/H NM3/H /********************/ FLUE GAS CIRCUIT PRES TEM Q KW MBAR DGC /********************/ STEAM CIRCUIT TRANS PRES TEM W/M2K MBAR DGC /********************//********************//';
    const IDAT2 = 'FUELGAS AIR EFFICIENCY-STACK LOSS:-RAD. LOSS:-INCOM.LOSS:-UNBUR.LOSS:';
    // PLACEHOLDER voor getdat()
    const idat = getdat();

    console.log('1' + '//'.padEnd(124, '/') + '/');
    console.log('*'.repeat(116) + '/');
    console.log('DN-PROGRAM-LIBRARY'.padEnd(59) + 'SUMMARY'.padEnd(27) + 'NV. D.T.I. SA WILLEBROEK BLZ.'.padEnd(13) + IBLZ + '*//');
    console.log('T35 CASE, 13A4, T91, DIVISION: -ENG-'.padEnd(102) + idat.join('-') + '*//');
    console.log('*'.repeat(116));

    const a1 = 'A1'; // Placeholder

    for (let i = 1; i <= ITOT; i++) {
        console.log(BLAN.repeat(11) + a1.padEnd(7) + '-'.padEnd(9) + '*');
    }
    console.log('*'.repeat(85) + '*');

    for (let i = 1; i <= ITOT; i++) {
        console.log(BLAN.repeat(21) + '*');
    }
    console.log('*'.repeat(116));

    for (let IA = 1; IA <= 33; IA += 11) {
        const IE = IA + 10;

        for (let k = 1; k <= 3; k++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                //  Type assertion om TS te omzeilen
                output += (CRECSM.SUM1[IA + k - 1] as any).padEnd(11);
            }
            console.log(output);
        }
        console.log('*'.repeat(123));

        for (let k = 1; k <= 3; k++) {
            console.log(IDAT1[IA + k - 1]);
        }

        for (let j = 1; j <= 3; j++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.SUM2[j][i] as any).toFixed(5).padEnd(10);
            }
            console.log(output);
        }

        for (let j = 4; j <= 6; j++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.SUM2[j][i] as any).toFixed(4).padEnd(9);
            }
            console.log(output);
        }

        for (let j = 7; j <= 8; j++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.SUM2[j][i] as any).toFixed(6).padEnd(10);
            }
            console.log(output);
        }

        for (let j = 9; j <= 10; j++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.SUM2[j][i] as any).toFixed(3).padEnd(8);
            }
            console.log(output);
        }

        for (let j = 11; j <= 12; j++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.SUM2[j][i] as any).toFixed(2).padEnd(7);
            }
            console.log(output);
        }

        console.log('*'.repeat(123));

        for (let j = 1; j <= 3; j++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.FSUM1[j][i] as any).padEnd(10);
            }
            console.log(output);
        }

        for (let k = 4; k <= 16; k += 3) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.FSUM2[k][i] as any).padEnd(7);
            }
            console.log(output);
        }

        for (let j = 1; j <= 7; j++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.ISUM3[j][i] as any).padEnd(10);
            }
            console.log(output);
        }
    }

    if (IAANT > 15) {
        for (let IA = 1; IA <= 33; IA += 11) {
            const IE = IA + 10;
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.SUM1[IA + i] as any).padEnd(11);
            }
            console.log(output);
        }

        for (let k = 7; k <= 11; k++) {
            console.log(IDAT1[k]);
        }

        if (IAANT < 10) {
            for (let i = 1; i <= ITOT; i++) {
                console.log(BLAN.repeat(21) + '*');
            }
        }

        for (let k = 1; k <= IAANT; k++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.ISUM3[k][i] as any).padEnd(10);
            }
            console.log(output);
        }

        if (IAANT < 10) {
            for (let i = 1; i <= ITOT; i++) {
                console.log(BLAN.repeat(21) + '*');
            }
        }

        for (let k = 1; k <= IAANT; k++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.FSUM2[k][i] as any).padEnd(10);
            }
            console.log(output);
        }

        for (let k = 1; k <= IAANT; k++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.FSUM2[k][i] as any).padEnd(10);
            }
            console.log(output);
        }

        const ITOA = IAANT + 1;
        for (let j = 1; j <= 3; j++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.ISUM3[j][ITOA][i] as any).padEnd(10);
            }
            console.log(output);
        }

        const ITEL1 = Math.floor((42 - 4 - ITOA) / 2);
        if (ITEL1 <= 0) {
            //  Empty block
        } else {
            for (let j = 1; j <= ITEL1; j++) {
                for (let i = 1; i <= ITOT; i++) {
                    console.log(BLAN.repeat(21) + '*');
                }
            }
        }

        for (let k = 12; k <= 16; k++) {
            console.log(IDAT1[k]);
        }

        for (let k = 1; k <= IAANT; k++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.ISUM3[k][ITOA][i] as any).padEnd(10);
            }
            console.log(output);
        }

        for (let j = 4; j <= 6; j++) {
            let output = '';
            for (let i = 1; i <= ITOT; i++) {
                output += (CRECSM.ISUM3[j][ITOA][i] as any).padEnd(10);
            }
            console.log(output);
        }
    }

    console.log('*'.repeat(128));

    IBLZ++;
    TITEL('RECUP-SUMMARY', ALGEM.FMT, idat);
    for (let i = 1; i <= ITOT; i++) {
        console.log(BLAN.repeat(21) + '*');
    }
    console.log('*'.repeat(116));
}

/**
 * Leest invoergegevens.
 * @param FMTKET - Array van ketelformaten.
 * @param FMTDLN - Array van lijnformaten.
 * @param IBER - Iteratie counter.
 * @param IBLZ - Bloknummer.
 */
function RECIN(FMTKET: string[], FMTDLN: string[], IBER: number, IBLZ: number) {
    // Simulatie van COMMON blocks
    let CRECUP: any = {};
    let CGEGEV: any = {};
    let CRESUL: any = {};
    let ALGEM: any = {};
    let TYPTA: any = {};
    let CDRUKG: any = {};
    let CDRUKR: any = {};
    let CRECGR: any = {};
    let BRANDS: any = {};
    let CWERVE: any = {};
    let NRK: any = {};

    const FMTCOM: string[] = [
        'DMROOK TEMP AUVO',
        'LUCHT KG/S IN UIT XN2 XO2 XCO2 XH2O XSO2 XVOL XH2O DGRC % IN UIT',
        'TEMP DRUK T.IN T.UIT DRUK',
        'STOO KG/S BAR SPUI WAT',
        'BESCHRIJVING GRAFIEK',
        'PIJPDIAM OPP INW UITW UIT INW LENGT NR',
        'BREED HOOG LENG TB TH',
        'GR VINDR DIK ITEM ITEG IST',
        'NR RUWH NR GRN RDNR GR N RDNR GR N RDNR GR N RD',
        'ITER DTROOK DTSTO TSSN GRWAR IDL TEMP',
        'CTCHU HU ETAV YLUF XH2O CTCY CTCAFV TEMBED PRLUC PRBRAN PRAS PRCIR PRTOEV TEMAS',
        'C H S N O CO CO2 H2 O2 N2 H2S SO2 CH4 C2H6 C3H8 C4H10 C5H12 C6H14 C2H4 C3H6 C4H8 C2H2 C6H6 CO2',
        'H2O'
    ];

    const FMTDAT: string[] = ['CASE', 'ROOK', 'TYPT', 'STOO', 'GRA', 'TEMR', 'TEMS', 'TEML', 'STDM', 'TEKS', 'ITER', 'BRAN', '8*' /*...*/];
    const AFMTDR: string[] = Array(30).fill('');
    const BLAN = '    ';
    const MODULE = ['REC', 'UP1'];
    const ITEIND = 'EIND';
    const GRA = 'GRA';
    const PUNT = ' ';
    const IBLAN = ' ';
    const EEN = '1111';
    const TWEE = '2222';
    const DRIE = '3333';
    let XA: string;
    let IP = 1;
    let IL = 1;
    let IK = 1;
    let ID = 1;
    let IG = 1;
    let IKAART = 0;

    for (let K = 1; K <= 100; K++) {
        IKAART++;
        XA = readLine();  //  PLACEHOLDER: Lees een regel van invoer
        const I1 = parseInt(XA.slice(-2)); // Extract last 2 characters and parse as integer

        if (ALGEM.ITSSN < 1 || ALGEM.ITSSN > 3 && ALGEM.ITSSN !== 99) {
            continue;
        }

        for (let IDLN = 1; IDLN <= 20; IDLN++) {
            if (XA === FMTDLN[IDLN - 1]) {
                goto1();
                continue;
            }
        }

        for (let IDLN = 1; IDLN <= 20; IDLN++) {
            if (XA === FMTDAT[IDLN - 1]) {
                goto44(IDLN);
                continue;
            }
        }
        continue;

        function goto1() {
            if (I1 !== 1) {
                goto47();
            }

            PIJPDU[IP] = parseFloat(readLine());  //  PLACEHOLDER: Lees een regel en parseFloat
            PIJPD[IP] = parseFloat(readLine());
            PIJPL[IP] = parseFloat(readLine());
            PIJPN[IP] = parseFloat(readLine());
            CGEGEV.GR[IP] = parseFloat(readLine());
            CGEGEV.VINDR[IP] = parseFloat(readLine());
            CGEGEV.VVINW[IP] = parseFloat(readLine());
            CGEGEV.VVUIT[IP] = parseFloat(readLine());
            CGEGEV.OPP[IP] = parseFloat(readLine());
            ALGEM.DMROOK = parseFloat(readLine());
            ALGEM.DMLUCH = parseFloat(readLine());
            ALGEM.DMSTOO = parseFloat(readLine());
            CRECUP.PRLUVO = parseFloat(readLine());
            CGEGEV.RKBREE[IP] = parseFloat(readLine());
            CGEGEV.RKHOOG[IP] = parseFloat(readLine());
            CGEGEV.RKLENG[IP] = parseFloat(readLine());
            CGEGEV.TB[IP] = parseFloat(readLine());
            CGEGEV.TH[IP] = parseFloat(readLine());
            CGEGEV.ITEM[IP] = parseFloat(readLine());
            CGEGEV.ITEG[IP] = parseFloat(readLine());
            CRESUL.IST[IP] = parseFloat(readLine());

            PIJPDU[IP] /= 1000;
            PIJPD[IP] /= 1000;

            IP++;
            goto70();
        }

        function goto47() {
            if (I1 !== 2) {
                goto48();
            }

            CGEGEV.RKBREE[IL] = parseFloat(readLine());
            CGEGEV.RKHOOG[IL] = parseFloat(readLine());
            CGEGEV.RKLENG[IL] = parseFloat(readLine());
            CGEGEV.TB[IL] = parseFloat(readLine());
            CGEGEV.TH[IL] = parseFloat(readLine());
            CGEGEV.VRS[IL] = parseFloat(readLine());
            NRK.VRKAM[IL] = parseFloat(readLine());

            if (NRK.VRKAM[IL] === 0) {
                NRK.VRKAM[IL] = 1;
            }
            IL++;
            goto70();
        }

        function goto48() {
            if (I1 !== 3) {
                goto70();
            }
            FMTDRU[ID] = readLine();
            CDRUKG.PIJPLD[ID] = parseFloat(readLine());
            CDRUKG.PIJPDD[ID] = parseFloat(readLine());
            CDRUKG.PIJPND[ID] = parseFloat(readLine());
            CDRUKG.RUWH[ID] = parseFloat(readLine());
            for (let J = 1; J <= 4; J++) {
                for (let K = 1; K <= 4; K++) {
                    CDRUKG.BOCHT[ID][J][K] = parseFloat(readLine());
                }
            }
            let A = parseFloat(readLine());
            let AA = parseFloat(readLine());

            CDRUKG.PIJPDD[ID] /= 1000;

            if (CDRUKG.RUWH[ID] <= 0) {
                CDRUKG.RUWH[ID] = 0.04;
            }

            if (AA < 1) {
                CDRUKR.IRK[ID] = IL - 1;
            }

            CDRUKG.RUWH[ID] /= 1000;

            if (AA >= 1 && AA <= 20) {
                CDRUKR.IRK[ID] = AA;
            }

            if (CDRUKG.PIJPLD[ID] <= 0 && AA > 0) {
                CDRUKG.PIJPLD[ID] = CGEGEV.PIJPL[CDRUKR.IRK[ID]];
            }

            if (CDRUKG.PIJPDD[ID] <= 0 && AA > 0) {
                CDRUKG.PIJPDD[ID] = CGEGEV.PIJPD[CDRUKR.IRK[ID]];
            }

            if (CDRUKG.PIJPND[ID] <= 0 && AA > 0) {
                CDRUKG.PIJPND[ID] = CGEGEV.PIJPN[CDRUKR.IRK[ID]];
            }

            ID++;
            goto70();
        }

        function goto44(IDLN: number) {
            switch (IDLN) {
                case 2:
                    goto2();
                    break;
                case 3:
                    goto3();
                    break;
                case 4:
                    goto4();
                    break;
                case 5:
                    goto5();
                    break;
                case 6:
                    goto6();
                    break;
                case 7:
                    goto7();
                    break;
                case 8:
                    goto8();
                    break;
                case 9:
                    goto9();
                    break;
                case 10:
                    goto10();
                    break;
                case 11:
                    goto11();
                    break;
                case 12:
                    goto12();
                    break;
                case 13:
                    goto13();
                    break;
            }
        }

        function goto2() {
            RECIN_ROOK();
        }

        function RECIN_ROOK() {
            // Implementeer de logica voor het lezen van "ROOK"-gegevens
            // Gebruik readLine() om de juiste invoerregels te lezen en toe te wijzen aan variabelen
            // Bijv.:
            ALGEM.DMROOK = parseFloat(readLine());
            CRECUP.TEMRIN = parseFloat(readLine());
            CRECUP.TEMRUI = parseFloat(readLine());
            CRECUP.XN2 = parseFloat(readLine());
            CRECUP.XO2 = parseFloat(readLine());
            CRECUP.XCO2 = parseFloat(readLine());
            CRECUP.XH2O = parseFloat(readLine());
            CRECUP.XSO2 = parseFloat(readLine());
            CRECUP.XVOL = parseFloat(readLine());
            CRECUP.XH2OL = parseFloat(readLine());
            ALGEM.TLUCHT = parseFloat(readLine());
            CRECUP.PRLUVO = parseFloat(readLine());
            CRECUP.TEMLIN = parseFloat(readLine());
            CRECUP.TEMLUI = parseFloat(readLine());

            if (CRECUP.XH2OL <= 0) {
                CRECUP.XH2OL = 0.0062;
            }
            if (ALGEM.TLUCHT <= 0) {
                ALGEM.TLUCHT = 20.00;
            }
            if (CRECUP.TEMLIN <= 0) {
                CRECUP.TEMLIN = 20.00;
            }
            if (CRECUP.TEMLUI <= 0) {
                CRECUP.TEMLUI = 20.00;
            }
            if (CRECUP.PRLUVO <= 0) {
                CRECUP.PRLUVO = 1.000;
            }

            goto70();
        }

        function goto3() {
            // Implementeer de logica voor het lezen van "TYPT"-gegevens
            // Gebruik readLine() om de juiste invoerregels te lezen en toe te wijzen aan variabelen
            // Bijv.:
            ALGEM.TEMP = parseFloat(readLine());
            TYPTA.TE = parseFloat(readLine());
            TYPTA.DT = parseFloat(readLine());
            goto70();
        }

        function goto4() {
            // Implementeer de logica voor het lezen van "STOO"-gegevens
            // Gebruik readLine() om de juiste invoerregels te lezen en toe te wijzen aan variabelen
            ALGEM.DMSTOO = parseFloat(readLine()) / 3.6;
            ALGEM.DRUKKT = parseFloat(readLine());
            ALGEM.SPUIPR = parseFloat(readLine());
            CRECUP.TEMWAT = parseFloat(readLine());
            CRECUP.TEMSIN = parseFloat(readLine());
            CRECUP.TEMSUI = parseFloat(readLine());
            ALGEM.DMSTMA = parseFloat(readLine()) / 3.6;
            ALGEM.TSTOOM = parseFloat(readLine());
            ALGEM.DRUKMA = parseFloat(readLine());
            ALGEM.TINHGG = parseFloat(readLine());
            ALGEM.TUIHGG = parseFloat(readLine());
            ALGEM.DRUHOV = parseFloat(readLine());

            if (ALGEM.DMSTOO <= 0) {
                ALGEM.DMSTOO = ALGEM.DMSTMA;
            }
            if (CRECUP.TEMSUI <= 0) {
                CRECUP.TEMSUI = ALGEM.TSTOOM;
            }
            if (ALGEM.DRUKKT <= 0) {
                ALGEM.DRUKKT = ALGEM.DRUKMA;
            }
            if (ALGEM.DMSTMA <= 0) {
                ALGEM.DMSTMA = ALGEM.DMSTOO;
            }
            if (ALGEM.TSTOOM <= 0) {
                ALGEM.TSTOOM = CRECUP.TEMSUI;
            }
            if (ALGEM.DRUKMA <= 0) {
                ALGEM.DRUKMA = ALGEM.DRUKKT;
            }
            if (CRECUP.TEMSIN <= 0) {
                CRECUP.TEMSIN = CRECUP.TEMWAT;
            }
            if (CRECUP.TEMWAT <= 0) {
                CRECUP.TEMWAT = CRECUP.TEMSIN;
            }
            goto70();
        }

        function goto5() {
            // Implementeer de logica voor het lezen van "GRA"-gegevens
            // Gebruik readLine() om de juiste invoerregels te lezen en toe te wijzen aan variabelen
            for (let J = 1; J <= 6; J++) {
                CRECGR.TTAB[IG][J] = parseFloat(readLine());
            }
            for (let J = 1; J <= 43; J++) {
                CRECGR.TTEK[IG][J] = parseFloat(readLine());
            }
            IG++;
            goto70();
        }

        function goto6() {
            // Implementeer de logica voor het lezen van "TEMR"-gegevens
            // Gebruik readLine() om de juiste invoerregels te lezen en toe te wijzen aan variabelen
            for (let J = 1; J <= 15; J++) {
                CRESUL.TEMR[J] = parseFloat(readLine());
            }
            for (let J = 16; J <= 20; J++) {
                CRESUL.TEMR[J] = parseFloat(readLine());
            }
            goto70();
        }

        function goto7() {
            // Implementeer de logica voor het lezen van "TEMS"-gegevens
            // Gebruik readLine() om de juiste invoerregels te lezen en toe te wijzen aan variabelen
            for (let J = 1; J <= 15; J++) {
                CRESUL.TEMS[J] = parseFloat(readLine());
            }
            for (let J = 16; J <= 20; J++) {
                CRESUL.TEMS[J] = parseFloat(readLine());
            }
            goto70();
        }

        function goto8() {
            // Implementeer de logica voor het lezen van "TEML"-gegevens
            // Gebruik readLine() om de juiste invoerregels te lezen en toe te wijzen aan variabelen
            for (let J = 1; J <= 5; J++) {
                CRESUL.TEML[J] = parseFloat(readLine());
            }
            goto70();
        }

        function goto9() {
            // Implementeer de logica voor het lezen van "STDM"-gegevens
            // Gebruik readLine() om de juiste invoerregels te lezen en toe te wijzen aan variabelen
            for (let J = 1; J <= 15; J++) {
                CRESUL.STOODM[J] = parseFloat(readLine());
            }
            for (let J = 16; J <= 20; J++) {
                CRESUL.STOODM[J] = parseFloat(readLine());
            }
            for (let J = 1; J <= 19; J++) {
                CRESUL.STOODM[J] /= 3.6;
            }
            goto70();
        }

        function goto10() {
            // Implementeer de logica voor het lezen van "TEKS"-gegevens
            // Gebruik readLine() om de juiste invoerregels te lezen en toe te wijzen aan variabelen
            CRECUP.DTEKST = readLine();
            goto70();
        }

        function goto11() {
            // Implementeer de logica voor het lezen van "ITER"-gegevens
            // Gebruik readLine() om de juiste invoerregels te lezen en toe te wijzen aan variabelen
            ITER = readLine();
            TYPTA.DTROOK = parseFloat(readLine());
            ALGEM.DHSTOO = parseFloat(readLine());
            //  A, AA, AAA worden niet gebruikt, dus we lezen ze alleen maar
            readLine();
            readLine();
            let AAA = parseFloat(readLine());
            ALGEM.TEMP = parseFloat(readLine());

            ALGEM.IGRWAR = parseFloat(readLine());
            CRECUP.IDL = parseFloat(readLine());
            goto70();
        }

        function goto12() {
            // Implementeer de logica voor het lezen van "BRAN"-gegevens
            // Gebruik readLine() om de juiste invoerregels te lezen en toe te wijzen aan variabelen
            BRANDS.CTCHU[0] = parseFloat(readLine());
            BRANDS.HU[0] = parseFloat(readLine());
            BRANDS.ETAV[0] = parseFloat(readLine());
            BRANDS.YLUFA[0] = parseFloat(readLine());
            CRECUP.XH2OL = parseFloat(readLine());
            BRANDS.CTCY[0] = parseFloat(readLine());
            BRANDS.CTCAFV[0] = parseFloat(readLine());
            ALGEM.TEMOMG = parseFloat(readLine());
            CWERVE.PRLUC = parseFloat(readLine());
            CWERVE.PRBRAN = parseFloat(readLine());
            CWERVE.PRAS = parseFloat(readLine());
            CWERVE.PRCIR = parseFloat(readLine());
            CWERVE.PRTOEV = parseFloat(readLine());
            CWERVE.TEMAS = parseFloat(readLine());

            for (let J = 1; J <= 15; J++) {
                BRANDS.Y[0][J] = parseFloat(readLine());
            }
            for (let J = 16; J <= 28; J++) {
                BRANDS.Y[0][J] = parseFloat(readLine());
            }
            goto70();
        }
    }

    function goto70() {
        //  Gemeenschappelijke code na het lezen van de gegevens
        //  (kan leeg zijn)
    }

    function goto141() {
        console.log('END OF FILE BIJ GEGEVES BEREIKT / ONTBREKEN VAN LEGE KAART ??');
    }
}

/**
 * Schrijft grote blokken gegevens weg.
 * @param DTEKST - De tekstgegevens.
 * @param FMTT - Het formaat.
 * @param IDAT - De datumgegevens.
 * @param IBLZ - Het bloknummer.
 */
function WRTBIG(DTEKST: string[], FMTT: string[], IDAT: number[], IBLZ: number) {
    const FTIT = Array(7).fill('');