import {CoveredEnum} from "../enums/CoveredEnum";
import {Empl0EQEmpl1Enum} from "../enums/Empl0EQEmpl1Enum";
import {EmplEnum} from "../enums/EmplEnum";
import {InEnum} from "../enums/InEnum";
import {OutEnum} from "../enums/OutEnum";
import {ArticleEnum} from "../enums/ArticleEnum";

export interface SocSec {
    _id: string;
    title: string;
    date: string; // You might consider using the Date type if you need to handle it as a date object in your code
    content: string;
    "ssc-covered": CoveredEnum[];
    "ssc-article": ArticleEnum[];
    "ssc-statute": string[];
    "ssc-out_value": OutEnum;
    "ssc-in_value": InEnum;
    "ssc-empl": EmplEnum;
    "ssc-if_empl0_eq_empl1": Empl0EQEmpl1Enum;
    source: Array<[string, string]>;
    md5_hash: string;
    validated: boolean;
}
