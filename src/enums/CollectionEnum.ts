import config from "../config";

export enum CollectionEnum {
    TAX_PRODUCTION = 'TAX_PRODUCTION',
    TAX_STAGING = 'TAX_STAGING',
    TAX_DEV = 'TAX_DEV',
    SOC_SEC_PRODUCTION = 'SOC_SEC_PRODUCTION',
    SOC_SEC_STAGING = 'SOC_SEC_STAGING',
    SOC_SEC_DEV = 'SOC_SEC_DEV',
    MIG_PRODUCTION = 'MIG_PRODUCTION',
    MIG_STAGING = 'MIG_STAGING',
    MIG_DEV = 'MIG_DEV',
    GENERAL_PRODUCTION = 'GENERAL_PRODUCTION',
    GENERAL_STAGING = 'GENERAL_STAGING',
    CODEBOOK = 'CODEBOOK',
    CHAT_BOT = 'CHAT_BOT',
}
export const CollectionEnumValues: { [key in CollectionEnum]: string } = {
    [CollectionEnum.TAX_PRODUCTION]: config.collectionTaxProduction,
    [CollectionEnum.TAX_STAGING]: config.collectionTaxStaging,
    [CollectionEnum.TAX_DEV]: config.collectionTaxDev,
    [CollectionEnum.SOC_SEC_PRODUCTION]: config.collectionSocSecProduction,
    [CollectionEnum.SOC_SEC_STAGING]: config.collectionSocSecStaging,
    [CollectionEnum.SOC_SEC_DEV]: config.collectionSocSecDev,
    [CollectionEnum.MIG_PRODUCTION]: config.collectionMigProduction,
    [CollectionEnum.MIG_STAGING]: config.collectionMigStaging,
    [CollectionEnum.GENERAL_PRODUCTION]: config.collectionGeneralProduction,
    [CollectionEnum.GENERAL_STAGING]: config.collectionGeneralStaging,
    [CollectionEnum.MIG_DEV]: config.collectionMigDev,
    [CollectionEnum.CODEBOOK]: config.collectionCodebook,
    [CollectionEnum.CHAT_BOT]: config.collectionChatBot,
};