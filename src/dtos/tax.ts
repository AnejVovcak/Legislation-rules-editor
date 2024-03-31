import {CoveredEnum} from "../enums/CoveredEnum";
import {OutEnum} from "../enums/OutEnum";
import {InEnum} from "../enums/InEnum";
import {EmplEnum} from "../enums/EmplEnum";
import {TaxEnum} from "../enums/TaxEnum";
import {ArticleEnum} from "../enums/ArticleEnum";

export interface Tax {
    _id?: {'$oid': string} | string;
    title: string;
    date: string;
    content: string;
    "tax-covered": CoveredEnum[];
    "tax-article": ArticleEnum[];
    "tax-out_value": OutEnum;
    "tax-in_value": InEnum;
    "tax-empl": EmplEnum;
    "tax-tax": TaxEnum;
    source: Array<[string, string]>;
    md5_hash: string;
    validated: string | boolean;
}