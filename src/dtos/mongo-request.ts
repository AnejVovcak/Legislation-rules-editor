export interface MongoRequest {
    dataSource: string;
    database: string;
    collection: string;
    filter?: object;
    projection?: object;
    sort?: object;
    limit?: number;
    skip?: number;
}