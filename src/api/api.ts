import axios from 'axios';
import {MongoRequest} from "../dtos/mongo-request";
import {Tax} from "../dtos/tax";
import {SocSec} from "../dtos/socSec";
import {Mig} from "../dtos/mig";
import {Login} from "../dtos/login";
import {EnumValue} from "../enums/EnumValue";

const API_BASE_URL = 'https://eu-central-1.aws.data.mongodb-api.com/app/data-xjdlx/endpoint/data/v1/action/';
const JWT_BASE_URL = 'https://services.cloud.mongodb.com/api/client/v2.0/app/data-xjdlx/auth/providers/local-userpass/login';

const enum Actions {
    FIND = 'find',
    INSERT = 'insertOne',
    UPDATE = 'updateOne',
}

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
};

// get JWT token from api
export const getJWT = async (loginDto: Login) => {
    const response = await axios.post(JWT_BASE_URL, {
        email: loginDto.email,
        password: loginDto.password,
    });
    return response.data;
}

export const getAllDocuments = async (queryDto: MongoRequest): Promise<Mig[] | SocSec[] | Tax[] | EnumValue[]> => {
    const response = await axios.post(API_BASE_URL + Actions.FIND, queryDto, {
        headers: headers,
    });
    return response.data.documents;
}

export const getById = async (id: string, collectionName: string): Promise<Tax | Mig | SocSec> => {
    const queryDto: MongoRequest = {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: collectionName,
        filter: {
            _id: {"$oid": id},
        },
    };
    const response = await axios.post(API_BASE_URL + Actions.FIND, queryDto, {
        headers: headers,
    });
    return response.data.documents[0];
}

export const createObject = async (data: Tax | Mig | SocSec, collectionName: string) => {
    const response = await axios.post(API_BASE_URL + Actions.INSERT, {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: collectionName,
        document: {
            ...data,
            last_modified: new Date(),
            last_modified_by: localStorage.getItem('email'),
            _id: data._id ? {"$oid": data._id} : undefined
        }
    }, {
        headers: headers,
    });
    return response.data;
}

export const updateObject = async (id: string, data: Tax | Mig | SocSec, collectionName: string) => {
    //remove _id from data
    delete data._id;
    const response = await axios.post(API_BASE_URL + Actions.UPDATE, {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: collectionName,
        filter: {
            _id: {"$oid": id},
        },
        update: {"$set": {...data, last_modified: new Date(), last_modified_by: localStorage.getItem('email')}}
    }, {
        headers: headers,
    });
    return response.data;
}

export const updateEnumObject = async (id: string, data: EnumValue, newValue:string) => {
    data.values.push(newValue);
    //remove _id from data
    const response = await axios.post(API_BASE_URL + Actions.UPDATE, {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: "enums",
        filter: {
            _id: id,
        },
        update: {"$set": {...data}}
    }, {
        headers: headers,
    });
    return response.data;
}

//for all requests check if they get 401 and if so refresh token
axios.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    if (error.response.status === 401) {
        //reroute to login page
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

//delete item from enum collection
//it gets the item and the field key
export const deleteEnumObject = async (itemToDelete: string, fieldKey: string) => {
    const response = await axios.post(API_BASE_URL + Actions.UPDATE, {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: "enums",
        filter: {
            _id: fieldKey,
        },
        update: {"$pull": {values: itemToDelete}}
    }, {
        headers: headers,
    });
    return response.data;
}