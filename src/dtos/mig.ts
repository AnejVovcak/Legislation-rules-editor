import {CoveredEnum} from "../enums/CoveredEnum";
import {ArticleEnum} from "../enums/ArticleEnum";
import {OutEnum} from "../enums/OutEnum";
import {InEnum} from "../enums/InEnum";
import {OutTitleEnum} from "../enums/OutTitleEnum";
import {InTitleEnum} from "../enums/InTitleEnum";
import {SecondmentEnum} from "../enums/SecondmentEnum";
import {NatEnum} from "../enums/NatEnum";
import {MigTimeEnum} from "../enums/MigTimeEnum";

export interface Mig {
    _id: string;
    title: string;
    date: string;
    content: string;
    "migration-covered": CoveredEnum;
    "migration-article": ArticleEnum;
    "migration-out_value": OutEnum;
    "migration-in_value": InEnum;
    "migration-out_title": OutTitleEnum;
    "migration-in_title": InTitleEnum;
    "migration-time": MigTimeEnum[];
    "migration-secondment": SecondmentEnum;
    "migration-nat": NatEnum;
    source: Array<[string, string]>;
    md5_hash: string;
    validated: boolean;
}
