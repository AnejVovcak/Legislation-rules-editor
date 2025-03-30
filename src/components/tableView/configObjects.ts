import {Mig} from "../../dtos/mig";
import {SocSec} from "../../dtos/socSec";
import {Tax} from "../../dtos/tax";
import {General} from "../../dtos/general";

type MigKeys = keyof Mig | 'select'
type SocSecKeys = keyof SocSec | 'select'
type TaxKeys = keyof Tax | 'select'
type GeneralKeys = keyof General | 'select'

export const columnsMig : {label:string, key:MigKeys}[] = [
    {label: 'ID', key: 'title'},
    {label: 'CONTENT', key: 'content'},
    {label: 'OUT', key: 'out_value'},
    {label: 'IN', key: 'in_value'},
    {label: 'ARTICLE', key: 'article'},
    {label: 'COVERED', key: 'covered'},
    {label: 'IN TITLE', key: 'in_title'},
    {label: 'NAT', key: 'nat'},
    {label: 'OUT TITLE', key: 'out_title'},
    {label: 'SECONDMENT', key: 'secondment'},
    {label: 'TIME', key: 'time'},
    {label: 'PLATFORM TITLE', key: 'platform_title_mig'},
    {label: 'POSITION', key: 'position'},
    {label: 'LAST MODIFIED', key: 'last_modified'},
    {label: 'PUBLISHED', key: 'published'}
];

export const columnsSocSec:{label:string, key:SocSecKeys}[] = [
    {label: 'ID', key: 'title'},
    {label: 'CONTENT', key: 'content'},
    {label: 'OUT', key: 'out_value'},
    {label: 'IN', key: 'in_value'},
    {label: 'COVERED', key: 'covered'},
    {label: 'ARTICLE', key: 'article'},
    {label: 'STATUTE', key: 'statute'},
    {label: 'EMPL', key: 'empl'},
    {label: 'IF EMPL0 EQ EMPL1', key: 'if_empl0_eq_empl1'},
    {label: 'PLATFORM TITLE', key: 'platform_title_soc_sec'},
    {label: 'POSITION', key: 'position'},
    {label: 'LAST MODIFIED', key: 'last_modified'},
    {label: 'PUBLISHED', key: 'published'}
]

export const columnsTax: { label: string, key: TaxKeys}[] = [
    {label: 'ID', key: 'title'},
    {label: 'CONTENT', key: 'content'},
    {label: 'OUT', key: 'out_value'},
    {label: 'IN', key: 'in_value'},
    {label: 'ARTICLE', key: 'article'},
    {label: 'COVERED', key: 'covered'},
    {label: 'EMPL', key: 'empl'},
    {label: 'TAX', key: 'tax'},
    {label: 'PLATFORM TITLE', key: 'platform_title_tax'},
    {label: 'POSITION', key: 'position'},
    {label: 'LAST MODIFIED', key: 'last_modified'},
    {label: 'PUBLISHED', key: 'published'}
];

export const columnsGeneral: { label: string, key: GeneralKeys}[] = [
    {label: 'ID', key: 'title'},
    {label: 'CONTENT', key: 'content'},
    {label: 'OUT', key: 'out_value'},
    {label: 'IN', key: 'in_value'},
    {label: 'PLATFORM TITLE', key: 'platform_title_general'},
    {label: 'POSITION', key: 'position'},
    {label: 'LAST MODIFIED', key: 'last_modified'},
    {label: 'PUBLISHED', key: 'published'}
];
