import {CoveredEnum} from "../enums/CoveredEnum";
import {OutEnum} from "../enums/OutEnum";
import {InEnum} from "../enums/InEnum";
import {EmplEnum} from "../enums/EmplEnum";
import {TaxEnum} from "../enums/TaxEnum";

export interface Tax {
    _id: string;
    title: string;
    date: string; // Consider using the `Date` type if you plan to manipulate the date
    content: string;
    "tax-covered": CoveredEnum[];
    "tax-article": CoveredEnum[];
    "tax-out_value": OutEnum[];
    "tax-in_value": InEnum[];
    "tax-empl": EmplEnum[];
    "tax-tax": TaxEnum[];
    source: Array<[string, string]> | string[]; // Adjust based on the actual structure of your `source` field
    md5_hash: string;
    validated: string | boolean; // Use `boolean` if this field represents a boolean value, string if it's just a string representation
}