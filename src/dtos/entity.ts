import {OutEnum} from "../enums/OutEnum";
import {InEnum} from "../enums/InEnum";

export interface Entity {
    _id?: { '$oid': string } | string;
    content: string;
    date: string;
    in_value: InEnum;
    out_value: OutEnum;
    title: string;
    source: {
        "source": string,
        "xpath": string,
        "md5_hash": string,
    }[],
    validated: boolean;
    last_modified: string;
    last_modified_by: string;
}