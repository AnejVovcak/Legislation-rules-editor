import {DataType} from "./DataType";

export interface CodebookValue{
    _id:string,
    values:string[],
    domain:DataType[]
}