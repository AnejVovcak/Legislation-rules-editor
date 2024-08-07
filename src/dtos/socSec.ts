import {CoveredEnum} from "../enums/CoveredEnum";
import {Empl0EQEmpl1Enum} from "../enums/Empl0EQEmpl1Enum";
import {EmplEnum} from "../enums/EmplEnum";
import {ArticleEnum} from "../enums/ArticleEnum";
import {StatueEnum} from "../enums/StatueEnum";
import {Entity} from "./entity";

export interface SocSec extends Entity{
    covered: CoveredEnum[];
    article: ArticleEnum[];
    statute: StatueEnum[];
    empl: EmplEnum;
    if_empl0_eq_empl1: Empl0EQEmpl1Enum;
    platform_title_soc_sec?: string;
}
