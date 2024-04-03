import {CoveredEnum} from "../enums/CoveredEnum";
import {EmplEnum} from "../enums/EmplEnum";
import {TaxEnum} from "../enums/TaxEnum";
import {ArticleEnum} from "../enums/ArticleEnum";
import {Entity} from "./entity";

export interface Tax extends Entity{
    article: ArticleEnum[];
    covered: CoveredEnum[];
    empl: EmplEnum;
    tax: TaxEnum;
}