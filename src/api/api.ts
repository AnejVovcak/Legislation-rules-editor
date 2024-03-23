import axios from 'axios';
import {MongoRequest} from "../dtos/mongo-request";
import {Tax} from "../dtos/tax";
import {SocSec} from "../dtos/socSec";
import {Mig} from "../dtos/mig";

const API_BASE_URL = 'https://eu-central-1.aws.data.mongodb-api.com/app/data-xjdlx/endpoint/data/v1/action/find';
const API_KEY = 'TpNhuXslsnf0BoeketRa5YGbiSdEgczCPBl0anPlV1DTHA6q6O6rKjcVF2hBMkN5';
// Create an Axios instance you can customize globally (e.g., headers, timeout, baseURL)
const JWT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImJhYXNfZG9tYWluX2lkIjoiNjVmMDZjOGI3MjY3MWZjYmY5ZDViOTUxIiwiZXhwIjoxNzExMjEwMTQyLCJpYXQiOjE3MTEyMDgzNDIsImlzcyI6IjY1ZmVmNzk2YWI1YWVjOTdiMGJkNGI2NiIsImp0aSI6IjY1ZmVmNzk2YWI1YWVjOTdiMGJkNGI2OCIsInN0aXRjaF9kZXZJZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInN0aXRjaF9kb21haW5JZCI6IjY1ZjA2YzhiNzI2NzFmY2JmOWQ1Yjk1MSIsInN1YiI6IjY1ZmVmNzk2YWI1YWVjOTdiMGJkNGI2MiIsInR5cCI6ImFjY2VzcyJ9.4jQ2zw-mwWbWNmja8x-V9hopGRYLjbCopv12SvPfKVk'
const headers= {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_KEY}`,
    };

export const queryTax = async (queryDto: MongoRequest):Promise<Tax[]> => {
    const response = await axios.post(API_BASE_URL, queryDto, {
        headers: headers,
    });
    return response.data.documents;
};

export const querySocSec = async (queryDto: MongoRequest):Promise<SocSec[]> => {
    const response = await axios.post(API_BASE_URL, queryDto, {
        headers: headers,
    });
    return response.data.documents;
}

export const queryMig = async (queryDto: MongoRequest):Promise<Mig[]> => {
    const response = await axios.post(API_BASE_URL, queryDto, {
        headers: headers,
    });
    return response.data.documents;
}

export const getTaxById = async (id: string):Promise<Tax> => {
    const queryDto: MongoRequest = {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: "taxStaging",
        filter: {
            _id: { "$oid": id },
            },
    };
    const response = await axios.post(API_BASE_URL, queryDto, {
        headers: headers,
    });
    return response.data.documents[0];
}

export const createTax = async (data: Tax) => {
    const response = await axios.post(API_BASE_URL, {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: "taxStaging",
        document: data,
    }, {
        headers: headers,
    });
    return response.data;
}

export const updateTax = async (id: string, data: Tax) => {
    const response = await axios.put(API_BASE_URL, {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: "taxStaging",
        filter: {
            _id: id,
        },
        update: data,
    }, {
        headers: headers,
    });
    return response.data;
}


