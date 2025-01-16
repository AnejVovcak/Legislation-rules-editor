import {OutEnum} from "../enums/OutEnum";
import {InEnum} from "../enums/InEnum";
import {SourceTrackingEnum} from "../enums/SourceTrackingEnum";

export interface Source {
    source: string;
    xpath: string;
    md5_hash: string;
    type: SourceTrackingEnum;
    validated: boolean;
}

export interface Entity {
    _id?: { '$oid': string } | string;
    content: string;
    date: string;
    in_value: InEnum;
    out_value: OutEnum;
    title: string;
    source: Source[],
    position?: string[];
    general?: string;
    last_modified: string;
    last_modified_by: string;
    published: boolean;
}