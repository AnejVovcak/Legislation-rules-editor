import {CoveredEnum} from "../enums/CoveredEnum";
import {ArticleEnum} from "../enums/ArticleEnum";
import {OutTitleEnum} from "../enums/OutTitleEnum";
import {InTitleEnum} from "../enums/InTitleEnum";
import {SecondmentEnum} from "../enums/SecondmentEnum";
import {NatEnum} from "../enums/NatEnum";
import {MigTimeEnum} from "../enums/MigTimeEnum";
import {Entity} from "./entity";

export interface Mig extends Entity {
    article: ArticleEnum[];
    covered: CoveredEnum;
    in_title: InTitleEnum;
    nat: NatEnum;
    out_title: OutTitleEnum;
    secondment: SecondmentEnum;
    time: MigTimeEnum[];
    platform_title?: string;
}
