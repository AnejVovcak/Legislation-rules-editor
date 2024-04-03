import {OutEnum} from "../enums/OutEnum";
import {InEnum} from "../enums/InEnum";

export interface Entity {
    _id?: { '$oid': string } | string;
    title: string;
    in_value: InEnum;
    out_value: OutEnum;
    source: {
        "source": string,
        "xpath": string,
        "md5_hash": string,
    },
    validated: boolean;
    date: string;
    content: string;
}