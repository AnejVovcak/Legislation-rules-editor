import {CoveredEnum} from "../../enums/CoveredEnum";
import {ArticleEnum} from "../../enums/ArticleEnum";
import {InEnum} from "../../enums/InEnum";
import {OutEnum} from "../../enums/OutEnum";
import {SecondmentEnum} from "../../enums/SecondmentEnum";
import {NatEnum} from "../../enums/NatEnum";
import {InTitleEnum} from "../../enums/InTitleEnum";
import {OutTitleEnum} from "../../enums/OutTitleEnum";
import {MigTimeEnum} from "../../enums/MigTimeEnum";
import {Mig} from "../../dtos/mig";
import {SocSec} from "../../dtos/socSec";
import {StatueEnum} from "../../enums/StatueEnum";
import {EmplEnum} from "../../enums/EmplEnum";
import {Empl0EQEmpl1Enum} from "../../enums/Empl0EQEmpl1Enum";
import {TaxEnum} from "../../enums/TaxEnum";
import {Tax} from "../../dtos/tax";

type MigKeys = keyof Mig | 'select'
type SocSecKeys = keyof SocSec | 'select'
type TaxKeys = keyof Tax | 'select'

export const columnsMig : {label:string, key:MigKeys}[] = [
    //!isProduction ? {label: 'SELECT', key: 'select'} : null,
    {label: 'TITLE', key: 'title'},
    {label: 'CONTENT', key: 'content'},
    {label: 'IN', key: 'in_value'},
    {label: 'OUT', key: 'out_value'},
    {label: 'ARTICLE', key: 'article'},
    {label: 'COVERED', key: 'covered'},
    {label: 'IN TITLE', key: 'in_title'},
    {label: 'NAT', key: 'nat'},
    {label: 'OUT TITLE', key: 'out_title'},
    {label: 'SECONDMENT', key: 'secondment'},
    {label: 'TIME', key: 'time'},
    {label: 'LAST MODIFIED', key: 'last_modified'},
    {label: 'PUBLISHED', key: 'published'}
];

export const columnsSocSec:{label:string, key:SocSecKeys}[] = [
    {label: 'TITLE', key: 'title'},
    {label: 'CONTENT', key: 'content'},
    {label: 'IN', key: 'in_value'},
    {label: 'OUT', key: 'out_value'},
    {label: 'COVERED', key: 'covered'},
    {label: 'ARTICLE', key: 'article'},
    {label: 'STATUTE', key: 'statute'},
    {label: 'EMPL', key: 'empl'},
    {label: 'IF EMPL0 EQ EMPL1', key: 'if_empl0_eq_empl1'},
    {label: 'LAST MODIFIED', key: 'last_modified'},
    {label: 'PUBLISHED', key: 'published'}
]

export const columnsTax: { label: string, key: TaxKeys}[] = [
    {label: 'TITLE', key: 'title'},
    {label: 'CONTENT', key: 'content'},
    {label: 'IN', key: 'in_value'},
    {label: 'OUT', key: 'out_value'},
    {label: 'ARTICLE', key: 'article'},
    {label: 'COVERED', key: 'covered'},
    {label: 'EMPL', key: 'empl'},
    {label: 'TAX', key: 'tax'},
    {label: 'LAST MODIFIED', key: 'last_modified'},
    {label: 'PUBLISHED', key: 'published'}
];