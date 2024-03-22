export interface Tax {
    _id: string;
    title: string;
    date: string; // Consider using the `Date` type if you plan to manipulate the date
    content: string;
    "tax-covered": string[];
    "tax-article": string[];
    "tax-out_value": string[];
    "tax-in_value": string[];
    "tax-empl": string[];
    "tax-tax": string[];
    source: Array<[string, string]> | string[]; // Adjust based on the actual structure of your `source` field
    md5_hash: string;
    validated: string | boolean; // Use `boolean` if this field represents a boolean value, string if it's just a string representation
}