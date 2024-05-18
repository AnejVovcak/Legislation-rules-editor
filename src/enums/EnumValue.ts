import {DataType} from "./DataType";

export interface EnumValue{
    _id:string,
    values:string[],
    domain:DataType[]
}