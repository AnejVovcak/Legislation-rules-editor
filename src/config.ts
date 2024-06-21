// src/config.js
const config = {
    baseUrl: process.env.REACT_APP_API_BASE_URL!,
    jwtUrl: process.env.REACT_APP_JWT_BASE_URL!,
    dataSource: process.env.REACT_APP_MONGODB_DATA_SOURCE!,
    database: process.env.REACT_APP_MONGODB_DATABASE!,
    collectionTaxProduction: process.env.REACT_APP_MONGODB_COLLECTION_TAX_PRODUCTION || 'tax',
    collectionTaxStaging: process.env.REACT_APP_MONGODB_COLLECTION_TAX_STAGING || 'taxStaging',
    collectionTaxDev: process.env.REACT_APP_MONGODB_COLLECTION_TAX_DEV || 'taxDev',
    collectionSocSecProduction: process.env.REACT_APP_MONGODB_COLLECTION_SOC_SEC_PRODUCTION || 'socSec',
    collectionSocSecStaging: process.env.REACT_APP_MONGODB_COLLECTION_SOC_SEC_STAGING || 'socSecStaging',
    collectionSocSecDev: process.env.REACT_APP_MONGODB_COLLECTION_SOC_SEC_DEV || 'socSecDev',
    collectionMigProduction: process.env.REACT_APP_MONGODB_COLLECTION_MIG_PRODUCTION || 'mig',
    collectionMigStaging: process.env.REACT_APP_MONGODB_COLLECTION_MIG_STAGING || 'migStaging',
    collectionMigDev: process.env.REACT_APP_MONGODB_COLLECTION_MIG_DEV || 'migDev',
    collectionCodebook: process.env.REACT_APP_MONGODB_COLLECTION_CODEBOOK || 'codebook',
};

export default config;
