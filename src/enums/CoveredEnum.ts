export enum CoveredEnum {
    AllCovered = 'ALL COVERED',
    BelgiumUKDTT = 'BEL-UK DTT',
    BelgianNationalLaw = 'Belgian national law',
    EULaw = 'EU law',
    PortugueseNationalLaw = 'Portuguese national law',
    PravilnikOVsebiniOblikiObracunaDavcnihOdgovov = 'Pravilnik o vsebini in obliki obračuna davčnih odtegljajev',
    RomanianNationalLaw = 'Romanian national law',
    SloveniaBELDTT = 'SLO-BEL DTT',
    SloveniaUKDTT = 'SLO-UK DTT',
    SlovenianNationalLaw = 'Slovenian national law',
    UKNationalLaw = 'UK national law',
    ZDavP2 = 'ZDavP-2',
    ZDoh2 = 'ZDoh-2',
    ZFU = 'ZFU',
    AllSecondment = 'ALL SECONDMENT',
    NoSecondment = 'NO SECONDMENT',
    TreatyOnTheFunctioningOfEU = 'Treaty on the functioning of EU',
    UEDomzale = 'UE Domžale',
    ZakonOTujcih = 'Zakon o tujcih',
    NationalLaw = 'national law',
    SourceTBC = 'source TBC',
    BelgianLawExpats = 'Belgian law (expats)',
    BelgianLawNew = 'Belgian law (new)',
    InternationalBilateralTreaty = 'International (bilateral) treaty',
    PortugueseLawExpats = 'Portuguese law (expats)',
    RomanianLawExpat = 'Romanian law (expat)',
    RomanianLawNew = 'Romanian law (new)',
    SlovenianLawExpats = 'Slovenian law (expats)',
    SlovenianLawNew = 'Slovenian law (new)',
    UkLawExpats = 'UK law (expats)',
    UkLawNew = 'UK law (new)'
}

const dropdownOptions = Object.entries(CoveredEnum).map(([key, value]) => {
    return { label: value, value: key };
});