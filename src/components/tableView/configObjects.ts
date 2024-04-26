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

type MigKeys = keyof Mig
type SocSecKeys = keyof SocSec

export const fieldsConfigMig = [
    {fieldName: 'covered', enumType: CoveredEnum},
    {fieldName: 'article', enumType: ArticleEnum},
    {fieldName: 'in_value', enumType: InEnum},
    {fieldName: 'out_value', enumType: OutEnum},
    {fieldName: 'secondment', enumType: SecondmentEnum},
    {fieldName: 'nat', enumType: NatEnum},
    {fieldName: 'in_title', enumType: InTitleEnum},
    {fieldName: 'out_title', enumType: OutTitleEnum},
    {fieldName: 'time', enumType: MigTimeEnum}
]

export const fieldsConfigSocSec = [
    {fieldName: 'in_value', enumType: InEnum},
    {fieldName: 'out_value', enumType: OutEnum},
    {fieldName: 'covered', enumType: CoveredEnum},
    {fieldName: 'article', enumType: ArticleEnum},
    {fieldName: 'statute', enumType: StatueEnum},
    {fieldName: 'empl', enumType: EmplEnum},
    {fieldName: 'if_empl0_eq_empl1', enumType: Empl0EQEmpl1Enum}
]

export const columnsMig : {label:string, key:MigKeys}[] = [
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
    {label: 'LAST MODIFIED', key: 'last_modified'}
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
    {label: 'LAST UPDATED', key: 'last_modified'}
]