const config = {
    baseUrl: process.env.REACT_APP_API_BASE_URL!,
    jwtUrl: process.env.REACT_APP_JWT_BASE_URL!,
    dataSource: process.env.REACT_APP_MONGODB_DATA_SOURCE!,
    database: process.env.REACT_APP_MONGODB_DATABASE!,
    collectionGeneralProduction: process.env.REACT_APP_MONGODB_COLLECTION_GENERAL_PRODUCTION || 'generalMobilityPortal',
    collectionGeneralStaging: process.env.REACT_APP_MONGODB_COLLECTION_GENERAL_STAGING || 'generalMobilityPortalStaging',
    collectionTaxProduction: process.env.REACT_APP_MONGODB_COLLECTION_TAX_PRODUCTION || 'taxMobilityPortal',
    collectionTaxStaging: process.env.REACT_APP_MONGODB_COLLECTION_TAX_STAGING || 'taxMobilityPortalStaging',
    collectionTaxDev: process.env.REACT_APP_MONGODB_COLLECTION_TAX_DEV || 'taxDev',
    collectionSocSecProduction: process.env.REACT_APP_MONGODB_COLLECTION_SOC_SEC_PRODUCTION || 'socSecMobilityPortal',
    collectionSocSecStaging: process.env.REACT_APP_MONGODB_COLLECTION_SOC_SEC_STAGING || 'socSecMobilityPortalStaging',
    collectionSocSecDev: process.env.REACT_APP_MONGODB_COLLECTION_SOC_SEC_DEV || 'socSecDev',
    collectionMigProduction: process.env.REACT_APP_MONGODB_COLLECTION_MIG_PRODUCTION || 'migMobilityPortal',
    collectionMigStaging: process.env.REACT_APP_MONGODB_COLLECTION_MIG_STAGING || 'migMobilityPortalStaging',
    collectionMigDev: process.env.REACT_APP_MONGODB_COLLECTION_MIG_DEV || 'migDev',
    collectionCodebook: process.env.REACT_APP_MONGODB_COLLECTION_CODEBOOK || 'codebook',
    testingUrlMig: process.env.REACT_APP_TESTING_URL_MIG,
    testingUrlSocSec: process.env.REACT_APP_TESTING_URL_SOC_SEC,
    testingUrlTax: process.env.REACT_APP_TESTING_URL_TAX,
    collectionChatBot: process.env.REACT_APP_MONGODB_COLLECTION_CHATBOT || 'chatbot',
};

export default config;
