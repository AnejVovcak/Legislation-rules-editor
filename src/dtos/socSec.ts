export interface SocSec {
    _id: string;
    title: string;
    date: string; // You might consider using the Date type if you need to handle it as a date object in your code
    content: string;
    "ssc-covered": string[];
    "ssc-article": string[];
    "ssc-statute": string[];
    "ssc-out_value": string[];
    "ssc-in_value": string[];
    "ssc-empl": string[];
    "ssc-if_empl0_eq_empl1": string[];
    source: string[]; // Assuming the source is an array of strings based on the empty array provided
    md5_hash: string;
    validated: boolean; // Assuming this should be a boolean based on the context ("false" can be converted to boolean false)
}
