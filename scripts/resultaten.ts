/**
 * Berekent de resultaten van de simulatie.
 * @param FMTKET - Array van ketelformaten.
 * @param FMTDLN - Array van lijnformaten.
 * @param FMTBRA - Array van brandstofanalyseformaten.
 * @param IAANT - Aantal.
 * @param IVERD - Parameter.
 * @param IBEGIN - Parameter.
 * @param IEINDE - Parameter.
 * @param DMBRAN - Parameter.
 * @param DL - Parameter.
 * @param DG - Parameter.
 * @param YG - Array van parameters.
 * @param GAMMAT - Parameter.
 * @param ROGAS - Parameter.
 * @param SCHVER - Parameter.
 * @param STRVER - Parameter.
 * @param ASVER - Parameter.
 * @param YLUFAT - Parameter.
 * @param RENDEM - Parameter.
 * @param IBER - Parameter.
 * @param IBLZ - Bloknummer.
 */
function SRESUL(
    FMTKET: string[],
    FMTDLN: string[],
    FMTBRA: string[][],
    IAANT: number,
    IVERD: number,
    IBEGIN: number,
    IEINDE: number,
    DMBRAN: number,
    DL: number,
    DG: number,
    YG: number[],
    GAMMAT: number,
    ROGAS: number,
    SCHVER: number,
    STRVER: number,
    ASVER: number,
    YLUFAT: number,
    RENDEM: number,
    IBER: number,
    IBLZ: number
) {
    //  Simulatie van COMMON blocks
    let CWERVE: any = {};
    let CRECUP: any = {};
    let CGEGEV: any = {};
    let CRESUL: any = {};
    let ALGEM: any = {};
    let BRANDS: any = {};
    let CDRUKG: any = {};
    let CDRUKR: any = {};
    let CRECSM: any = {};
    let GRAP: any = {};

    const FTIT1 = ['GENERAL', 'CONDITIONS', 'CALCULATIONS'];
    const FTIT2 = ['BOILER', 'CALCULATIONS'];
    const FTIT3 = ['PRESSURE', 'DROP'];
    const FMTBES: string[] = [
        'ECONOMISER',
        'SUPERHEATER',
        'AIRHEATER (2)',
        'AIRHEATER (1)',
        'CONVECTION',
        'FLUID. BED',
        'RADATION CHAMBRE',
        'SMOKE TUBES',
        'RESUPERHEATER',
        'FURNACE',
        'FURNACE',
        'CHAMBRE',
        'SMOKE TUBES',
        'STEAM COOLER',
    ];

    //  PLACEHOLDERS voor functies
    const gettim = () => [0, 0, 0, 0];
    const getdat = () => [0, 0, 0];
    const CALL04 = () => {};

    const idat = getdat();

    IBER = IBER + 1;
    if (IBER < 1) {
        IBER = 1;
    }
    if (IBER > 5) {
        IBER = 5;
    }

    //  INPUTGEGEVENS: OPPERVLAKTE GEGEVENS
    TITEL(FTIT1, ALGEM.FMT, IBLZ);  //  PLACEHOLDER
    console.log('INPUT DATA'.padStart(60, ' ') + '*');
    console.log('TUBE DIMENSIONS'.padStart(42, ' ') + 'CHAMBRE DIMENSION'.padEnd(19) + 'COEFFICIENTS'.padEnd(20) + '*');
    console.log('D.OUTS D.INS. LEN-GTH NR SURFACE TEM INS. OUTS. TEM FACE'.padEnd(75) + 'WIDTH HEIGHT LENGTH TB TL'.padEnd(26) + 'IST' + '*');
    console.log('M M M M**2'.padEnd(34) + 'DGR.C DGR.C'.padEnd(19) + 'M M M'.padEnd(12) + '*');
    console.log('*'.repeat(89));

    for (let I = 1; I <= IAANT; I++) {
        for (let J = 1; J <= 20; J++) {
            if (CRESUL.IST[J - 1] === IVERD) {
                const IRVER = J;  //  Niet gebruikt
            }
            if (FMTKET[I - 1] === FMTDLN[J - 1]) {
                goto41(I, J);
                break;
            }
        }
    }

    function goto41(I: number, J: number) {
        console.log(FMTBES[J - 1], CGEGEV.PIJPDU[I - 1], CGEGEV.PIJPD[I - 1], CGEGEV.PIJPL[I - 1], CGEGEV.PIJPN[I - 1], CGEGEV.OPP[I - 1], CGEGEV.VVINW[I - 1], CGEGEV.VVUIT[I - 1], CRESUL.IST[I - 1]);  //  PLACEHOLDER
        if (FMTKET[I - 1] === FMTDLN[5]) {  //  FMTDLN(6)
            console.log(CGEGEV.RKBREE[I - 1], CGEGEV.RKHOOG[I - 1], CGEGEV.RKLENG[I - 1], CGEGEV.TB[I - 1], CGEGEV.TH[I - 1]);  //  PLACEHOLDER
        }
    }

    const IEIND = IAANT < 14 ? (IAANT < 11 ? 10 : 12) : 15;

    for (let I = IAANT; I <= IEIND; I++) {
        console.log('*'.repeat(123));
    }

    if (IAANT < 14) {
        console.log('GENERAL CONDITIONS'.padStart(56, ' ') + '*');
        console.log('ROOKGAS'.padStart(35, ' ') + 'LUCHT'.padStart(35, ' ') + 'BRANDSTOF'.padStart(35, ' ') + '*');
    }

    const A = 0;  //  Niet gebruikt
    const A1 = 0;  //  Placeholder
    const AAA = ENTHAL(ALGEM.TEMWAT, CRESUL.DRUKST[0], A1, 0, 0, 0, 0, 0, 0, ALGEM.ITSSN);  //  PLACEHOLDER
    const BBB = ENTHAL(CRESUL.TEMS[IAANT], CRESUL.DRUKST[29], A1, 0, 0, 0, 0, 0, 0, ALGEM.ITSSN);  //  PLACEHOLDER
    const AAAAA = ALGEM.DMSTOO * 3600.;
    const AA = AAAAA / 500 * 500;
    const AAAAAA = 100. * ALGEM.DMSTOO / ALGEM.DMSTMA;
    const BBBBB = (ALGEM.STOODM[IAANT] - ALGEM.DMINJE) * 3600.;
    let BBBB = Math.trunc(CRESUL.TEMS[IAANT] + 0.5);

    if (Math.abs(BBBB - CRESUL.ENTST[IAANT]) < ALGEM.DHSTOO) {
        BBBB = CRESUL.TEMS[IAANT];
    }

    if (Math.abs(BBBB - CRESUL.ENTST[IAANT]) >= ALGEM.DHSTOO) {
        BBBB = CRESUL.ENTST[IAANT];
    }

    console.log(ALGEM.DMSTOO, ALGEM.DRUKST[0], CRESUL.DRUKST[29], AAAAA, A, AAA, BBBB, CRESUL.ENTST[IAANT], B, AAAA, ALGEM.TWATER, BBBB, CRESUL.TEMS[IAANT]);  //  PLACEHOLDER

    CRECSM.SUM2[0][IBER] = AA;
    CRECSM.SUM2[1][IBER] = A;
    CRECSM.SUM2[2][IBER] = AAA;
    CRECSM.SUM2[3][IBER] = BBBB;
    CRECSM.SUM2[4][IBER] = AAAAA;
    CRECSM.SUM2[5][IBER] = AAAAAA;
    CRECSM.SUM2[6][IBER] = CRESUL.DRUKST[0];
    CRECSM.SUM2[7][IBER] = CRESUL.DRUKST[29];
    CRECSM.SUM2[8][IBER] = CRESUL.TEMR[0];
    CRECSM.SUM2[9][IBER] = CRESUL.TEMR