import axios from 'axios';
import {MongoRequest} from "../dtos/mongo-request";
import {Tax} from "../dtos/tax";
import {SocSec} from "../dtos/socSec";
import {Mig} from "../dtos/mig";
import {Login} from "../dtos/login";
import {CodebookValue} from "../enums/CodebookValue";
import config from "../config";
import {CollectionEnum, CollectionEnumValues} from "../enums/CollectionEnum";
import {ObjectId} from "bson";

const API_BASE_URL = config.baseUrl;
const JWT_BASE_URL = config.jwtUrl;

const enum Actions {
    FIND = 'find',
    UPDATE = 'updateOne',
    DELETE = 'deleteOne',
}

const requestBodyTemplate: MongoRequest = {
    dataSource: config.dataSource,
    database: config.database,
    collection: "",
    filter: {},
};

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

// refresh JWT token
export const refreshJWT = async () => {
    const response = await axios.post('https://services.cloud.mongodb.com/api/client/v2.0/auth/session', {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`,
        },
    });
    return response.data;
}

export const getAllDocuments = async (collection: CollectionEnum, filter?: any, sort?: any): Promise<Mig[] | SocSec[] | Tax[] | CodebookValue[]> => {
    const response = await axios.post(API_BASE_URL + Actions.FIND,
        {
            ...requestBodyTemplate,
            collection: CollectionEnumValues[collection],
            filter: filter,
            sort: sort,
        }
        , {
            headers: headers,
        });
    return response.data.documents;
}

export const getById = async (id: string, collectionName: CollectionEnum): Promise<Tax | Mig | SocSec> => {
    const requestBody = {
        ...requestBodyTemplate,
        collection: CollectionEnumValues[collectionName],
        filter: {
            _id: {"$oid": id},
        },
    }
    const response = await axios.post(API_BASE_URL + Actions.FIND, requestBody, {
        headers: headers,
    });
    return response.data.documents[0];
}

//fixed update object that updates if it exists and creates if it doesn't
export const updateObject = async (id: string | undefined, data: Tax | Mig | SocSec, collectionName: CollectionEnum) => {

    let _id = {"$oid": id !== undefined ? id : new ObjectId().toHexString()};

    delete data._id;

    const requestBody = {
        ...requestBodyTemplate,
        collection: CollectionEnumValues[collectionName],
        filter: {
            _id: _id,
        },
        update: {"$set": {...data, last_modified: new Date(), last_modified_by: localStorage.getItem('email')}},
        upsert: true
    }

    const response = await axios.post(API_BASE_URL + Actions.UPDATE, requestBody, {
        headers: headers,
    });
    return response.data;
}

export const deleteObject = async (id: string, collectionName: CollectionEnum) => {
    const requestBody = {
        ...requestBodyTemplate,
        collection: CollectionEnumValues[collectionName],
        filter: {
            _id: {"$oid": id},
        },
    }
    const response = await axios.post(API_BASE_URL + Actions.DELETE, requestBody, {
        headers: headers,
    });
    return response.data;
}

export const updateEnumObject = async (id: string, data: CodebookValue, newValue: string) => {
    data.values.push(newValue);

    const requestBody = {
        ...requestBodyTemplate,
        collection: CollectionEnumValues.CODEBOOK,
        filter: {
            _id: id,
        },
        update: {"$set": {...data, last_modified: new Date(), last_modified_by: localStorage.getItem('email')}},
    }


    //remove _id from data
    const response = await axios.post(API_BASE_URL + Actions.UPDATE, requestBody, {
        headers: headers,
    });
    return response.data;
}

//delete item from enum collection
//it gets the item and the field key
export const deleteEnumObject = async (itemToDelete: string, fieldKey: string) => {

    const requestBody = {
        ...requestBodyTemplate,
        collection: CollectionEnumValues.CODEBOOK,
        filter: {
            _id: fieldKey,
        },
        update: {"$pull": {values: itemToDelete}}
    }

    const response = await axios.post(API_BASE_URL + Actions.UPDATE, requestBody, {
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
