export interface Mig {
    _id: string;
    title: string;
    date: string;
    content: string;
    "migration-covered": string[];
    "migration-article": string[];
    "migration-out_value": string[];
    "migration-in_value": string[];
    "migration-out_title": string[];
    "migration-in_title": string[];
    "migration-time": string[];
    "migration-secondment": string[];
    "migration-nat": string[];
    source: Array<[string, string]>;
    md5_hash: string;
    validated: boolean;
}
